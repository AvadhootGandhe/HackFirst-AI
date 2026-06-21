from __future__ import annotations

from typing import Any

from pydantic import BaseModel


class ProjectResponse(BaseModel):
    id: str
    title: str
    status: str
    created_at: str
    updated_at: str
    inputs: dict[str, Any]
    artifacts: dict[str, Any]
    sources: list[dict[str, Any]]


class SourceResponse(BaseModel):
    id: str | None = None
    title: str
    url: str
    snippet: str = ""
    content: str = ""
    source_type: str = "web"


class AgentArtifactResponse(BaseModel):
    project_id: str
    kind: str
    payload: dict[str, Any]


class ChatResponse(BaseModel):
    message: dict[str, Any]
    reply: dict[str, Any]

