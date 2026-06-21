import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";

/* ── Dummy data ────────────────────────────────────── */

const scores = {
  overall: 78,
  feasibility: 82,
  uniqueness: 71,
  marketPotential: 80,
};

const existingPlatforms = [
  {
    name: "ResearchHub",
    url: "researchhub.com",
    description: "Collaborative research platform for academic papers with token-based incentives",
    features: ["Paper peer review", "Token rewards", "Academic focus"],
  },
  {
    name: "IdeaScale",
    url: "ideascale.com",
    description: "Innovation management platform for crowdsourcing ideas within organizations",
    features: ["Idea submission", "Community voting", "Enterprise workflows"],
  },
  {
    name: "Devpost",
    url: "devpost.com",
    description: "Hackathon discovery and project showcase platform for developers",
    features: ["Hackathon listings", "Project showcase", "Team matching"],
  },
  {
    name: "Notion AI",
    url: "notion.so",
    description: "AI-powered workspace with research and brainstorming capabilities",
    features: ["AI writing", "Knowledge base", "Collaboration"],
  },
];

const researchGaps = [
  {
    gap: "No unified AI-driven hackathon research pipeline",
    detail: "Existing tools handle parts of the workflow (ideation OR research OR presentation) but none connect the full pipeline end-to-end.",
  },
  {
    gap: "Lack of real-time competitive analysis for hackathon ideas",
    detail: "Current platforms don't provide instant competitive landscape analysis tailored to time-constrained hackathon environments.",
  },
  {
    gap: "Missing automated feasibility scoring for rapid prototyping",
    detail: "No tool evaluates technical feasibility, market fit, and uniqueness simultaneously within hackathon timelines.",
  },
  {
    gap: "No domain-aware research contextualization",
    detail: "Generic research tools don't adapt their analysis based on specific hackathon domains like FinTech, HealthTech, or AI/ML.",
  },
];

const opportunities = [
  {
    title: "End-to-end hackathon intelligence",
    description: "Build the first platform that covers idea → validation → research → presentation in one flow, saving teams 60%+ of prep time.",
    impact: "High",
  },
  {
    title: "Domain-specific research engine",
    description: "Leverage domain classification to deliver contextually relevant market data, competitor analysis, and trend insights.",
    impact: "High",
  },
  {
    title: "AI-powered team composition recommendations",
    description: "Suggest optimal team structures based on idea requirements and available skill sets.",
    impact: "Medium",
  },
  {
    title: "Real-time idea differentiation scoring",
    description: "Continuously score how an idea stands out against competitors as users refine their concept.",
    impact: "Medium",
  },
];

/* ── Score ring component ─────────────────────────── */

function ScoreRing({ score, label, color, size = 80 }: { score: number; label: string; color: string; size?: number }) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#F0F0F0" strokeWidth={5} />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{ fontSize: size > 90 ? "1.4rem" : "1rem", fontWeight: 700, color: "#111111" }}
        >
          {score}
        </motion.div>
      </div>
      <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#6B7280", letterSpacing: "0.01em" }}>{label}</span>
    </div>
  );
}

/* ── Impact badge ─────────────────────────────────── */

function ImpactBadge({ impact }: { impact: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    High: { bg: "rgba(52,199,89,0.08)", text: "#34C759" },
    Medium: { bg: "rgba(255,122,0,0.08)", text: "#FF7A00" },
    Low: { bg: "#F5F5F5", text: "#6B7280" },
  };
  const c = colors[impact] || colors.Low;
  return (
    <span
      className="px-2 py-0.5 rounded-full"
      style={{ fontSize: "0.65rem", fontWeight: 650, background: c.bg, color: c.text }}
    >
      {impact} Impact
    </span>
  );
}

/* ── Main component ───────────────────────────────── */

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function StepValidationResults({ onNext, onBack }: Props) {
  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-12"
      style={{ background: "#FFFFFF" }}
    >
      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center gap-4">
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
            style={{ background: "#F5F5F5", border: "1px solid #E5E7EB", color: "#6B7280", fontSize: "1.1rem" }}
          >
            ←
          </motion.button>
          <div className="flex-1">
            <div className="flex justify-between mb-2" style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>
              <span style={{ fontWeight: 500 }}>Validation Results</span>
              <span>AI Report</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: 3, background: "#F0F0F0" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "#34C759" }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>

        {/* ─── 1. SCORE ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassCard className="p-8 md:p-10 mb-4">
            <div className="flex items-center gap-2 mb-6">
              <span style={{ fontSize: "1.3rem" }}>📊</span>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 600, color: "#111111", letterSpacing: "-0.02em" }}>
                Validation Score
              </h2>
            </div>

            <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
              <ScoreRing score={scores.overall} label="Overall" color="#34C759" size={100} />
              <ScoreRing score={scores.feasibility} label="Feasibility" color="#007AFF" />
              <ScoreRing score={scores.uniqueness} label="Uniqueness" color="#FF7A00" />
              <ScoreRing score={scores.marketPotential} label="Market Fit" color="#5856D6" />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 text-center"
              style={{ fontSize: "0.82rem", color: "#6B7280", lineHeight: 1.6 }}
            >
              Your idea scores <strong style={{ color: "#34C759" }}>above average</strong> — strong feasibility with room to improve uniqueness.
            </motion.p>
          </GlassCard>
        </motion.div>

        {/* ─── 2. WHAT EXISTS ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassCard className="p-6 mb-4">
            <div className="flex items-center gap-2 mb-5">
              <span style={{ fontSize: "1.2rem" }}>🌐</span>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#111111", letterSpacing: "-0.015em" }}>
                What Already Exists
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {existingPlatforms.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="p-4 rounded-[14px]"
                  style={{
                    background: "#FAFAFA",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#111111" }}>{p.name}</span>
                    <span style={{ fontSize: "0.68rem", color: "#9CA3AF" }}>{p.url}</span>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "#6B7280", marginBottom: 8, lineHeight: 1.5 }}>{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.features.map((f) => (
                      <span
                        key={f}
                        className="px-2 py-0.5 rounded-full"
                        style={{ fontSize: "0.65rem", fontWeight: 600, background: "rgba(0,122,255,0.06)", color: "#007AFF" }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* ─── 3. RESEARCH GAPS ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassCard className="p-6 mb-4">
            <div className="flex items-center gap-2 mb-5">
              <span style={{ fontSize: "1.2rem" }}>🔬</span>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#111111", letterSpacing: "-0.015em" }}>
                Research Gaps
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {researchGaps.map((g, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3 p-4 rounded-[14px]"
                  style={{ background: "rgba(255,69,58,0.03)", border: "1px solid rgba(255,69,58,0.1)" }}
                >
                  <div
                    className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-[8px] flex items-center justify-center"
                    style={{ background: "rgba(255,69,58,0.08)", fontSize: "0.7rem", color: "#FF453A" }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#111111", marginBottom: 3 }}>{g.gap}</div>
                    <div style={{ fontSize: "0.78rem", color: "#6B7280", lineHeight: 1.55 }}>{g.detail}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* ─── 4. WHAT YOU CAN DO ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassCard className="p-6 mb-4">
            <div className="flex items-center gap-2 mb-5">
              <span style={{ fontSize: "1.2rem" }}>🚀</span>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#111111", letterSpacing: "-0.015em" }}>
                What You Can Do
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {opportunities.map((o, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="p-4 rounded-[14px]"
                  style={{ background: "rgba(52,199,89,0.03)", border: "1px solid rgba(52,199,89,0.12)" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "#111111" }}>{o.title}</span>
                    <ImpactBadge impact={o.impact} />
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "#6B7280", lineHeight: 1.55, margin: 0 }}>{o.description}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-2 mb-8 flex justify-end"
        >
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="px-7 py-3 rounded-[12px] cursor-pointer"
            style={{
              background: "#111111",
              color: "#FFFFFF",
              fontSize: "0.95rem",
              fontWeight: 600,
              border: "none",
              letterSpacing: "-0.01em",
            }}
          >
            Continue to Research →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
