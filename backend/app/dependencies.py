from __future__ import annotations

import sqlite3
from collections.abc import Iterator

from app.agents.graph import HackFlowGraph
from app.agents.nodes import (
    ChatAgent,
    IdeaAnalysisAgent,
    MethodologyAgent,
    PptAgent,
    ResearchAgent,
    TechStackAgent,
    ValidationAgent,
)
from app.core.config import Settings, get_settings
from app.core.database import connect, init_db
from app.core.events import event_bus
from app.core.gemini import GeminiClient
from app.core.tavily import TavilyClient
from app.models.repository import ProjectRepository


def settings() -> Settings:
    return get_settings()


def db_connection() -> Iterator[sqlite3.Connection]:
    app_settings = settings()
    init_db(app_settings)
    conn = connect(app_settings.sqlite_path)
    try:
        yield conn
    finally:
        conn.close()


def repository() -> Iterator[ProjectRepository]:
    for conn in db_connection():
        yield ProjectRepository(conn)


def workflow(repo: ProjectRepository) -> HackFlowGraph:
    app_settings = settings()
    gemini = GeminiClient(app_settings)
    tavily = TavilyClient(app_settings)
    return HackFlowGraph(
        repo=repo,
        idea_agent=IdeaAnalysisAgent(gemini, tavily),
        validation_agent=ValidationAgent(gemini, tavily),
        tech_stack_agent=TechStackAgent(gemini),
        methodology_agent=MethodologyAgent(gemini),
        research_agent=ResearchAgent(gemini, tavily),
        ppt_agent=PptAgent(gemini),
        chat_agent=ChatAgent(gemini),
        event_bus=event_bus,
    )
