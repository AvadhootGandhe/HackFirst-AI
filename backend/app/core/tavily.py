from __future__ import annotations

import json
import urllib.error
import urllib.request
from typing import Any

from app.core.config import Settings


class TavilyClient:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    def search(self, query: str, *, max_results: int = 5) -> list[dict[str, Any]]:
        if not self.settings.tavily_api_key:
            return self._fallback_sources(query, max_results=max_results)

        payload = {
            "api_key": self.settings.tavily_api_key,
            "query": query,
            "search_depth": "advanced",
            "include_answer": False,
            "include_raw_content": True,
            "max_results": max_results,
        }
        request = urllib.request.Request(
            "https://api.tavily.com/search",
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                data = json.loads(response.read().decode("utf-8"))
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError):
            return self._fallback_sources(query, max_results=max_results)

        results = data.get("results", [])
        sources: list[dict[str, Any]] = []
        for item in results:
            sources.append(
                {
                    "title": item.get("title", ""),
                    "url": item.get("url", ""),
                    "snippet": item.get("content", "")[:500],
                    "content": item.get("raw_content") or item.get("content", ""),
                    "source_type": "web",
                }
            )
        return sources

    def _fallback_sources(self, query: str, *, max_results: int) -> list[dict[str, Any]]:
        normalized = query.strip() or "hackathon idea"
        templates = [
            ("Market landscape overview", "https://example.com/market-landscape"),
            ("Competitor research summary", "https://example.com/competitor-research"),
            ("Technology feasibility notes", "https://example.com/feasibility-notes"),
            ("User problem trends", "https://example.com/user-problem-trends"),
            ("Implementation risk guide", "https://example.com/implementation-risks"),
        ]
        return [
            {
                "title": title,
                "url": url,
                "snippet": f"Fallback research source for: {normalized}",
                "content": f"This local fallback source represents web evidence for '{normalized}'. Add TAVILY_API_KEY for live articles.",
                "source_type": "fallback",
            }
            for title, url in templates[:max_results]
        ]

