from __future__ import annotations

from typing import Any


def build_langgraph_outline():
    """Build the intended LangGraph topology when langgraph is installed.

    Runtime endpoints use HackFlowGraph methods so each frontend step can be
    called independently. This outline documents the full backend flow and can
    be compiled for batch execution later.
    """
    try:
        from langgraph.graph import END, StateGraph  # type: ignore
    except Exception:
        return None

    graph = StateGraph(dict)

    def passthrough(state: dict[str, Any]) -> dict[str, Any]:
        return state

    graph.add_node("idea_analysis", passthrough)
    graph.add_node("human_review_checkpoint", passthrough)
    graph.add_node("validation", passthrough)
    graph.add_node("tech_stack", passthrough)
    graph.add_node("methodology", passthrough)
    graph.add_node("research", passthrough)
    graph.add_node("ppt", passthrough)
    graph.add_node("dashboard_ready", passthrough)

    graph.set_entry_point("idea_analysis")
    graph.add_edge("idea_analysis", "human_review_checkpoint")
    graph.add_edge("human_review_checkpoint", "validation")
    graph.add_edge("validation", "tech_stack")
    graph.add_edge("tech_stack", "methodology")
    graph.add_edge("methodology", "research")
    graph.add_edge("research", "ppt")
    graph.add_edge("ppt", "dashboard_ready")
    graph.add_edge("dashboard_ready", END)
    return graph.compile()

