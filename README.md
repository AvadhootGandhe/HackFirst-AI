<div align="center">

<br />

# 🚀 Hackathon Team Ecosystem

### All-in-one platform for high-performance hackathon teams

*From first spark to final pitch — idea discovery, team collaboration, validation, planning, and AI-powered execution, unified.*

<br />

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org)
[![LangChain](https://img.shields.io/badge/LangChain-2EB8F3?style=for-the-badge&logo=chainlink&logoColor=white)](https://www.langchain.com)
[![Pydantic](https://img.shields.io/badge/Pydantic-E92063?style=for-the-badge&logo=pydantic&logoColor=white)](https://docs.pydantic.dev)

<br />

</div>

---

## 📖 What Is This?

**Hackathon Team Ecosystem** is a full-stack platform designed to supercharge hackathon teams at every stage of the process. Instead of juggling five different tools, teams get one cohesive workspace — AI-assisted brainstorming, structured project validation, task planning, and real-time collaboration, all in a single guided workflow.

The architecture is built around a clean separation between the **presentation layer** (React + TypeScript frontend) and the **intelligence layer** (FastAPI + LangChain backend agents), making it easy to iterate on either side independently.

---

## ✨ Features

| Stage | What it does |
|---|---|
| 💡 **Idea Discovery** | AI-assisted brainstorming and problem space exploration |
| 🤝 **Team Coordination** | Shared workspace for role assignment and collaboration |
| ✅ **Project Validation** | Structured validation workflows for idea viability |
| 🗺️ **Planning** | Task breakdown, milestone setting, and timeline planning |
| 🤖 **AI Execution Support** | Agent-driven guidance throughout the build process |

---

## 🏗️ Architecture

The project is organized into two primary layers with focused responsibilities:

```
hackathon-team-ecosystem/
│
├── src/                            # Frontend — React + TypeScript
│   ├── app/
│   │   ├── components/             # Page steps & workflow views
│   │   │   └── ui/                 # Shared design system primitives
│   ├── lib/
│   │   └── api.ts                  # Backend integration client
│   ├── styles/                     # Global styles & theme
│   └── main.tsx                    # App entry & wiring
│
├── backend/                        # Backend — Python + FastAPI
│   └── app/
│       ├── main.py                 # API entrypoint
│       ├── api/                    # Endpoints & request routing
│       ├── agents/                 # Workflow orchestration & graph logic
│       ├── schemas/                # Request / response validation
│       ├── models/                 # Domain objects & repositories
│       └── core/                   # Config, database & integrations
│
├── data/                           # Shared assets & dev data
└── tests/                          # Backend workflow validation
```

---

## 🔁 Data Flow

```
User Intent  →  Guided UI Steps  →  API Layer  →  Agent Workflow  →  Rendered Results
     🧑‍💻              📋                 🌐               🤖                  ✨
```

1. **Collect** — the frontend gathers user intent through guided workflow steps
2. **Route** — requests are sent to the FastAPI backend
3. **Process** — agents and workflow nodes handle the request using domain schemas
4. **Return** — structured results are rendered back to the UI

---

## 🛠️ Tech Stack

### Frontend

| Technology | Role |
|---|---|
| **React** | UI framework |
| **TypeScript** | Type-safe application logic |
| **Vite** | Build tooling & dev server |
| **Tailwind CSS** | Utility-first styling |
| **Radix UI** | Accessible component primitives |
| **Material UI** | Component library |

### Backend

| Technology | Role |
|---|---|
| **FastAPI** | API framework & routing |
| **Python** | Core language |
| **Uvicorn** | ASGI server |
| **Pydantic** | Schema validation |
| **LangChain** | Agent orchestration & AI workflows |

---

## 🧠 Design Principles

**🧩 Modular** — Clear folder boundaries for UI, API, agents, and models. Each layer is independently testable and replaceable.

**🗺️ Guided workflow** — Step-based UX covering the full hackathon journey: brainstorming → coordination → validation → planning → review.

**🔌 Extensible** — Schema-driven APIs and pluggable agent nodes make it straightforward to add new AI capabilities without touching the frontend.

**💎 Polished presentation** — Modern component primitives and a refined design system for a production-quality interface, not a prototype feel.

---

## 📁 Key Entry Points

| File | Purpose |
|---|---|
| `src/main.tsx` | Frontend app bootstrapping |
| `src/lib/api.ts` | All frontend → backend API calls |
| `backend/app/main.py` | FastAPI app & router registration |
| `backend/app/agents/` | LangChain agent graph & workflow nodes |
| `backend/app/schemas/` | Pydantic request/response models |

---

<div align="center">

<br />

Built with ⚡ for the hackathon &nbsp;·&nbsp; Frontend meets AI backend

</div>