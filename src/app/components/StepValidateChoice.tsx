import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";

interface Props {
  onValidate: () => void;
  onSkip: () => void;
  onBack: () => void;
}

export function StepValidateChoice({ onValidate, onSkip, onBack }: Props) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: "#FFFFFF" }}
    >
      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
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
              <span style={{ fontWeight: 500 }}>Next Step</span>
              <span>Choose your path</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: 3, background: "#F0F0F0" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "#007AFF" }}
                initial={{ width: 0 }}
                animate={{ width: "42%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassCard className="p-8 md:p-10 mb-6">
            <h2
              style={{
                fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
                fontWeight: 600,
                color: "#111111",
                letterSpacing: "-0.025em",
                lineHeight: 1.25,
                marginBottom: 6,
              }}
            >
              Want to validate your idea?
            </h2>
            <p style={{ fontSize: "0.88rem", color: "#9CA3AF", margin: 0, lineHeight: 1.6 }}>
              Run a quick AI validation to score feasibility, uniqueness, and market potential — or skip straight to research.
            </p>
          </GlassCard>
        </motion.div>

        {/* Two option cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Validate option */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button
              onClick={onValidate}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="w-full text-left cursor-pointer rounded-[20px] p-6 relative overflow-hidden"
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #007AFF",
                boxShadow: "0 2px 8px rgba(0,122,255,0.06)",
              }}
            >
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-4"
                  style={{
                    background: "#F0F7FF",
                    fontSize: "1.3rem",
                  }}
                >
                  🛡️
                </div>

                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "#111111",
                    letterSpacing: "-0.015em",
                    marginBottom: 6,
                  }}
                >
                  Validate Idea
                </h3>
                <p style={{ fontSize: "0.8rem", color: "#6B7280", lineHeight: 1.55, margin: 0 }}>
                  AI scores your idea on feasibility, uniqueness & market fit before you dive into research.
                </p>

                {/* Recommended badge */}
                <div
                  className="inline-flex items-center gap-1 mt-4 px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(0,122,255,0.08)",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    color: "#007AFF",
                    letterSpacing: "0.02em",
                  }}
                >
                  <span>✦</span> Recommended
                </div>
              </div>
            </motion.button>
          </motion.div>

          {/* Skip option */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button
              onClick={onSkip}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="w-full text-left cursor-pointer rounded-[20px] p-6 relative overflow-hidden"
              style={{
                background: "#FAFAFA",
                border: "1.5px solid #E5E7EB",
              }}
            >
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-4"
                  style={{
                    background: "#F5F5F5",
                    fontSize: "1.3rem",
                  }}
                >
                  ⏩
                </div>

                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "#111111",
                    letterSpacing: "-0.015em",
                    marginBottom: 6,
                  }}
                >
                  Skip to Research
                </h3>
                <p style={{ fontSize: "0.8rem", color: "#6B7280", lineHeight: 1.55, margin: 0 }}>
                  Already confident? Jump straight into deep research and competitive analysis.
                </p>

                <div
                  className="inline-flex items-center gap-1 mt-4 px-2.5 py-1 rounded-full"
                  style={{
                    background: "#F5F5F5",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    color: "#9CA3AF",
                    letterSpacing: "0.02em",
                  }}
                >
                  Save time
                </div>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
