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
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={5} />
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
          style={{ fontSize: size > 90 ? "1.4rem" : "1rem", fontWeight: 700, color: "#0a0a14" }}
        >
          {score}
        </motion.div>
      </div>
      <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#6b6b82", letterSpacing: "0.01em" }}>{label}</span>
    </div>
  );
}

/* ── Impact badge ─────────────────────────────────── */

function ImpactBadge({ impact }: { impact: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    High: { bg: "rgba(34,197,94,0.1)", text: "#16a34a" },
    Medium: { bg: "rgba(245,158,11,0.1)", text: "#d97706" },
    Low: { bg: "rgba(156,163,175,0.1)", text: "#6b7280" },
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
      style={{ background: "linear-gradient(135deg, #f8f8fc 0%, #eeeef8 50%, #f4f0ff 100%)" }}
    >
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{ width: 500, height: 500, top: "-10%", right: "-5%", background: "rgba(34,197,94,0.05)", filter: "blur(80px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "-5%", left: "-5%", background: "rgba(99,102,241,0.06)", filter: "blur(80px)" }} />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center gap-4">
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
            style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.08)", color: "#6b6b82", fontSize: "1.1rem" }}
          >
            ←
          </motion.button>
          <div className="flex-1">
            <div className="flex justify-between mb-1.5" style={{ fontSize: "0.75rem", color: "#9999b0" }}>
              <span style={{ fontWeight: 500 }}>Validation Results</span>
              <span>AI Report</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: 4, background: "rgba(34,197,94,0.12)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #22c55e, #10b981)" }}
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
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0a0a14", letterSpacing: "-0.02em" }}>
                Validation Score
              </h2>
            </div>

            <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
              <ScoreRing score={scores.overall} label="Overall" color="#22c55e" size={100} />
              <ScoreRing score={scores.feasibility} label="Feasibility" color="#6366f1" />
              <ScoreRing score={scores.uniqueness} label="Uniqueness" color="#f59e0b" />
              <ScoreRing score={scores.marketPotential} label="Market Fit" color="#8b5cf6" />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 text-center"
              style={{ fontSize: "0.82rem", color: "#6b6b82", lineHeight: 1.6 }}
            >
              Your idea scores <strong style={{ color: "#22c55e" }}>above average</strong> — strong feasibility with room to improve uniqueness.
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
              <h3 style={{ fontSize: "1.05rem", fontWeight: 680, color: "#0a0a14", letterSpacing: "-0.015em" }}>
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
                  className="p-4 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span style={{ fontSize: "0.9rem", fontWeight: 650, color: "#0a0a14" }}>{p.name}</span>
                    <span style={{ fontSize: "0.68rem", color: "#9999b0" }}>{p.url}</span>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "#6b6b82", marginBottom: 8, lineHeight: 1.5 }}>{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.features.map((f) => (
                      <span
                        key={f}
                        className="px-2 py-0.5 rounded-full"
                        style={{ fontSize: "0.65rem", fontWeight: 600, background: "rgba(99,102,241,0.08)", color: "#6366f1" }}
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
              <h3 style={{ fontSize: "1.05rem", fontWeight: 680, color: "#0a0a14", letterSpacing: "-0.015em" }}>
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
                  className="flex items-start gap-3 p-4 rounded-2xl"
                  style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.1)" }}
                >
                  <div
                    className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(239,68,68,0.1)", fontSize: "0.7rem", color: "#ef4444" }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 640, color: "#0a0a14", marginBottom: 3 }}>{g.gap}</div>
                    <div style={{ fontSize: "0.78rem", color: "#6b6b82", lineHeight: 1.55 }}>{g.detail}</div>
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
              <h3 style={{ fontSize: "1.05rem", fontWeight: 680, color: "#0a0a14", letterSpacing: "-0.015em" }}>
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
                  className="p-4 rounded-2xl"
                  style={{ background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.12)" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontSize: "0.88rem", fontWeight: 650, color: "#0a0a14" }}>{o.title}</span>
                    <ImpactBadge impact={o.impact} />
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "#6b6b82", lineHeight: 1.55, margin: 0 }}>{o.description}</p>
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
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="px-7 py-3 rounded-2xl cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
              color: "#ffffff",
              fontSize: "0.95rem",
              fontWeight: 600,
              border: "none",
              letterSpacing: "-0.01em",
              boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
            }}
          >
            Continue to Research →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
