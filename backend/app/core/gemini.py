from __future__ import annotations

import json
import re
from typing import Any

from app.core.config import Settings


class GeminiClient:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self._client = None
        if settings.gemini_api_key:
            try:
                from google import genai  # type: ignore

                self._client = genai.Client(api_key=settings.gemini_api_key)
            except Exception:
                self._client = None

    def generate_json(
        self,
        prompt: str,
        fallback: dict[str, Any],
        *,
        reasoning: bool = False,
    ) -> dict[str, Any]:
        if self._client is None:
            return fallback

        model = self.settings.gemini_reasoning_model if reasoning else self.settings.gemini_fast_model
        try:
            response = self._client.models.generate_content(
                model=model,
                contents=prompt,
                config={
                    "response_mime_type": "application/json",
                    "temperature": 0.2,
                },
            )
            text = getattr(response, "text", "") or ""
            parsed = _extract_json(text)
            return parsed if isinstance(parsed, dict) else fallback
        except Exception:
            return fallback


def _extract_json(text: str) -> Any:
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        raise json.JSONDecodeError("No JSON object found", text, 0)
    return json.loads(match.group(0))

