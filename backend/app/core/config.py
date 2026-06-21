from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path


def _load_dotenv(path: Path) -> None:
    if not path.exists():
        return
    for raw_line in path.read_text(encoding="utf-8-sig").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


@dataclass(frozen=True)
class Settings:
    app_name: str = "HackFlow AI Backend"
    environment: str = "development"
    database_url: str = "sqlite:///./backend/data/hackflow.db"
    frontend_origin: str = "http://localhost:5173"
    gemini_api_key: str = ""
    tavily_api_key: str = ""
    gemini_fast_model: str = "gemini-1.5-flash"
    gemini_reasoning_model: str = "gemini-1.5-pro"

    @property
    def sqlite_path(self) -> Path:
        if not self.database_url.startswith("sqlite:///"):
            raise ValueError("Only sqlite:/// DATABASE_URL values are supported in this MVP.")
        raw_path = self.database_url.replace("sqlite:///", "", 1)
        return Path(raw_path).resolve()


def get_settings() -> Settings:
    _load_dotenv(Path("backend/.env"))
    _load_dotenv(Path(".env"))
    return Settings(
        environment=os.getenv("ENVIRONMENT", "development"),
        database_url=os.getenv("DATABASE_URL", "sqlite:///./backend/data/hackflow.db"),
        frontend_origin=os.getenv("FRONTEND_ORIGIN", "http://localhost:5173"),
        gemini_api_key=os.getenv("GEMINI_API_KEY", ""),
        tavily_api_key=os.getenv("TAVILY_API_KEY", ""),
        gemini_fast_model=os.getenv("GEMINI_FAST_MODEL", "gemini-1.5-flash"),
        gemini_reasoning_model=os.getenv("GEMINI_REASONING_MODEL", "gemini-1.5-pro"),
    )
