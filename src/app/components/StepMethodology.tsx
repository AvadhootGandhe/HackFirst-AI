import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { GlassCard } from "./GlassCard";

const dummyMethodology = `**Phase 1 — Discovery & Ideation (2 hours)**
• Conduct rapid user interviews and competitive analysis
• Define core problem statement and target user personas
• Brainstorm solution approaches using design thinking frameworks

**Phase 2 — Validation & Architecture (3 hours)**
• Validate top 2–3 approaches against feasibility matrix
• Design system architecture and data flow diagrams
• Define API contracts and component structure

**Phase 3 — MVP Development (12 hours)**
• Implement core features using sprint-based micro-cycles
• Build frontend UI with component-driven development
• Integrate backend services and AI/ML pipelines

**Phase 4 — Testing & Polish (4 hours)**
• Run integration tests and edge-case scenarios
• Polish UI/UX with micro-interactions and responsive design
• Performance optimization and accessibility checks

**Phase 5 — Presentation & Demo (3 hours)**
• Prepare pitch deck with problem-solution narrative
• Record demo video and prepare live walkthrough
• Rehearse Q&A and judge interaction scenarios`;

interface Props {
  methodology: string;
  onChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepMethodology({ methodology, onChange, onNext, onBack }: Props) {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiGenerated, setAiGenerated] = useState(false);

  const handleGenerate = () => {
    setAiLoading(true);
    setTimeout(() => {
      onChange(dummyMethodology);
      setAiLoading(false);
      setAiGenerated(true);
    }, 2000);
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
              <span style={{ fontWeight: 500 }}>Methodology</span>
              <span>Define your approach</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: 4, background: "rgba(99,102,241,0.12)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
                initial={{ width: 0 }}
                animate={{ width: "62%" }}
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
              What's your methodology?
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#9999b0", marginBottom: 28 }}>
              Describe your approach and development plan, or let AI generate one for you.
            </p>

            {/* Text area */}
            <div className="relative">
              <textarea
                value={methodology}
                onChange={(e) => { onChange(e.target.value); setAiGenerated(false); }}
                placeholder="Describe your hackathon methodology, development phases, timeline, and approach…"
                rows={10}
                className="w-full rounded-2xl p-5 resize-none"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  border: aiGenerated ? "1.5px solid rgba(99,102,241,0.3)" : "1.5px solid rgba(0,0,0,0.08)",
                  outline: "none",
                  fontSize: "0.85rem",
                  lineHeight: 1.75,
                  color: "#0a0a14",
                  fontFamily: "inherit",
                  transition: "border-color 0.3s",
                }}
              />
              {aiGenerated && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-3 right-3 px-2 py-0.5 rounded-full flex items-center gap-1"
                  style={{ background: "rgba(99,102,241,0.1)", fontSize: "0.65rem", fontWeight: 600, color: "#6366f1" }}
                >
                  <span>✨</span> AI Generated
                </motion.div>
              )}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1" style={{ height: 1, background: "rgba(0,0,0,0.07)" }} />
              <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#9999b0", textTransform: "uppercase", letterSpacing: "0.05em" }}>or</span>
              <div className="flex-1" style={{ height: 1, background: "rgba(0,0,0,0.07)" }} />
            </div>

            {/* Generate with AI button */}
            <motion.button
              onClick={handleGenerate}
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
              <AnimatePresence mode="wait">
                {aiLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{ display: "inline-block" }}
                    >
                      ⚙️
                    </motion.span>
                    Generating methodology…
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span>🤖</span> Generate with AI
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Continue */}
            <motion.div className="mt-8 flex justify-end">
              <motion.button
                onClick={onNext}
                disabled={!methodology.trim()}
                whileHover={!methodology.trim() ? {} : { scale: 1.03, y: -1 }}
                whileTap={!methodology.trim() ? {} : { scale: 0.97 }}
                className="px-7 py-3 rounded-2xl cursor-pointer"
                style={{
                  background: !methodology.trim()
                    ? "rgba(99,102,241,0.3)"
                    : "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
                  color: "#fff",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  border: "none",
                  boxShadow: !methodology.trim() ? "none" : "0 4px 20px rgba(99,102,241,0.35)",
                  cursor: !methodology.trim() ? "not-allowed" : "pointer",
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
