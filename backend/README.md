# HackFlow AI Backend

FastAPI backend for the existing React flow.

Stack:
- FastAPI API layer
- SQLite persistence
- Gemini for agent reasoning
- Tavily for real web/article research
- SSE for step progress
- LangGraph-ready workflow orchestration with a local fallback runner for tests

The backend mirrors the frontend flow:

1. Idea + domain input
2. AI idea analysis
3. Human review checkpoint
4. Optional validation with live web sources
5. Tech stack suggestions
6. Methodology generation
7. Quantitative/qualitative research
8. PPT section content generation
9. Dashboard/chat over saved project state

Install:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Run later, when you are ready:

```bash
uvicorn app.main:app --reload
```

