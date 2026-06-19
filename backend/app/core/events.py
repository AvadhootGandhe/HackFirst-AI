from __future__ import annotations

import asyncio
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


@dataclass(frozen=True)
class AgentEvent:
    project_id: str
    event: str
    payload: dict[str, Any]
    created_at: str


class EventBus:
    def __init__(self) -> None:
        self._queues: dict[str, list[asyncio.Queue[AgentEvent]]] = {}

    async def publish(self, project_id: str, event: str, payload: dict[str, Any]) -> None:
        agent_event = AgentEvent(project_id=project_id, event=event, payload=payload, created_at=utc_now())
        for queue in list(self._queues.get(project_id, [])):
            await queue.put(agent_event)

    async def subscribe(self, project_id: str):
        queue: asyncio.Queue[AgentEvent] = asyncio.Queue()
        self._queues.setdefault(project_id, []).append(queue)
        try:
            while True:
                yield await queue.get()
        finally:
            self._queues.get(project_id, []).remove(queue)


event_bus = EventBus()

