
# Hackathon Research Platform

> A polished hackathon research experience with a modern frontend, smart backend APIs, and guided product workflow.

## ✨ Project Architecture

This repository is organized into two primary layers:

1. **Frontend** - a reactive browser application built with TypeScript and modern UI primitives.
2. **Backend** - a Python API layer with agent-driven workflows, data modeling, and integration support.

---

## 🧩 Architecture Overview

- `src/` contains the user-facing application and reusable UI system.
- `backend/` contains the server-side logic, agent orchestration, API endpoints, and data models.
- `data/` may contain shared assets or persistent data used during development.
- `tests/` contains validation scenarios for backend workflows.

The architecture is designed as a clean separation between:

- **Presentation layer** (`src/app/components`)
- **Application wiring** (`src/main.tsx` + `src/lib/api.ts`)
- **Domain backend** (`backend/app`)
- **Agent orchestration and workflows** (`backend/app/agents`)
- **API surface and schema definitions** (`backend/app/api`, `backend/app/schemas`)

---

## 🖥️ Frontend Structure

The frontend is built with a component-first design.

- `src/app/components/` contains page steps and UI views.
- `src/app/components/ui/` contains shared design system primitives.
- `src/lib/api.ts` provides the client integration layer for backend calls.
- `src/styles/` contains global styles and utility CSS for the app theme.

The UI is centered around a step-based hackathon workflow, including idea discovery, validation, research, team planning, and final review.

---

## ⚙️ Backend Structure

The backend is organized into systems with focused responsibilities:

- `backend/app/main.py` is the API entrypoint.
- `backend/app/api/` defines endpoint behavior and request routing.
- `backend/app/agents/` orchestrates agent-based state, graph logic, and workflow nodes.
- `backend/app/models/` stores repository objects and domain models.
- `backend/app/schemas/` defines request and response validation.
- `backend/app/core/` includes configuration, database access, and integration glue.

This setup supports a modular backend that can evolve from simple API routing into more advanced AI-assisted workflows.

---

## 🔗 Data Flow

1. The frontend collects user intent through guided workflow steps.
2. Requests are sent to the backend API layer.
3. Backend agents or workflow nodes process the request using domain schemas and repositories.
4. Responses return structured results for the UI to render.

This flow keeps the user experience responsive while enabling extensibility in backend processing.

---

## 🧠 Design Principles

- **Modular**: Clear folder boundaries for UI, API, agents, and models.
- **Guided workflow**: Step-based experience for hackathon research and planning.
- **Extensible**: Backend agents and schema-driven APIs enable growth.
- **Polished presentation**: Modern CSS and component primitives for a refined UI.

---

## 📁 Key Folders at a Glance

- `src/app/components/` — frontend pages and workflow steps
- `src/app/components/ui/` — shared UI primitives and theme
- `backend/app/agents/` — workflow orchestration and graph logic
- `backend/app/api/` — API endpoints and request handlers
- `backend/app/core/` — platform configuration and integrations
- `backend/app/schemas/` — typed request/response definitions
- `backend/app/models/` — backend repository/data objects

---

## 🎯 Why This Architecture

This project is built to separate user-facing design from backend intelligence.
That separation makes it easier to iterate on the frontend experience while keeping backend workflow logic isolated and testable.
  