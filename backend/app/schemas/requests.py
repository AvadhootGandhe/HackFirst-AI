from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, Field


class CreateProjectRequest(BaseModel):
    title: str = ""


class IdeaInputRequest(BaseModel):
    idea: str = Field(min_length=10)


class DomainInputRequest(BaseModel):
    domains: list[str] = Field(min_length=1)


class ReviewAnalysisRequest(BaseModel):
    main_idea: str
    features: list[str]
    constraints: list[str]
    assumptions: list[str] = []


class TechStackRequest(BaseModel):
    selected: list[str] = []


class MethodologyRequest(BaseModel):
    current_methodology: str = ""


class ResearchRequest(BaseModel):
    selected: list[Literal["quantitative", "qualitative"]] = Field(min_length=1)
    questions: dict[str, str] = Field(default_factory=dict)


class PptRequest(BaseModel):
    sections: list[str] = Field(min_length=1)


class TeamRequest(BaseModel):
    team: list[str] = []


class TermsRequest(BaseModel):
    agreed: dict[str, bool]


class ChatRequest(BaseModel):
    message: str = Field(min_length=1)


class ArtifactResponse(BaseModel):
    project_id: str
    kind: str
    payload: dict[str, Any]

