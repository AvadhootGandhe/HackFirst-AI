const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

type Json = Record<string, unknown>;

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export interface ProjectResponse {
  id: string;
  title: string;
  status: string;
  inputs: Json;
  artifacts: Json;
  sources: Json[];
}

export interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

export interface ArtifactResponse<T = Json> {
  project_id: string;
  kind: string;
  payload: T;
}

export interface ReviewData {
  mainIdea: string;
  features: string[];
  constraints: string[];
  assumptions?: string[];
}

export interface ValidationData {
  scores?: {
    overall?: number;
    feasibility?: number;
    uniqueness?: number;
    market_potential?: number;
    marketPotential?: number;
  };
  existing_platforms?: Array<{ name: string; url: string; description: string; features?: string[] }>;
  research_gaps?: Array<{ gap: string; detail: string }>;
  opportunities?: Array<{ title: string; description: string; impact: string }>;
  citations?: Array<{ title: string; url: string; source_index?: number }>;
}

export interface TechStackSuggestion {
  name: string;
  stack: string[];
  reason: string;
}

export interface TechStackData {
  suggestions?: TechStackSuggestion[];
  risks?: string[];
}

export function toReviewData(payload: Json): ReviewData {
  return {
    mainIdea: String(payload.main_idea ?? payload.mainIdea ?? ""),
    features: Array.isArray(payload.features) ? payload.features.map(String) : [],
    constraints: Array.isArray(payload.constraints) ? payload.constraints.map(String) : [],
    assumptions: Array.isArray(payload.assumptions) ? payload.assumptions.map(String) : [],
  };
}

export function fromReviewData(data: ReviewData): Json {
  return {
    main_idea: data.mainIdea,
    features: data.features,
    constraints: data.constraints,
    assumptions: data.assumptions ?? [],
  };
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap(toStringArray);
  }
  if (typeof value === "string") {
    return value
      .split(/[,;\n]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).flatMap(toStringArray);
  }
  return value == null ? [] : [String(value)];
}

function normalizeTechStackData(payload: Json): TechStackData {
  const rawSuggestions = Array.isArray(payload.suggestions) ? payload.suggestions : [];
  return {
    suggestions: rawSuggestions.map((item, index) => {
      const suggestion = item && typeof item === "object" ? item as Record<string, unknown> : {};
      return {
        name: String(suggestion.name ?? `Suggested Stack ${index + 1}`),
        stack: toStringArray(suggestion.stack),
        reason: String(suggestion.reason ?? "Recommended by the AI stack agent."),
      };
    }).filter((suggestion) => suggestion.stack.length > 0),
    risks: toStringArray(payload.risks),
  };
}

export const api = {
  eventsUrl(projectId: string) {
    return `${API_BASE}/api/projects/${projectId}/events`;
  },

  createProject(title = "Hackathon Project") {
    return request<ProjectResponse>("/api/projects", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
  },

  getProject(projectId: string) {
    return request<ProjectResponse>(`/api/projects/${projectId}`);
  },

  saveIdea(projectId: string, idea: string) {
    return request<ProjectResponse>(`/api/projects/${projectId}/idea`, {
      method: "POST",
      body: JSON.stringify({ idea }),
    });
  },

  saveDomains(projectId: string, domains: string[]) {
    return request<ProjectResponse>(`/api/projects/${projectId}/domains`, {
      method: "POST",
      body: JSON.stringify({ domains }),
    });
  },

  analyze(projectId: string) {
    return request<ArtifactResponse<Json>>(`/api/projects/${projectId}/analyze`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  saveAnalysisReview(projectId: string, data: ReviewData) {
    return request<ArtifactResponse<Json>>(`/api/projects/${projectId}/analysis-review`, {
      method: "PUT",
      body: JSON.stringify(fromReviewData(data)),
    });
  },

  validate(projectId: string) {
    return request<ArtifactResponse<ValidationData>>(`/api/projects/${projectId}/validate`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  async suggestTechStack(projectId: string, selected: string[]) {
    const response = await request<ArtifactResponse<Json>>(`/api/projects/${projectId}/tech-stack/suggest`, {
      method: "POST",
      body: JSON.stringify({ selected }),
    });
    return { ...response, payload: normalizeTechStackData(response.payload) } as ArtifactResponse<TechStackData>;
  },

  generateMethodology(projectId: string, currentMethodology: string) {
    return request<ArtifactResponse<{ methodology?: string }>>(`/api/projects/${projectId}/methodology/generate`, {
      method: "POST",
      body: JSON.stringify({ current_methodology: currentMethodology }),
    });
  },

  runResearch(projectId: string, selected: string[], questions: Record<string, string>) {
    return request<ArtifactResponse<Json>>(`/api/projects/${projectId}/research`, {
      method: "POST",
      body: JSON.stringify({ selected, questions }),
    });
  },

  generatePpt(projectId: string, sections: string[]) {
    return request<ArtifactResponse<Json>>(`/api/projects/${projectId}/ppt/generate`, {
      method: "POST",
      body: JSON.stringify({ sections }),
    });
  },

  saveTeam(projectId: string, team: string[]) {
    return request<ProjectResponse>(`/api/projects/${projectId}/team`, {
      method: "POST",
      body: JSON.stringify({ team }),
    });
  },

  saveTerms(projectId: string, agreed: Record<string, boolean>) {
    return request<ProjectResponse>(`/api/projects/${projectId}/terms`, {
      method: "POST",
      body: JSON.stringify({ agreed }),
    });
  },

  chat(projectId: string, message: string) {
    return request<{ message: ChatMessage; reply: ChatMessage }>(`/api/projects/${projectId}/chat`, {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  },
};
