from __future__ import annotations

import asyncio
import tempfile
import unittest
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from app.agents.graph import HackFlowGraph
from app.agents.nodes import (
    ChatAgent,
    IdeaAnalysisAgent,
    MethodologyAgent,
    PptAgent,
    ResearchAgent,
    TechStackAgent,
    ValidationAgent,
    _fallback_research_answer,
)
from app.core.config import Settings
from app.core.database import connect, init_db
from app.core.gemini import GeminiClient
from app.core.tavily import TavilyClient
from app.models.repository import ProjectRepository


class WorkflowTest(unittest.TestCase):
    def test_tech_stack_agent_normalizes_string_stacks(self) -> None:
        class FakeGemini:
            def generate_json(self, *_args, **_kwargs):
                return {
                    "selected": [],
                    "suggestions": [
                        {
                            "name": "Frontend Framework",
                            "stack": "React.js with TypeScript",
                            "reason": "Good UI stack.",
                        },
                        {
                            "name": "Backend Framework",
                            "stack": "Python with FastAPI",
                            "reason": "Good API stack.",
                        },
                    ],
                    "risks": [{"name": "Latency", "description": "Long AI calls"}],
                }

        state = type(
            "State",
            (),
            {
                "analysis": {"main_idea": "AI hackathon platform"},
                "validation": {"scores": {"overall": 80}},
            },
        )()

        result = TechStackAgent(FakeGemini()).run(state, [])

        self.assertEqual(result["suggestions"][0]["stack"], ["React.js with TypeScript"])
        self.assertEqual(result["suggestions"][1]["stack"], ["Python with FastAPI"])
        self.assertIn("Latency", result["risks"])

    def test_validation_caps_direct_chatgpt_clone(self) -> None:
        class FakeGemini:
            def generate_json(self, *_args, **_kwargs):
                return {
                    "scores": {"overall": 88, "feasibility": 90, "uniqueness": 82, "market_potential": 85},
                    "existing_platforms": [],
                    "research_gaps": [],
                    "opportunities": [],
                    "citations": [],
                }

        class FakeTavily:
            def search(self, query, *, max_results=5):
                return [
                    {
                        "title": "ChatGPT",
                        "url": "https://chatgpt.com",
                        "snippet": f"Existing AI assistant for {query}",
                        "content": "ChatGPT is an existing AI assistant.",
                        "source_type": "web",
                    }
                ][:max_results]

        state = type(
            "State",
            (),
            {
                "idea": "I want to build a ChatGPT clone",
                "analysis": {"main_idea": "A ChatGPT clone"},
                "domains": ["AI / ML"],
            },
        )()

        report, _sources = ValidationAgent(FakeGemini(), FakeTavily()).run(state)

        self.assertLessEqual(report["scores"]["overall"], 30)
        self.assertLessEqual(report["scores"]["uniqueness"], 15)
        self.assertEqual(report["clone_risk"]["level"], "high")
        self.assertTrue(any(item["name"] == "Claude Code" for item in report["existing_platforms"]))

    def test_research_fallback_refuses_unsupported_numeric_answer(self) -> None:
        result = _fallback_research_answer(
            "quantitative",
            "how many people use chatgpt daily",
            [
                {
                    "title": "ChatGPT overview",
                    "url": "https://example.com/chatgpt",
                    "snippet": "ChatGPT is a popular AI assistant used for writing, coding, and research.",
                    "content": "The article discusses broad adoption but gives no daily usage number.",
                }
            ],
        )

        self.assertFalse(result["answer_supported"])
        self.assertIn("No supported document found", result["answer"])

    def test_backend_flow_without_server(self) -> None:
        with tempfile.TemporaryDirectory(ignore_cleanup_errors=True) as tmp:
            db_path = Path(tmp) / "hackflow_test.db"
            settings = Settings(database_url=f"sqlite:///{db_path}")
            init_db(settings)
            conn = connect(settings.sqlite_path)
            try:
                repo = ProjectRepository(conn)
                gemini = GeminiClient(settings)
                tavily = TavilyClient(settings)
                graph = HackFlowGraph(
                    repo=repo,
                    idea_agent=IdeaAnalysisAgent(gemini, tavily),
                    validation_agent=ValidationAgent(gemini, tavily),
                    tech_stack_agent=TechStackAgent(gemini),
                    methodology_agent=MethodologyAgent(gemini),
                    research_agent=ResearchAgent(gemini, tavily),
                    ppt_agent=PptAgent(gemini),
                    chat_agent=ChatAgent(gemini),
                )

                project = repo.create_project("Test Project")
                project_id = project["id"]
                repo.update_inputs(
                    project_id,
                    idea="AI platform that helps hackathon teams validate ideas and generate research-backed pitches.",
                    domains=["AI / ML", "EdTech"],
                )

                analysis = asyncio.run(graph.analyze_idea(project_id))
                self.assertIn("main_idea", analysis)
                self.assertGreaterEqual(len(analysis["features"]), 3)

                reviewed = graph.save_reviewed_analysis(project_id, analysis)
                self.assertEqual(reviewed["main_idea"], analysis["main_idea"])

                validation = asyncio.run(graph.validate(project_id))
                self.assertIn("scores", validation)
                self.assertGreater(len(repo.list_sources(project_id)), 0)

                tech_stack = asyncio.run(graph.suggest_tech_stack(project_id, ["React"]))
                self.assertIn("suggestions", tech_stack)

                methodology = asyncio.run(graph.generate_methodology(project_id))
                self.assertIn("methodology", methodology)

                research = asyncio.run(
                    graph.run_research(
                        project_id,
                        ["quantitative", "qualitative"],
                        {
                            "quantitative": "How many teams struggle with idea validation?",
                            "qualitative": "Why do hackathon teams need structured research?",
                        },
                    )
                )
                self.assertIn("answers", research)

                ppt = asyncio.run(graph.generate_ppt(project_id, ["Problem Statement", "Research Gap"]))
                self.assertIn("sections", ppt)

                reply = asyncio.run(graph.chat(project_id, "What should we emphasize in the pitch?"))
                self.assertEqual(reply["role"], "ai")

                saved = repo.get_project(project_id)
                self.assertIn("idea_analysis", saved["artifacts"])
                self.assertIn("validation_report", saved["artifacts"])
                self.assertIn("ppt_content", saved["artifacts"])
            finally:
                conn.execute("PRAGMA wal_checkpoint(TRUNCATE)")
                conn.close()


if __name__ == "__main__":
    unittest.main()
