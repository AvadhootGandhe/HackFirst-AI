from __future__ import annotations

import re
from typing import Any, Callable

from app.agents.state import ProjectState
from app.core.gemini import GeminiClient
from app.core.tavily import TavilyClient


class IdeaAnalysisAgent:
    name = "idea_analysis_agent"

    def __init__(self, gemini: GeminiClient, tavily: TavilyClient) -> None:
        self.gemini = gemini
        self.tavily = tavily

    def run(self, state: ProjectState) -> dict[str, Any]:
        fallback = _fallback_analysis(state.idea, state.domains)
        sources = _collect_sources(
            self.tavily,
            [
                f"{state.idea} target users pain points competitors",
                f"{state.idea} existing products alternatives {' '.join(state.domains)}",
                f"{state.idea} technical feasibility MVP risks",
            ],
            max_results=4,
        )
        prompt = f"""
You are a senior hackathon product strategist. Do deep first-pass analysis, not paraphrasing.
Extract only what is present or strongly implied. If a feature/constraint is inferred, mark why.

Input idea:
{state.idea}

Selected domains: {", ".join(state.domains)}

Evidence from quick web scan:
{_source_brief(sources)}

Return JSON with:
main_idea: one refined goal, not copy pasted
goal_breakdown: list of concrete sub-goals the builder is probably aiming for
target_users: list of likely users and why
features: list of objects with name, description, evidence ("explicit" or "inferred"), and confidence 0-100
constraints: list of objects with name, description, evidence ("explicit" or "inferred"), and confidence 0-100
risks: list of technical/product/demo risks
assumptions: assumptions that must be confirmed before building
clarifying_questions: important questions the team should answer
domain_context: domain-specific framing
citations: list of title, url, source_index from the evidence above
"""
        analysis = self.gemini.generate_json(prompt, fallback, reasoning=True)
        analysis.setdefault("citations", _citations(sources))
        return _normalize_analysis(analysis)


class ValidationAgent:
    name = "validation_agent"

    def __init__(self, gemini: GeminiClient, tavily: TavilyClient) -> None:
        self.gemini = gemini
        self.tavily = tavily

    def run(self, state: ProjectState) -> tuple[dict[str, Any], list[dict[str, Any]]]:
        queries = _validation_queries(state)
        sources = _collect_sources(self.tavily, queries, max_results=6)
        fallback = {
            "scores": {"overall": 35, "feasibility": 75, "uniqueness": 15, "market_potential": 45},
            "existing_platforms": _platforms_from_sources(sources),
            "research_gaps": [
                {
                    "gap": "Clear differentiation is not proven",
                    "detail": "The idea overlaps with mature products unless a narrower user, workflow, or technical wedge is defined.",
                    "source_indexes": [0],
                },
                {
                    "gap": "MVP scope needs a defensible wedge",
                    "detail": "A clone of a mature product is feasible as a demo but weak as a unique hackathon project.",
                    "source_indexes": [1],
                },
            ],
            "opportunities": [
                {
                    "title": "End-to-end research workspace",
                    "description": "Combine validation, research, methodology, and slide generation around the same project state.",
                    "impact": "High",
                    "source_indexes": [0, 1],
                },
                {
                    "title": "Domain-aware recommendations",
                    "description": "Use selected domains to tailor competitors, stack suggestions, and research questions.",
                    "impact": "Medium",
                    "source_indexes": [2],
                },
            ],
            "citations": _citations(sources),
        }
        prompt = f"""
You are a strict startup/hackathon validation agent. Be skeptical.
Do not reward an idea for cloning a mature product. If it is a clone of an existing dominant tool,
uniqueness must be 0-20 and overall must usually be 10-35 unless the idea has a clear novel niche,
distribution wedge, new user segment, or technical capability.

Idea analysis JSON:
{state.analysis}

Raw idea:
{state.idea}

Domains: {state.domains}

Sources:
{_source_brief(sources)}

Known mature AI/productivity competitors to consider when relevant:
ChatGPT, OpenAI Codex, GitHub Copilot, Claude, Claude Code, Gemini, Perplexity, Poe, Cursor,
Replit Agent, Devin, Windsurf, Lovable, Bolt, v0, Microsoft Copilot.

Return JSON with:
scores: overall, feasibility, uniqueness, market_potential integers 0-100
score_rationale: object explaining each score with blunt reasoning
existing_platforms: list of direct and adjacent competitors with name, url, description, features
clone_risk: object with level ("low", "medium", "high"), reason, and score_cap_applied boolean
research_gaps: list of gap, detail, source_indexes
opportunities: list of title, description, impact, source_indexes
recommended_pivots: list of specific ways to make this project more original
citations: list of title, url, source_index
"""
        report = self.gemini.generate_json(prompt, fallback, reasoning=True)
        report.setdefault("citations", _citations(sources))
        return _normalize_validation(report, state, sources), sources


class TechStackAgent:
    name = "tech_stack_agent"

    def __init__(self, gemini: GeminiClient) -> None:
        self.gemini = gemini

    def run(self, state: ProjectState, selected: list[str]) -> dict[str, Any]:
        fallback = {
            "selected": selected,
            "suggestions": [
                {
                    "name": "Fast MVP AI Stack",
                    "stack": _merge_unique(selected, ["React", "TypeScript", "FastAPI", "SQLite", "Gemini API", "Tavily"]),
                    "reason": "Matches the existing frontend and adds a lightweight agent backend.",
                },
                {
                    "name": "Research-Heavy Stack",
                    "stack": _merge_unique(selected, ["React", "FastAPI", "PostgreSQL", "LangGraph", "Gemini API", "Tavily"]),
                    "reason": "Better when scaling saved research, citations, and multi-user projects later.",
                },
            ],
            "risks": ["API cost control", "Citation quality", "Long-running agent latency"],
        }
        prompt = f"""
Suggest technical stacks for this hackathon project.

Idea analysis: {state.analysis}
Validation: {state.validation}
User-selected technologies: {selected}

Return JSON with selected, suggestions, and risks.
Each suggestion has name, stack, reason.
"""
        return _normalize_tech_stack(self.gemini.generate_json(prompt, fallback, reasoning=False), selected)


class MethodologyAgent:
    name = "methodology_agent"

    def __init__(self, gemini: GeminiClient) -> None:
        self.gemini = gemini

    def run(self, state: ProjectState, current_methodology: str = "") -> dict[str, Any]:
        fallback = {
            "methodology": current_methodology or "\n".join(
                [
                    "Phase 1 - Discovery: refine the user problem, personas, and domain assumptions.",
                    "Phase 2 - Validation: compare existing solutions and score feasibility, uniqueness, and market fit.",
                    "Phase 3 - MVP Build: implement the highest-value workflow with a small, reliable technical stack.",
                    "Phase 4 - Testing: validate core flows, edge cases, and demo stability.",
                    "Phase 5 - Pitch: prepare presentation content, evidence, demo script, and Q&A points.",
                ]
            ),
            "phases": ["Discovery", "Validation", "MVP Build", "Testing", "Pitch"],
        }
        prompt = f"""
Generate a hackathon methodology for this project.

Idea analysis: {state.analysis}
Validation: {state.validation}
Tech stack: {state.tech_stack}
Existing user draft: {current_methodology}

Return JSON with methodology as markdown/plain text and phases as a list.
"""
        return self.gemini.generate_json(prompt, fallback, reasoning=False)


class ResearchAgent:
    name = "research_agent"

    def __init__(self, gemini: GeminiClient, tavily: TavilyClient) -> None:
        self.gemini = gemini
        self.tavily = tavily

    def run(
        self,
        state: ProjectState,
        selected: list[str],
        questions: dict[str, str],
        on_progress: Callable[[int, str, dict[str, Any] | None], None] | None = None,
    ) -> tuple[dict[str, Any], list[dict[str, Any]]]:
        all_sources: list[dict[str, Any]] = []
        answers: dict[str, Any] = {}
        total_units = max(1, len(selected) * 8 + 1)
        completed_units = 0

        def progress(message: str, partial: dict[str, Any] | None = None) -> None:
            nonlocal completed_units
            completed_units += 1
            pct = min(96, max(5, int((completed_units / total_units) * 96)))
            if on_progress is not None:
                on_progress(pct, message, partial)

        for research_type in selected:
            question_text = questions.get(research_type, "")
            query_plan = _deep_research_queries(state, research_type, question_text)
            sources: list[dict[str, Any]] = []
            seen: set[str] = set()
            for index, query in enumerate(query_plan, start=1):
                batch = self.tavily.search(query, max_results=5)
                for source in batch:
                    key = source.get("url") or f"{source.get('title', '')}:{source.get('snippet', '')}"
                    if key in seen:
                        continue
                    seen.add(key)
                    sources.append(source)
                progress(
                    f"{research_type}: completed source pass {index}/{len(query_plan)}",
                    {
                        "selected": selected,
                        "answers": answers,
                        "citations": _citations(all_sources + sources),
                        "source_count": len(all_sources) + len(sources),
                    },
                )
            all_sources.extend(sources)
            fallback = _fallback_research_answer(research_type, question_text, sources)
            prompt = f"""
You are a deep research agent. Answer from the supplied sources, and say when evidence is weak.
Do not give generic advice. Tie every major claim to citations.
Answer every user question directly. If the supplied sources do not support a direct answer, say:
"No supported document found after research for this question."

Idea analysis: {state.analysis}
Validation: {state.validation}
Questions:
{question_text}

Sources:
{_source_brief(sources)}

Return JSON with type, questions, answer, answer_supported, findings, citations.
Each finding should include claim, evidence, confidence, and source_indexes.
"""
            answers[research_type] = self.gemini.generate_json(prompt, fallback, reasoning=True)
            progress(
                f"{research_type}: synthesized research answer",
                {
                    "selected": selected,
                    "answers": answers,
                    "citations": _citations(all_sources),
                    "source_count": len(all_sources),
                },
            )
        report = {
            "selected": selected,
            "progress_percent": 100 if selected else 0,
            "answers": answers,
            "citations": _citations(all_sources),
            "source_count": len(all_sources),
        }
        return report, all_sources


class PptAgent:
    name = "ppt_agent"

    def __init__(self, gemini: GeminiClient) -> None:
        self.gemini = gemini

    def run(self, state: ProjectState, sections: list[str]) -> dict[str, Any]:
        fallback = {
            "sections": [
                {
                    "title": section,
                    "bullets": _fallback_slide_bullets(section, state),
                    "speaker_notes": f"Explain {section.lower()} using the saved analysis, validation, and research evidence.",
                    "source_indexes": [0] if state.sources else [],
                }
                for section in sections
            ],
            "warnings": ["Review source-backed claims before final export."],
        }
        prompt = f"""
Generate pitch deck content for selected sections.

Selected sections: {sections}
Idea analysis: {state.analysis}
Validation: {state.validation}
Research: {state.research}
Methodology: {state.methodology}

Return JSON with sections.
Each section has title, bullets, speaker_notes, source_indexes.
Also include warnings.
"""
        return self.gemini.generate_json(prompt, fallback, reasoning=True)


class ChatAgent:
    name = "chat_agent"

    def __init__(self, gemini: GeminiClient) -> None:
        self.gemini = gemini

    def run(self, state: ProjectState, message: str) -> dict[str, Any]:
        fallback = {
            "role": "ai",
            "text": "Based on the saved project state, focus your pitch on the validated user problem, competitor gap, and source-backed evidence.",
        }
        prompt = f"""
You are the dashboard AI assistant for this hackathon project.

Project state:
Idea: {state.idea}
Domains: {state.domains}
Analysis: {state.analysis}
Validation: {state.validation}
Research: {state.research}
PPT: {state.ppt}

User message: {message}

Return JSON with role='ai' and text.
"""
        return self.gemini.generate_json(prompt, fallback, reasoning=False)


def _fallback_analysis(idea: str, domains: list[str]) -> dict[str, Any]:
    domain_text = ", ".join(domains) if domains else "general hackathon"
    clean_idea = idea.strip()
    return {
        "main_idea": clean_idea or "A hackathon project idea that needs clarification.",
        "features": [
            "Guided onboarding for idea details",
            "Domain-aware analysis",
            "Research and validation report",
            "Team planning workspace",
            "Presentation content generation",
        ],
        "constraints": [
            "Limited hackathon time",
            "Need to keep scope MVP-friendly",
            "Dependence on reliable external data",
            "Need for clear demo story",
            "Need to distinguish assumptions from verified facts",
        ],
        "assumptions": [
            "The target user has a strong enough pain point.",
            "The team can build a working MVP within the event timeline.",
            "Public sources are enough for early validation.",
        ],
        "domain_context": f"The idea should be evaluated in the {domain_text} context.",
    }


def _validation_query(state: ProjectState) -> str:
    analysis_text = state.analysis.get("main_idea") or state.idea
    return f"{analysis_text} competitors market research feasibility {' '.join(state.domains)}"


def _validation_queries(state: ProjectState) -> list[str]:
    analysis_text = state.analysis.get("main_idea") or state.idea
    idea = state.idea or analysis_text
    domains = " ".join(state.domains)
    return [
        f"{analysis_text} competitors alternatives market research {domains}",
        f"{idea} existing products direct competitors alternatives",
        f"{idea} feasibility technical risks market potential",
        f"{idea} clone existing product differentiation uniqueness",
        "ChatGPT Claude Gemini Perplexity Poe Copilot Codex Claude Code AI assistant alternatives",
    ]


def _deep_research_queries(state: ProjectState, research_type: str, question_text: str) -> list[str]:
    idea = state.analysis.get("main_idea") or state.idea
    domains = " ".join(state.domains)
    questions = question_text.replace("\n", " ")
    return [
        f"{research_type} evidence {idea} {domains} {questions}",
        f"{idea} direct competitors alternatives market landscape {domains}",
        f"{idea} user pain points personas adoption barriers {domains}",
        f"{idea} technical feasibility architecture risks MVP implementation",
        f"{idea} market size demand trends pricing willingness to pay",
        f"{idea} academic papers industry reports case studies benchmarks",
        f"{idea} failure modes limitations legal privacy security risks",
        f"{idea} differentiation opportunities underserved niche workflow wedge",
    ]


def _collect_sources(tavily: TavilyClient, queries: list[str], *, max_results: int) -> list[dict[str, Any]]:
    seen: set[str] = set()
    sources: list[dict[str, Any]] = []
    for query in queries:
        for source in tavily.search(query, max_results=max_results):
            key = source.get("url") or f"{source.get('title', '')}:{source.get('snippet', '')}"
            if key in seen:
                continue
            seen.add(key)
            sources.append(source)
    return sources


def _source_brief(sources: list[dict[str, Any]]) -> str:
    lines = []
    for index, source in enumerate(sources):
        lines.append(
            f"[{index}] {source.get('title', '')}\nURL: {source.get('url', '')}\nSnippet: {source.get('snippet', '')}"
        )
    return "\n\n".join(lines)


def _citations(sources: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return [
        {"source_index": index, "title": source.get("title", ""), "url": source.get("url", "")}
        for index, source in enumerate(sources)
    ]


def _fallback_research_answer(research_type: str, question_text: str, sources: list[dict[str, Any]]) -> dict[str, Any]:
    questions = [question.strip() for question in question_text.splitlines() if question.strip()]
    if not questions:
        questions = [f"What evidence matters for {research_type} research?"]
    answer_parts: list[str] = []
    findings: list[dict[str, Any]] = []
    for question in questions:
        evidence = _evidence_for_question(question, sources)
        if not evidence or (_needs_number(question) and not any(_has_number(text) for _, text in evidence)):
            answer_parts.append(
                f"Q: {question}\nA: No supported document found after research for this question. "
                "The collected sources did not provide a direct, citable answer."
            )
            findings.append(
                {
                    "claim": question,
                    "evidence": "No collected source directly supported the requested answer.",
                    "confidence": 0,
                    "source_indexes": [],
                }
            )
            continue
        cited = ", ".join(str(index) for index, _ in evidence[:3])
        evidence_text = " ".join(text for _, text in evidence[:3])
        answer_parts.append(f"Q: {question}\nA: {evidence_text} Sources: {cited}.")
        findings.append(
            {
                "claim": question,
                "evidence": evidence_text,
                "confidence": 60,
                "source_indexes": [index for index, _ in evidence[:3]],
            }
        )
    return {
        "type": research_type,
        "questions": questions,
        "answer": "\n\n".join(answer_parts),
        "answer_supported": any(item["source_indexes"] for item in findings),
        "findings": findings,
        "citations": _citations(sources),
    }


def _evidence_for_question(question: str, sources: list[dict[str, Any]]) -> list[tuple[int, str]]:
    tokens = {token for token in re.findall(r"[a-z0-9]+", question.lower()) if len(token) > 3}
    ranked: list[tuple[int, int, str]] = []
    for index, source in enumerate(sources):
        text = " ".join(str(source.get(key, "")) for key in ("title", "snippet", "content"))
        sentences = [part.strip() for part in re.split(r"(?<=[.!?])\s+", text) if part.strip()]
        best_sentence = ""
        best_score = 0
        for sentence in sentences[:80]:
            sentence_lower = sentence.lower()
            score = sum(1 for token in tokens if token in sentence_lower)
            if _needs_number(question) and _has_number(sentence):
                score += 3
            if score > best_score:
                best_score = score
                best_sentence = sentence
        if best_score > 0 and best_sentence:
            ranked.append((best_score, index, best_sentence[:420]))
    ranked.sort(key=lambda item: item[0], reverse=True)
    return [(index, sentence) for _, index, sentence in ranked[:4]]


def _needs_number(question: str) -> bool:
    return bool(re.search(r"\b(how many|number|count|daily|monthly|weekly|users|people|percent|percentage|market size|revenue)\b", question.lower()))


def _has_number(text: str) -> bool:
    return bool(re.search(r"\d", text))


def _platforms_from_sources(sources: list[dict[str, Any]]) -> list[dict[str, Any]]:
    platforms = []
    for source in sources[:4]:
        platforms.append(
            {
                "name": source.get("title", "Existing platform"),
                "url": source.get("url", ""),
                "description": source.get("snippet", ""),
                "features": ["Comparable workflow", "Market signal", "Reference point"],
            }
        )
    return platforms


def _field_text(value: Any) -> str:
    if isinstance(value, str):
        return value.strip()
    if isinstance(value, dict):
        name = str(value.get("name") or value.get("title") or value.get("gap") or value.get("claim") or "").strip()
        description = str(value.get("description") or value.get("detail") or value.get("evidence") or "").strip()
        confidence = value.get("confidence")
        suffix = f" ({confidence}% confidence)" if isinstance(confidence, (int, float)) else ""
        if name and description:
            return f"{name}: {description}{suffix}"
        return name or description
    return str(value).strip() if value is not None else ""


def _normalize_analysis(payload: dict[str, Any]) -> dict[str, Any]:
    features = [_field_text(item) for item in payload.get("features", []) if _field_text(item)]
    constraints = [_field_text(item) for item in payload.get("constraints", []) if _field_text(item)]
    assumptions = [_field_text(item) for item in payload.get("assumptions", []) if _field_text(item)]
    return {
        **payload,
        "main_idea": str(payload.get("main_idea") or payload.get("mainIdea") or "").strip(),
        "features": features,
        "constraints": constraints,
        "assumptions": assumptions,
    }


def _idea_looks_like_clone(state: ProjectState) -> bool:
    text = f"{state.idea} {state.analysis}".lower()
    clone_words = ["clone", "copy", "same as", "like chatgpt", "chatgpt clone", "build chatgpt", "make chatgpt"]
    dominant_products = ["chatgpt", "claude", "gemini", "copilot", "codex", "perplexity", "poe", "cursor"]
    return any(word in text for word in clone_words) and any(product in text for product in dominant_products)


def _normalize_validation(payload: dict[str, Any], state: ProjectState, sources: list[dict[str, Any]]) -> dict[str, Any]:
    payload.setdefault("citations", _citations(sources))
    payload.setdefault("existing_platforms", _platforms_from_sources(sources))
    scores = payload.get("scores")
    if not isinstance(scores, dict):
        scores = {}
    normalized_scores = {
        "overall": int(scores.get("overall", 35) or 35),
        "feasibility": int(scores.get("feasibility", 70) or 70),
        "uniqueness": int(scores.get("uniqueness", 20) or 20),
        "market_potential": int(scores.get("market_potential", scores.get("marketPotential", 45)) or 45),
    }
    if _idea_looks_like_clone(state):
        normalized_scores["uniqueness"] = min(normalized_scores["uniqueness"], 15)
        normalized_scores["overall"] = min(normalized_scores["overall"], 30)
        normalized_scores["market_potential"] = min(normalized_scores["market_potential"], 45)
        payload["clone_risk"] = {
            "level": "high",
            "reason": "The idea reads as a clone of a dominant existing AI product without a clear wedge.",
            "score_cap_applied": True,
        }
        existing = payload.get("existing_platforms")
        if not isinstance(existing, list):
            existing = []
        known = [
            {"name": "ChatGPT", "url": "https://chatgpt.com", "description": "Dominant general AI assistant from OpenAI.", "features": ["chat", "reasoning", "tool use", "file analysis"]},
            {"name": "Claude", "url": "https://claude.ai", "description": "General AI assistant from Anthropic.", "features": ["chat", "coding", "analysis", "artifacts"]},
            {"name": "Google Gemini", "url": "https://gemini.google.com", "description": "Google's multimodal AI assistant.", "features": ["chat", "search integration", "multimodal reasoning"]},
            {"name": "GitHub Copilot", "url": "https://github.com/features/copilot", "description": "AI coding assistant for IDE and GitHub workflows.", "features": ["code completion", "chat", "agentic coding"]},
            {"name": "OpenAI Codex", "url": "https://openai.com/codex", "description": "Agentic software engineering assistant.", "features": ["coding tasks", "repo changes", "terminal workflows"]},
            {"name": "Claude Code", "url": "https://www.anthropic.com/claude-code", "description": "Anthropic's terminal-based agentic coding tool.", "features": ["code editing", "repo understanding", "automation"]},
            {"name": "Perplexity", "url": "https://www.perplexity.ai", "description": "Answer engine focused on web research and citations.", "features": ["search", "citations", "research answers"]},
        ]
        names = {str(item.get("name", "")).lower() for item in existing if isinstance(item, dict)}
        payload["existing_platforms"] = existing + [item for item in known if item["name"].lower() not in names]
        payload.setdefault("recommended_pivots", [
            "Target a narrow user group that ChatGPT does not serve deeply.",
            "Add a workflow-specific data source, evaluation loop, or collaboration layer.",
            "Compete on a constrained hackathon demo wedge, not as a general chatbot clone.",
        ])
    payload["scores"] = {key: max(0, min(100, value)) for key, value in normalized_scores.items()}
    return payload


def _merge_unique(first: list[str], second: list[str]) -> list[str]:
    merged: list[str] = []
    for item in first + second:
        if item not in merged:
            merged.append(item)
    return merged


def _string_list(value: Any) -> list[str]:
    if isinstance(value, list):
        items: list[str] = []
        for child in value:
            items.extend(_string_list(child))
        return items
    if isinstance(value, str):
        return [item.strip() for item in value.replace("\n", ",").replace(";", ",").split(",") if item.strip()]
    if isinstance(value, dict):
        items: list[str] = []
        for child in value.values():
            items.extend(_string_list(child))
        return items
    if value is None:
        return []
    return [str(value)]


def _normalize_tech_stack(payload: dict[str, Any], selected: list[str]) -> dict[str, Any]:
    suggestions = []
    raw_suggestions = payload.get("suggestions", [])
    if not isinstance(raw_suggestions, list):
        raw_suggestions = []
    for index, raw in enumerate(raw_suggestions):
        suggestion = raw if isinstance(raw, dict) else {}
        stack = _string_list(suggestion.get("stack"))
        if not stack:
            continue
        suggestions.append(
            {
                "name": str(suggestion.get("name") or f"Suggested Stack {index + 1}"),
                "stack": stack,
                "reason": str(suggestion.get("reason") or "Recommended by the AI stack agent."),
            }
        )
    return {
        "selected": _string_list(payload.get("selected")) or selected,
        "suggestions": suggestions,
        "risks": _string_list(payload.get("risks")),
    }


def _fallback_slide_bullets(section: str, state: ProjectState) -> list[str]:
    main_idea = state.analysis.get("main_idea") or state.idea or "Project concept"
    return [
        f"Connect {section.lower()} to {main_idea}",
        "Use validation and research evidence where available",
        "Keep the message short enough for a hackathon pitch",
    ]
