import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { GlassCard } from "./GlassCard";

interface ReviewData {
  mainIdea: string;
  features: string[];
  constraints: string[];
}

const DUMMY_DATA: ReviewData = {
  mainIdea:
    "An intelligent platform that leverages AI-driven analysis to help hackathon participants rapidly validate, refine, and strengthen their project ideas through automated market research, competitive analysis, and feasibility assessment.",
  features: [
    "AI-powered idea validation with real-time scoring and feedback",
    "Automated competitive landscape analysis across multiple domains",
    "Smart feature prioritization based on feasibility and market demand",
    "Collaborative workspace for team brainstorming and iteration",
    "One-click research report generation with actionable insights",
  ],
  constraints: [
    "Must function within limited hackathon timeframes (24–48 hours)",
    "API rate limits may restrict real-time data fetching volume",
    "Requires internet connectivity for full AI analysis capabilities",
    "Team size limited to 2–5 members for optimal collaboration",
    "Generated research should be treated as directional, not exhaustive",
  ],
};

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function StepReview({ onNext, onBack }: Props) {
  const [data, setData] = useState<ReviewData>(DUMMY_DATA);
  const [editingSection, setEditingSection] = useState<keyof ReviewData | null>(null);
  const [editBuffer, setEditBuffer] = useState("");

  const startEdit = (section: keyof ReviewData) => {
    if (section === "mainIdea") {
      setEditBuffer(data.mainIdea);
    } else {
      setEditBuffer(data[section].join("\n"));
    }
    setEditingSection(section);
  };

  const saveEdit = () => {
    if (!editingSection) return;
    if (editingSection === "mainIdea") {
      setData({ ...data, mainIdea: editBuffer });
    } else {
      setData({
        ...data,
        [editingSection]: editBuffer
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      });
    }
    setEditingSection(null);
    setEditBuffer("");
  };

  const cancelEdit = () => {
    setEditingSection(null);
    setEditBuffer("");
  };

  const sections: { key: keyof ReviewData; title: string; icon: string; color: string }[] = [
    { key: "mainIdea", title: "Main Idea", icon: "💡", color: "#6366f1" },
    { key: "features", title: "Key Features", icon: "⚙️", color: "#10b981" },
    { key: "constraints", title: "Constraints", icon: "⚠️", color: "#f59e0b" },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(135deg, #f8f8fc 0%, #eeeef8 50%, #f4f0ff 100%)" }}
    >
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            top: "-10%",
            right: "-5%",
            background: "rgba(139,92,246,0.06)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            bottom: "-5%",
            left: "-5%",
            background: "rgba(99,102,241,0.07)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header with back + progress */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-4"
        >
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(0,0,0,0.08)",
              color: "#6b6b82",
              fontSize: "1.1rem",
            }}
          >
            ←
          </motion.button>
          <div className="flex-1">
            <div className="flex justify-between mb-1.5" style={{ fontSize: "0.75rem", color: "#9999b0" }}>
              <span style={{ fontWeight: 500 }}>AI Analysis Complete</span>
              <span>Review & Refine</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: 4, background: "rgba(99,102,241,0.12)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)", width: "100%" }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>

        {/* Title card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassCard className="p-8 md:p-10 mb-0">
            <div className="flex items-center gap-3 mb-2">
              <motion.span
                style={{ fontSize: "1.5rem" }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                ✨
              </motion.span>
              <h2
                style={{
                  fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
                  fontWeight: 700,
                  color: "#0a0a14",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.25,
                }}
              >
                Here's what we found
              </h2>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#9999b0", marginBottom: 0 }}>
              Review the analysis below. Click edit to refine any section before proceeding.
            </p>
          </GlassCard>
        </motion.div>

        {/* Sections */}
        <div className="flex flex-col gap-4 mt-4">
          {sections.map((section, i) => {
            const isEditing = editingSection === section.key;
            const content =
              section.key === "mainIdea" ? data.mainIdea : data[section.key as "features" | "constraints"];

            return (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlassCard className="p-6">
                  {/* Section header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{
                          background: `${section.color}14`,
                          fontSize: "1rem",
                        }}
                      >
                        {section.icon}
                      </div>
                      <h3
                        style={{
                          fontSize: "1rem",
                          fontWeight: 650,
                          color: "#0a0a14",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {section.title}
                      </h3>
                    </div>

                    {!isEditing && (
                      <motion.button
                        onClick={() => startEdit(section.key)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer"
                        style={{
                          background: `${section.color}0d`,
                          border: `1px solid ${section.color}25`,
                          color: section.color,
                          fontSize: "0.78rem",
                          fontWeight: 600,
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          <path d="m15 5 4 4" />
                        </svg>
                        Edit
                      </motion.button>
                    )}
                  </div>

                  {/* Content */}
                  <AnimatePresence mode="wait">
                    {isEditing ? (
                      <motion.div
                        key="edit"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <textarea
                          value={editBuffer}
                          onChange={(e) => setEditBuffer(e.target.value)}
                          rows={section.key === "mainIdea" ? 4 : 6}
                          className="w-full rounded-xl p-4 mb-3 resize-none"
                          style={{
                            background: "rgba(255,255,255,0.8)",
                            border: `1.5px solid ${section.color}40`,
                            outline: "none",
                            fontSize: "0.85rem",
                            lineHeight: 1.7,
                            color: "#0a0a14",
                            fontFamily: "inherit",
                          }}
                          autoFocus
                        />
                        {section.key !== "mainIdea" && (
                          <p style={{ fontSize: "0.72rem", color: "#9999b0", marginBottom: 8 }}>
                            One item per line
                          </p>
                        )}
                        <div className="flex gap-2 justify-end">
                          <motion.button
                            onClick={cancelEdit}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-4 py-2 rounded-xl cursor-pointer"
                            style={{
                              background: "rgba(0,0,0,0.04)",
                              border: "1px solid rgba(0,0,0,0.08)",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              color: "#6b6b82",
                            }}
                          >
                            Cancel
                          </motion.button>
                          <motion.button
                            onClick={saveEdit}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-4 py-2 rounded-xl cursor-pointer"
                            style={{
                              background: section.color,
                              border: "none",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              color: "#fff",
                              boxShadow: `0 4px 12px ${section.color}35`,
                            }}
                          >
                            Save
                          </motion.button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {section.key === "mainIdea" ? (
                          <p
                            style={{
                              fontSize: "0.88rem",
                              color: "#3a3a52",
                              lineHeight: 1.75,
                              margin: 0,
                            }}
                          >
                            {data.mainIdea}
                          </p>
                        ) : (
                          <ul className="flex flex-col gap-2" style={{ margin: 0, padding: 0, listStyle: "none" }}>
                            {(content as string[]).map((item, j) => (
                              <motion.li
                                key={j}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: j * 0.05 }}
                                className="flex items-start gap-2.5"
                                style={{ fontSize: "0.85rem", color: "#3a3a52", lineHeight: 1.6 }}
                              >
                                <span
                                  className="mt-1.5 flex-shrink-0 rounded-full"
                                  style={{
                                    width: 6,
                                    height: 6,
                                    background: section.color,
                                    opacity: 0.6,
                                    display: "inline-block",
                                  }}
                                />
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 flex justify-end"
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
            Looks Good, Continue →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
