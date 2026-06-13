import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { GlassCard } from "./GlassCard";

const techOptions = [
  { label: "React", icon: "⚛️" },
  { label: "Next.js", icon: "▲" },
  { label: "Node.js", icon: "🟢" },
  { label: "Python", icon: "🐍" },
  { label: "Flask", icon: "🧪" },
  { label: "FastAPI", icon: "⚡" },
  { label: "Django", icon: "🎸" },
  { label: "TypeScript", icon: "🔷" },
  { label: "PostgreSQL", icon: "🐘" },
  { label: "MongoDB", icon: "🍃" },
  { label: "Firebase", icon: "🔥" },
  { label: "Redis", icon: "🔴" },
  { label: "Docker", icon: "🐳" },
  { label: "AWS", icon: "☁️" },
  { label: "TensorFlow", icon: "🧠" },
  { label: "PyTorch", icon: "🔦" },
  { label: "OpenAI API", icon: "🤖" },
  { label: "LangChain", icon: "🔗" },
  { label: "Tailwind CSS", icon: "🎨" },
  { label: "GraphQL", icon: "◈" },
  { label: "Supabase", icon: "⚡" },
  { label: "Vercel", icon: "▲" },
  { label: "Figma", icon: "🎯" },
  { label: "Flutter", icon: "💙" },
];

const aiSuggestions = [
  {
    name: "Full-Stack AI Pipeline",
    stack: ["React", "TypeScript", "FastAPI", "Python", "OpenAI API", "PostgreSQL", "Docker", "Vercel"],
    reason: "Best for rapid AI-powered web apps with a robust Python backend for ML processing.",
  },
  {
    name: "Real-Time Analytics Stack",
    stack: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Redis", "TensorFlow", "AWS"],
    reason: "Optimized for data-heavy apps needing real-time processing and scalable infrastructure.",
  },
  {
    name: "Lightweight MVP Stack",
    stack: ["React", "Firebase", "Tailwind CSS", "OpenAI API"],
    reason: "Minimal setup, maximum speed — ship a working prototype within hours.",
  },
  {
    name: "Enterprise AI Platform",
    stack: ["Next.js", "TypeScript", "Django", "PostgreSQL", "LangChain", "Docker", "AWS"],
    reason: "Production-grade architecture with strong ORM, auth, and orchestrated AI workflows.",
  },
];

interface Props {
  selected: string[];
  onChange: (v: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepTechStack({ selected, onChange, onNext, onBack }: Props) {
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const toggle = (label: string) => {
    onChange(selected.includes(label) ? selected.filter((x) => x !== label) : [...selected, label]);
  };

  const handleAiSuggest = () => {
    setAiLoading(true);
    setTimeout(() => {
      setAiLoading(false);
      setShowAiSuggestions(true);
    }, 1500);
  };

  const applySuggestion = (stack: string[]) => {
    const merged = Array.from(new Set([...selected, ...stack]));
    onChange(merged);
    setShowAiSuggestions(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-12"
      style={{ background: "linear-gradient(135deg, #f8f8fc 0%, #eeeef8 50%, #f4f0ff 100%)" }}
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{ width: 500, height: 500, top: "-10%", right: "-5%", background: "rgba(139,92,246,0.06)", filter: "blur(80px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "-5%", left: "-5%", background: "rgba(99,102,241,0.07)", filter: "blur(80px)" }} />
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
              <span style={{ fontWeight: 500 }}>Tech Stack</span>
              <span>Choose your tools</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: 4, background: "rgba(99,102,241,0.12)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
                initial={{ width: 0 }}
                animate={{ width: "55%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassCard className="p-8 md:p-10">
            <h2
              style={{
                fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
                fontWeight: 700, color: "#0a0a14",
                letterSpacing: "-0.025em", lineHeight: 1.25, marginBottom: 6,
              }}
            >
              Select your tech stack
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#9999b0", marginBottom: 28 }}>
              Pick technologies you plan to use, or let AI suggest a stack for you.
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {techOptions.map((t, i) => {
                const isSelected = selected.includes(t.label);
                return (
                  <motion.button
                    key={t.label}
                    onClick={() => toggle(t.label)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.02 }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    className="relative px-3.5 py-2 rounded-full cursor-pointer flex items-center gap-1.5"
                    style={{
                      background: isSelected ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.7)",
                      border: isSelected ? "1.5px solid rgba(34,197,94,0.4)" : "1.5px solid rgba(0,0,0,0.08)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: isSelected ? "#16a34a" : "#3a3a52",
                      boxShadow: isSelected ? "0 2px 10px rgba(34,197,94,0.12)" : "0 1px 4px rgba(0,0,0,0.03)",
                    }}
                  >
                    <span style={{ fontSize: "0.85rem" }}>{t.icon}</span>
                    {t.label}
                    {isSelected && (
                      <motion.div
                        className="absolute -bottom-0.5 left-3 right-3 rounded-full"
                        style={{ height: 2, background: "#22c55e" }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.25 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1" style={{ height: 1, background: "rgba(0,0,0,0.07)" }} />
              <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#9999b0", textTransform: "uppercase", letterSpacing: "0.05em" }}>or</span>
              <div className="flex-1" style={{ height: 1, background: "rgba(0,0,0,0.07)" }} />
            </div>

            {/* AI Suggest button */}
            <motion.button
              onClick={handleAiSuggest}
              disabled={aiLoading}
              whileHover={aiLoading ? {} : { scale: 1.02 }}
              whileTap={aiLoading ? {} : { scale: 0.98 }}
              className="w-full py-3.5 rounded-2xl cursor-pointer flex items-center justify-center gap-2"
              style={{
                background: aiLoading
                  ? "rgba(99,102,241,0.08)"
                  : "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.12) 100%)",
                border: "1.5px solid rgba(99,102,241,0.2)",
                fontSize: "0.9rem",
                fontWeight: 620,
                color: "#6366f1",
              }}
            >
              {aiLoading ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{ display: "inline-block" }}
                  >
                    ⚙️
                  </motion.span>
                  Analyzing your idea…
                </>
              ) : (
                <>
                  <span>✨</span> Suggest with AI
                </>
              )}
            </motion.button>

            {/* AI Suggestions */}
            <AnimatePresence>
              {showAiSuggestions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-5 flex flex-col gap-3"
                >
                  <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#6366f1", marginBottom: 4 }}>
                    🤖 AI Recommended Stacks
                  </p>
                  {aiSuggestions.map((s, i) => (
                    <motion.div
                      key={s.name}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 rounded-2xl"
                      style={{
                        background: "rgba(99,102,241,0.04)",
                        border: "1px solid rgba(99,102,241,0.12)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span style={{ fontSize: "0.88rem", fontWeight: 650, color: "#0a0a14" }}>{s.name}</span>
                        <motion.button
                          onClick={() => applySuggestion(s.stack)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 rounded-full cursor-pointer"
                          style={{
                            background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                            color: "#fff",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            border: "none",
                          }}
                        >
                          Apply
                        </motion.button>
                      </div>
                      <p style={{ fontSize: "0.76rem", color: "#6b6b82", marginBottom: 8, lineHeight: 1.5 }}>{s.reason}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {s.stack.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-full"
                            style={{
                              fontSize: "0.65rem",
                              fontWeight: 600,
                              background: selected.includes(t) ? "rgba(34,197,94,0.12)" : "rgba(99,102,241,0.08)",
                              color: selected.includes(t) ? "#16a34a" : "#6366f1",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Selected count + continue */}
            <motion.div className="mt-8 flex items-center justify-between">
              {selected.length > 0 ? (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: "0.82rem", color: "#9999b0" }}>
                  {selected.length} technolog{selected.length > 1 ? "ies" : "y"} selected
                </motion.p>
              ) : (
                <span />
              )}
              <motion.button
                onClick={onNext}
                disabled={selected.length === 0}
                whileHover={selected.length === 0 ? {} : { scale: 1.03, y: -1 }}
                whileTap={selected.length === 0 ? {} : { scale: 0.97 }}
                className="px-7 py-3 rounded-2xl cursor-pointer"
                style={{
                  background: selected.length === 0
                    ? "rgba(99,102,241,0.3)"
                    : "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
                  color: "#fff",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  border: "none",
                  boxShadow: selected.length === 0 ? "none" : "0 4px 20px rgba(99,102,241,0.35)",
                  cursor: selected.length === 0 ? "not-allowed" : "pointer",
                }}
              >
                Continue →
              </motion.button>
            </motion.div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
