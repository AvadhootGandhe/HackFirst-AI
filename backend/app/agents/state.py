from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass
class ProjectState:
    project_id: str
    idea: str = ""
    domains: list[str] = field(default_factory=list)
    analysis: dict[str, Any] = field(default_factory=dict)
    validation: dict[str, Any] = field(default_factory=dict)
    tech_stack: dict[str, Any] = field(default_factory=dict)
    methodology: dict[str, Any] = field(default_factory=dict)
    research: dict[str, Any] = field(default_factory=dict)
    ppt: dict[str, Any] = field(default_factory=dict)
    sources: list[dict[str, Any]] = field(default_factory=list)

    @classmethod
    def from_project(cls, project: dict[str, Any]) -> "ProjectState":
        inputs = project.get("inputs", {})
        artifacts = project.get("artifacts", {})
        return cls(
            project_id=project["id"],
            idea=inputs.get("idea", ""),
            domains=inputs.get("domains", []),
            analysis=artifacts.get("idea_analysis", {}),
            validation=artifacts.get("validation_report", {}),
            tech_stack=artifacts.get("tech_stack", {}),
            methodology=artifacts.get("methodology", {}),
            research=artifacts.get("research_report", {}),
            ppt=artifacts.get("ppt_content", {}),
            sources=project.get("sources", []),
        )

