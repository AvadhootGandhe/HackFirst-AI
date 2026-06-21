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
    { key: "mainIdea", title: "Main Idea", icon: "💡", color: "#007AFF" },
    { key: "features", title: "Key Features", icon: "⚙️", color: "#34C759" },
    { key: "constraints", title: "Constraints", icon: "⚠️", color: "#FF7A00" },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: "#FFFFFF" }}
    >
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
              background: "#F5F5F5",
              border: "1px solid #E5E7EB",
              color: "#6B7280",
              fontSize: "1.1rem",
            }}
          >
            ←
          </motion.button>
          <div className="flex-1">
            <div className="flex justify-between mb-2" style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>
              <span style={{ fontWeight: 500 }}>AI Analysis Complete</span>
              <span>Review & Refine</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: 3, background: "#F0F0F0" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "#007AFF", width: "100%" }}
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
              <span style={{ fontSize: "1.5rem" }}>✨</span>
              <h2
                style={{
                  fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
                  fontWeight: 600,
                  color: "#111111",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.25,
                }}
              >
                Here's what we found
              </h2>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#9CA3AF", marginBottom: 0 }}>
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
                        className="w-8 h-8 rounded-[10px] flex items-center justify-center"
                        style={{
                          background: "#F5F5F5",
                          fontSize: "1rem",
                        }}
                      >
                        {section.icon}
                      </div>
                      <h3
                        style={{
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "#111111",
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
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer"
                        style={{
                          background: "transparent",
                          border: "1px solid #E5E7EB",
                          color: "#007AFF",
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
                          className="w-full rounded-[12px] p-4 mb-3 resize-none"
                          style={{
                            background: "#FAFAFA",
                            border: "1.5px solid #007AFF",
                            outline: "none",
                            fontSize: "0.85rem",
                            lineHeight: 1.7,
                            color: "#111111",
                            fontFamily: "inherit",
                          }}
                          autoFocus
                        />
                        {section.key !== "mainIdea" && (
                          <p style={{ fontSize: "0.72rem", color: "#9CA3AF", marginBottom: 8 }}>
                            One item per line
                          </p>
                        )}
                        <div className="flex gap-2 justify-end">
                          <motion.button
                            onClick={cancelEdit}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-4 py-2 rounded-[10px] cursor-pointer"
                            style={{
                              background: "#F5F5F5",
                              border: "1px solid #E5E7EB",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              color: "#6B7280",
                            }}
                          >
                            Cancel
                          </motion.button>
                          <motion.button
                            onClick={saveEdit}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-4 py-2 rounded-[10px] cursor-pointer"
                            style={{
                              background: "#111111",
                              border: "none",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              color: "#fff",
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
                              color: "#374151",
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
                                style={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.6 }}
                              >
                                <span
                                  className="mt-1.5 flex-shrink-0 rounded-full"
                                  style={{
                                    width: 6,
                                    height: 6,
                                    background: "#D1D5DB",
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
            Looks Good, Continue →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
