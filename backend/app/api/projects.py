from __future__ import annotations

import json
import asyncio

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse

from app.agents.graph import HackFlowGraph
from app.core.config import get_settings
from app.core.database import connect, init_db
from app.core.events import event_bus
from app.dependencies import repository, workflow
from app.models.repository import ProjectRepository
from app.schemas.requests import (
    ChatRequest,
    CreateProjectRequest,
    DomainInputRequest,
    IdeaInputRequest,
    MethodologyRequest,
    PptRequest,
    ResearchRequest,
    ReviewAnalysisRequest,
    TeamRequest,
    TechStackRequest,
    TermsRequest,
)
from app.schemas.responses import AgentArtifactResponse, ChatResponse, ProjectResponse

router = APIRouter(prefix="/api/projects", tags=["projects"])


def _run_research_background(project_id: str, selected: list[str], questions: dict[str, str]) -> None:
    app_settings = get_settings()
    init_db(app_settings)
    conn = connect(app_settings.sqlite_path)
    try:
        repo = ProjectRepository(conn)
        graph = workflow(repo)
        asyncio.run(graph.run_research(project_id, selected, questions))
    finally:
        conn.close()


def _get_project_or_404(repo: ProjectRepository, project_id: str) -> dict:
    try:
        return repo.get_project(project_id)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.post("", response_model=ProjectResponse)
def create_project(payload: CreateProjectRequest, repo: ProjectRepository = Depends(repository)):
    return repo.create_project(payload.title)


@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: str, repo: ProjectRepository = Depends(repository)):
    return _get_project_or_404(repo, project_id)


@router.post("/{project_id}/idea", response_model=ProjectResponse)
def save_idea(project_id: str, payload: IdeaInputRequest, repo: ProjectRepository = Depends(repository)):
    _get_project_or_404(repo, project_id)
    return repo.update_inputs(project_id, idea=payload.idea)


@router.post("/{project_id}/domains", response_model=ProjectResponse)
def save_domains(project_id: str, payload: DomainInputRequest, repo: ProjectRepository = Depends(repository)):
    _get_project_or_404(repo, project_id)
    return repo.update_inputs(project_id, domains=payload.domains)


@router.post("/{project_id}/analyze", response_model=AgentArtifactResponse)
async def analyze_idea(
    project_id: str,
    repo: ProjectRepository = Depends(repository),
):
    _get_project_or_404(repo, project_id)
    graph = workflow(repo)
    payload = await graph.analyze_idea(project_id)
    return {"project_id": project_id, "kind": "idea_analysis", "payload": payload}


@router.put("/{project_id}/analysis-review", response_model=AgentArtifactResponse)
def review_analysis(
    project_id: str,
    payload: ReviewAnalysisRequest,
    repo: ProjectRepository = Depends(repository),
):
    _get_project_or_404(repo, project_id)
    graph = workflow(repo)
    artifact = graph.save_reviewed_analysis(project_id, payload.model_dump())
    return {"project_id": project_id, "kind": "idea_analysis", "payload": artifact}


@router.post("/{project_id}/validate", response_model=AgentArtifactResponse)
async def validate_project(project_id: str, repo: ProjectRepository = Depends(repository)):
    _get_project_or_404(repo, project_id)
    graph = workflow(repo)
    payload = await graph.validate(project_id)
    return {"project_id": project_id, "kind": "validation_report", "payload": payload}


@router.post("/{project_id}/tech-stack/suggest", response_model=AgentArtifactResponse)
async def suggest_tech_stack(
    project_id: str,
    payload: TechStackRequest,
    repo: ProjectRepository = Depends(repository),
):
    _get_project_or_404(repo, project_id)
    graph = workflow(repo)
    result = await graph.suggest_tech_stack(project_id, payload.selected)
    return {"project_id": project_id, "kind": "tech_stack", "payload": result}


@router.post("/{project_id}/methodology/generate", response_model=AgentArtifactResponse)
async def generate_methodology(
    project_id: str,
    payload: MethodologyRequest,
    repo: ProjectRepository = Depends(repository),
):
    _get_project_or_404(repo, project_id)
    graph = workflow(repo)
    result = await graph.generate_methodology(project_id, payload.current_methodology)
    return {"project_id": project_id, "kind": "methodology", "payload": result}


@router.post("/{project_id}/research", response_model=AgentArtifactResponse)
async def run_research(
    project_id: str,
    payload: ResearchRequest,
    repo: ProjectRepository = Depends(repository),
):
    _get_project_or_404(repo, project_id)
    repo.update_inputs(project_id, research_types=payload.selected, research_questions=payload.questions)
    queued = {
        "status": "queued",
        "progress_percent": 1,
        "selected": payload.selected,
        "questions": payload.questions,
        "message": "Deep research queued in background",
        "answers": {},
        "citations": [],
        "source_count": 0,
    }
    result = repo.upsert_artifact(project_id, "research_report", queued)["payload"]
    await event_bus.publish(project_id, "agent.queued", {"agent": "research_agent", "artifact": "research_report", "payload": result})
    asyncio.create_task(asyncio.to_thread(_run_research_background, project_id, payload.selected, payload.questions))
    return {"project_id": project_id, "kind": "research_report", "payload": result}


@router.post("/{project_id}/ppt/generate", response_model=AgentArtifactResponse)
async def generate_ppt(
    project_id: str,
    payload: PptRequest,
    repo: ProjectRepository = Depends(repository),
):
    _get_project_or_404(repo, project_id)
    graph = workflow(repo)
    result = await graph.generate_ppt(project_id, payload.sections)
    return {"project_id": project_id, "kind": "ppt_content", "payload": result}


@router.post("/{project_id}/team", response_model=ProjectResponse)
def save_team(project_id: str, payload: TeamRequest, repo: ProjectRepository = Depends(repository)):
    _get_project_or_404(repo, project_id)
    return repo.update_inputs(project_id, team=payload.team)


@router.post("/{project_id}/terms", response_model=ProjectResponse)
def save_terms(project_id: str, payload: TermsRequest, repo: ProjectRepository = Depends(repository)):
    _get_project_or_404(repo, project_id)
    return repo.update_inputs(project_id, agreed=payload.agreed)


@router.post("/{project_id}/chat", response_model=ChatResponse)
async def chat(project_id: str, payload: ChatRequest, repo: ProjectRepository = Depends(repository)):
    _get_project_or_404(repo, project_id)
    graph = workflow(repo)
    before = repo.list_chat_messages(project_id)
    reply = await graph.chat(project_id, payload.message)
    after = repo.list_chat_messages(project_id)
    user_message = after[len(before)] if len(after) > len(before) else {"role": "user", "text": payload.message}
    return {"message": user_message, "reply": reply}


@router.get("/{project_id}/events")
async def stream_events(project_id: str, repo: ProjectRepository = Depends(repository)):
    _get_project_or_404(repo, project_id)

    async def event_generator():
        async for event in event_bus.subscribe(project_id):
            yield f"event: {event.event}\n"
            yield f"data: {json.dumps({'created_at': event.created_at, **event.payload})}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")
