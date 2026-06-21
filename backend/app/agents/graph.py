from __future__ import annotations

from typing import Any, Callable

from app.agents.nodes import (
    ChatAgent,
    IdeaAnalysisAgent,
    MethodologyAgent,
    PptAgent,
    ResearchAgent,
    TechStackAgent,
    ValidationAgent,
)
from app.agents.state import ProjectState
from app.core.events import EventBus
from app.models.repository import ProjectRepository


class HackFlowGraph:
    """LangGraph-ready workflow facade for the frontend's exact page flow."""

    def __init__(
        self,
        repo: ProjectRepository,
        idea_agent: IdeaAnalysisAgent,
        validation_agent: ValidationAgent,
        tech_stack_agent: TechStackAgent,
        methodology_agent: MethodologyAgent,
        research_agent: ResearchAgent,
        ppt_agent: PptAgent,
        chat_agent: ChatAgent,
        event_bus: EventBus | None = None,
    ) -> None:
        self.repo = repo
        self.idea_agent = idea_agent
        self.validation_agent = validation_agent
        self.tech_stack_agent = tech_stack_agent
        self.methodology_agent = methodology_agent
        self.research_agent = research_agent
        self.ppt_agent = ppt_agent
        self.chat_agent = chat_agent
        self.event_bus = event_bus

    def state(self, project_id: str) -> ProjectState:
        return ProjectState.from_project(self.repo.get_project(project_id))

    async def analyze_idea(self, project_id: str) -> dict[str, Any]:
        return await self._run_agent(project_id, self.idea_agent.name, lambda state: self.idea_agent.run(state), "idea_analysis")

    def save_reviewed_analysis(self, project_id: str, payload: dict[str, Any]) -> dict[str, Any]:
        return self.repo.upsert_artifact(project_id, "idea_analysis", payload)["payload"]

    async def validate(self, project_id: str) -> dict[str, Any]:
        async def run(state: ProjectState) -> dict[str, Any]:
            report, sources = self.validation_agent.run(state)
            self.repo.add_sources(project_id, sources)
            return report

        return await self._run_agent(project_id, self.validation_agent.name, run, "validation_report")

    async def suggest_tech_stack(self, project_id: str, selected: list[str]) -> dict[str, Any]:
        return await self._run_agent(
            project_id,
            self.tech_stack_agent.name,
            lambda state: self.tech_stack_agent.run(state, selected),
            "tech_stack",
        )

    async def generate_methodology(self, project_id: str, current_methodology: str = "") -> dict[str, Any]:
        return await self._run_agent(
            project_id,
            self.methodology_agent.name,
            lambda state: self.methodology_agent.run(state, current_methodology),
            "methodology",
        )

    async def run_research(self, project_id: str, selected: list[str], questions: dict[str, str]) -> dict[str, Any]:
        self.repo.update_inputs(project_id, research_types=selected, research_questions=questions)
        started_payload = {
            "status": "running",
            "progress_percent": 3,
            "selected": selected,
            "questions": questions,
            "message": "Deep research queued",
            "answers": {},
            "citations": [],
            "source_count": 0,
        }
        self.repo.upsert_artifact(project_id, "research_report", started_payload)
        await self._publish(project_id, "agent.started", {"agent": self.research_agent.name, "artifact": "research_report", "payload": started_payload})
        self.repo.add_agent_run(project_id, self.research_agent.name, "started", {"artifact": "research_report", "selected": selected, "questions": questions})

        def on_progress(progress_percent: int, message: str, partial: dict[str, Any] | None = None) -> None:
            current = self.repo.get_artifact(project_id, "research_report")
            payload = dict(current["payload"] if current else started_payload)
            payload.update(partial or {})
            payload.update({"status": "running", "progress_percent": progress_percent, "message": message})
            self.repo.upsert_artifact(project_id, "research_report", payload)

        try:
            report, sources = self.research_agent.run(self.state(project_id), selected, questions, on_progress=on_progress)
            self.repo.add_sources(project_id, sources)
            report = {**report, "status": "completed", "progress_percent": 100}
            artifact = self.repo.upsert_artifact(project_id, "research_report", report)
            self.repo.add_agent_run(project_id, self.research_agent.name, "completed", {"artifact": "research_report"}, report)
            await self._publish(project_id, "agent.completed", {"agent": self.research_agent.name, "artifact": "research_report", "payload": report})
            return artifact["payload"]
        except Exception as exc:
            failed_payload = {**started_payload, "status": "failed", "progress_percent": 100, "message": str(exc)}
            self.repo.upsert_artifact(project_id, "research_report", failed_payload)
            self.repo.add_agent_run(project_id, self.research_agent.name, "failed", {"artifact": "research_report"}, error=str(exc))
            await self._publish(project_id, "agent.failed", {"agent": self.research_agent.name, "artifact": "research_report", "error": str(exc)})
            raise

    async def generate_ppt(self, project_id: str, sections: list[str]) -> dict[str, Any]:
        self.repo.update_inputs(project_id, ppt_sections=sections)
        return await self._run_agent(
            project_id,
            self.ppt_agent.name,
            lambda state: self.ppt_agent.run(state, sections),
            "ppt_content",
        )

    async def chat(self, project_id: str, message: str) -> dict[str, Any]:
        self.repo.add_chat_message(project_id, "user", message)
        reply = self.chat_agent.run(self.state(project_id), message)
        text = reply.get("text", "")
        saved = self.repo.add_chat_message(project_id, "ai", text)
        return saved

    async def _run_agent(
        self,
        project_id: str,
        agent_name: str,
        fn: Callable[[ProjectState], dict[str, Any]] | Callable[[ProjectState], Any],
        artifact_kind: str,
    ) -> dict[str, Any]:
        await self._publish(project_id, "agent.started", {"agent": agent_name, "artifact": artifact_kind})
        self.repo.add_agent_run(project_id, agent_name, "started", {"artifact": artifact_kind})
        try:
            result = fn(self.state(project_id))
            if hasattr(result, "__await__"):
                result = await result
            artifact = self.repo.upsert_artifact(project_id, artifact_kind, result)
            self.repo.add_agent_run(project_id, agent_name, "completed", {"artifact": artifact_kind}, result)
            await self._publish(
                project_id,
                "agent.completed",
                {"agent": agent_name, "artifact": artifact_kind, "payload": result},
            )
            return artifact["payload"]
        except Exception as exc:
            self.repo.add_agent_run(project_id, agent_name, "failed", {"artifact": artifact_kind}, error=str(exc))
            await self._publish(project_id, "agent.failed", {"agent": agent_name, "artifact": artifact_kind, "error": str(exc)})
            raise

    async def _publish(self, project_id: str, event: str, payload: dict[str, Any]) -> None:
        if self.event_bus is not None:
            await self.event_bus.publish(project_id, event, payload)
