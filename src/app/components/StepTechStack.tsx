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
              <span style={{ fontWeight: 500 }}>Tech Stack</span>
              <span>Choose your tools</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: 3, background: "#F0F0F0" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "#007AFF" }}
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
                fontWeight: 600, color: "#111111",
                letterSpacing: "-0.025em", lineHeight: 1.25, marginBottom: 6,
              }}
            >
              Select your tech stack
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#9CA3AF", marginBottom: 28 }}>
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
                      background: isSelected ? "#111111" : "#FAFAFA",
                      border: isSelected ? "1.5px solid #111111" : "1.5px solid #E5E7EB",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: isSelected ? "#FFFFFF" : "#374151",
                    }}
                  >
                    <span style={{ fontSize: "0.85rem" }}>{t.icon}</span>
                    {t.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1" style={{ height: 1, background: "#E5E7EB" }} />
              <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em" }}>or</span>
              <div className="flex-1" style={{ height: 1, background: "#E5E7EB" }} />
            </div>

            {/* AI Suggest button */}
            <motion.button
              onClick={handleAiSuggest}
              disabled={aiLoading}
              whileHover={aiLoading ? {} : { scale: 1.02 }}
              whileTap={aiLoading ? {} : { scale: 0.98 }}
              className="w-full py-3.5 rounded-[14px] cursor-pointer flex items-center justify-center gap-2"
              style={{
                background: "#FAFAFA",
                border: "1.5px solid #E5E7EB",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#111111",
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
                  <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#007AFF", marginBottom: 4 }}>
                    🤖 AI Recommended Stacks
                  </p>
                  {aiSuggestions.map((s, i) => (
                    <motion.div
                      key={s.name}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 rounded-[14px]"
                      style={{
                        background: "#FAFAFA",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "#111111" }}>{s.name}</span>
                        <motion.button
                          onClick={() => applySuggestion(s.stack)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 rounded-full cursor-pointer"
                          style={{
                            background: "#111111",
                            color: "#fff",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            border: "none",
                          }}
                        >
                          Apply
                        </motion.button>
                      </div>
                      <p style={{ fontSize: "0.76rem", color: "#6B7280", marginBottom: 8, lineHeight: 1.5 }}>{s.reason}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {s.stack.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-full"
                            style={{
                              fontSize: "0.65rem",
                              fontWeight: 600,
                              background: selected.includes(t) ? "rgba(52,199,89,0.08)" : "#F5F5F5",
                              color: selected.includes(t) ? "#34C759" : "#6B7280",
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
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: "0.82rem", color: "#9CA3AF" }}>
                  {selected.length} technolog{selected.length > 1 ? "ies" : "y"} selected
                </motion.p>
              ) : (
                <span />
              )}
              <motion.button
                onClick={onNext}
                disabled={selected.length === 0}
                whileHover={selected.length === 0 ? {} : { scale: 1.02 }}
                whileTap={selected.length === 0 ? {} : { scale: 0.98 }}
                className="px-7 py-3 rounded-[12px] cursor-pointer"
                style={{
                  background: selected.length === 0 ? "#E5E7EB" : "#111111",
                  color: selected.length === 0 ? "#9CA3AF" : "#fff",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  border: "none",
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
