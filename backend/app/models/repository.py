from __future__ import annotations

import json
import sqlite3
import uuid
from datetime import datetime, timezone
from typing import Any


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _json(data: Any) -> str:
    return json.dumps(data, ensure_ascii=False)


def _loads(raw: str, fallback: Any) -> Any:
    try:
        return json.loads(raw)
    except (TypeError, json.JSONDecodeError):
        return fallback


class ProjectRepository:
    def __init__(self, conn: sqlite3.Connection) -> None:
        self.conn = conn

    def create_project(self, title: str = "") -> dict[str, Any]:
        now = utc_now()
        project_id = str(uuid.uuid4())
        self.conn.execute(
            "INSERT INTO projects (id, created_at, updated_at, title, status) VALUES (?, ?, ?, ?, ?)",
            (project_id, now, now, title, "draft"),
        )
        self.conn.execute(
            "INSERT INTO project_inputs (project_id) VALUES (?)",
            (project_id,),
        )
        self.conn.commit()
        return self.get_project(project_id)

    def get_project(self, project_id: str) -> dict[str, Any]:
        project = self.conn.execute("SELECT * FROM projects WHERE id = ?", (project_id,)).fetchone()
        if project is None:
            raise KeyError(f"Project not found: {project_id}")
        inputs = self.conn.execute("SELECT * FROM project_inputs WHERE project_id = ?", (project_id,)).fetchone()
        return {
            "id": project["id"],
            "title": project["title"],
            "status": project["status"],
            "created_at": project["created_at"],
            "updated_at": project["updated_at"],
            "inputs": {
                "idea": inputs["idea"] if inputs else "",
                "domains": _loads(inputs["domains_json"], []) if inputs else [],
                "research_types": _loads(inputs["research_types_json"], []) if inputs else [],
                "research_questions": _loads(inputs["research_questions_json"], {}) if inputs else {},
                "ppt_sections": _loads(inputs["ppt_sections_json"], []) if inputs else [],
                "team": _loads(inputs["team_json"], []) if inputs else [],
                "agreed": _loads(inputs["agreed_json"], {}) if inputs else {},
            },
            "artifacts": self.list_artifacts(project_id),
            "sources": self.list_sources(project_id),
        }

    def update_inputs(self, project_id: str, **updates: Any) -> dict[str, Any]:
        allowed = {
            "idea": "idea",
            "domains": "domains_json",
            "research_types": "research_types_json",
            "research_questions": "research_questions_json",
            "ppt_sections": "ppt_sections_json",
            "team": "team_json",
            "agreed": "agreed_json",
        }
        assignments: list[str] = []
        values: list[Any] = []
        for key, value in updates.items():
            if key not in allowed:
                continue
            assignments.append(f"{allowed[key]} = ?")
            values.append(value if key == "idea" else _json(value))
        if assignments:
            values.append(project_id)
            self.conn.execute(
                f"UPDATE project_inputs SET {', '.join(assignments)} WHERE project_id = ?",
                values,
            )
            self.conn.execute(
                "UPDATE projects SET updated_at = ? WHERE id = ?",
                (utc_now(), project_id),
            )
            self.conn.commit()
        return self.get_project(project_id)

    def set_status(self, project_id: str, status: str) -> None:
        self.conn.execute(
            "UPDATE projects SET status = ?, updated_at = ? WHERE id = ?",
            (status, utc_now(), project_id),
        )
        self.conn.commit()

    def upsert_artifact(self, project_id: str, kind: str, payload: dict[str, Any]) -> dict[str, Any]:
        row = self.conn.execute(
            "SELECT id FROM artifacts WHERE project_id = ? AND kind = ? ORDER BY created_at DESC LIMIT 1",
            (project_id, kind),
        ).fetchone()
        now = utc_now()
        if row:
            artifact_id = row["id"]
            self.conn.execute(
                "UPDATE artifacts SET payload_json = ?, updated_at = ? WHERE id = ?",
                (_json(payload), now, artifact_id),
            )
        else:
            artifact_id = str(uuid.uuid4())
            self.conn.execute(
                """
                INSERT INTO artifacts (id, project_id, kind, payload_json, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (artifact_id, project_id, kind, _json(payload), now, now),
            )
        self.conn.commit()
        return self.get_artifact(project_id, kind)

    def get_artifact(self, project_id: str, kind: str) -> dict[str, Any] | None:
        row = self.conn.execute(
            "SELECT * FROM artifacts WHERE project_id = ? AND kind = ? ORDER BY created_at DESC LIMIT 1",
            (project_id, kind),
        ).fetchone()
        if not row:
            return None
        return {
            "id": row["id"],
            "project_id": row["project_id"],
            "kind": row["kind"],
            "payload": _loads(row["payload_json"], {}),
            "created_at": row["created_at"],
            "updated_at": row["updated_at"],
        }

    def list_artifacts(self, project_id: str) -> dict[str, Any]:
        rows = self.conn.execute(
            "SELECT * FROM artifacts WHERE project_id = ? ORDER BY created_at ASC",
            (project_id,),
        ).fetchall()
        return {row["kind"]: _loads(row["payload_json"], {}) for row in rows}

    def add_sources(self, project_id: str, sources: list[dict[str, Any]]) -> list[dict[str, Any]]:
        saved: list[dict[str, Any]] = []
        now = utc_now()
        for source in sources:
            source_id = str(uuid.uuid4())
            self.conn.execute(
                """
                INSERT INTO sources (id, project_id, url, title, snippet, content, source_type, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    source_id,
                    project_id,
                    source.get("url", ""),
                    source.get("title", ""),
                    source.get("snippet", ""),
                    source.get("content", ""),
                    source.get("source_type", "web"),
                    now,
                ),
            )
            saved.append({"id": source_id, **source, "created_at": now})
        self.conn.commit()
        return saved

    def list_sources(self, project_id: str) -> list[dict[str, Any]]:
        rows = self.conn.execute(
            "SELECT * FROM sources WHERE project_id = ? ORDER BY created_at ASC",
            (project_id,),
        ).fetchall()
        return [
            {
                "id": row["id"],
                "url": row["url"],
                "title": row["title"],
                "snippet": row["snippet"],
                "content": row["content"],
                "source_type": row["source_type"],
                "created_at": row["created_at"],
            }
            for row in rows
        ]

    def add_agent_run(
        self,
        project_id: str,
        agent_name: str,
        status: str,
        input_data: dict[str, Any],
        output_data: dict[str, Any] | None = None,
        error: str = "",
    ) -> str:
        run_id = str(uuid.uuid4())
        self.conn.execute(
            """
            INSERT INTO agent_runs
            (id, project_id, agent_name, status, input_json, output_json, error, started_at, finished_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                run_id,
                project_id,
                agent_name,
                status,
                _json(input_data),
                _json(output_data or {}),
                error,
                utc_now(),
                utc_now() if status in {"completed", "failed"} else None,
            ),
        )
        self.conn.commit()
        return run_id

    def add_chat_message(self, project_id: str, role: str, text: str) -> dict[str, Any]:
        message = {"id": str(uuid.uuid4()), "project_id": project_id, "role": role, "text": text, "created_at": utc_now()}
        self.conn.execute(
            "INSERT INTO chat_messages (id, project_id, role, text, created_at) VALUES (?, ?, ?, ?, ?)",
            (message["id"], message["project_id"], message["role"], message["text"], message["created_at"]),
        )
        self.conn.commit()
        return message

    def list_chat_messages(self, project_id: str) -> list[dict[str, Any]]:
        rows = self.conn.execute(
            "SELECT * FROM chat_messages WHERE project_id = ? ORDER BY created_at ASC",
            (project_id,),
        ).fetchall()
        return [dict(row) for row in rows]

