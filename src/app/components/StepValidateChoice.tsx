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
      style={{ background: "linear-gradient(135deg, #f8f8fc 0%, #eeeef8 50%, #f4f0ff 100%)" }}
    >
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{ width: 500, height: 500, top: "-10%", right: "-5%", background: "rgba(139,92,246,0.06)", filter: "blur(80px)" }}
        />
        <div
          className="absolute rounded-full"
          style={{ width: 400, height: 400, bottom: "-5%", left: "-5%", background: "rgba(99,102,241,0.07)", filter: "blur(80px)" }}
        />
      </div>

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
              <span style={{ fontWeight: 500 }}>Next Step</span>
              <span>Choose your path</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: 4, background: "rgba(99,102,241,0.12)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
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
                fontWeight: 700,
                color: "#0a0a14",
                letterSpacing: "-0.025em",
                lineHeight: 1.25,
                marginBottom: 6,
              }}
            >
              Want to validate your idea?
            </h2>
            <p style={{ fontSize: "0.88rem", color: "#9999b0", margin: 0, lineHeight: 1.6 }}>
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
              className="w-full text-left cursor-pointer rounded-3xl p-6 relative overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.12) 100%)",
                border: "1.5px solid rgba(99,102,241,0.25)",
                boxShadow: "0 4px 24px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              {/* Glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 30% 20%, rgba(99,102,241,0.12), transparent 60%)",
                }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
                    boxShadow: "0 4px 16px rgba(99,102,241,0.35)",
                    fontSize: "1.3rem",
                  }}
                >
                  🛡️
                </div>

                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 680,
                    color: "#0a0a14",
                    letterSpacing: "-0.015em",
                    marginBottom: 6,
                  }}
                >
                  Validate Idea
                </h3>
                <p style={{ fontSize: "0.8rem", color: "#6b6b82", lineHeight: 1.55, margin: 0 }}>
                  AI scores your idea on feasibility, uniqueness & market fit before you dive into research.
                </p>

                {/* Recommended badge */}
                <div
                  className="inline-flex items-center gap-1 mt-4 px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(99,102,241,0.1)",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    color: "#6366f1",
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
              className="w-full text-left cursor-pointer rounded-3xl p-6 relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(24px)",
                border: "1.5px solid rgba(0,0,0,0.08)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
              }}
            >
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{
                    background: "rgba(0,0,0,0.04)",
                    border: "1px solid rgba(0,0,0,0.06)",
                    fontSize: "1.3rem",
                  }}
                >
                  ⏩
                </div>

                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 680,
                    color: "#0a0a14",
                    letterSpacing: "-0.015em",
                    marginBottom: 6,
                  }}
                >
                  Skip to Research
                </h3>
                <p style={{ fontSize: "0.8rem", color: "#6b6b82", lineHeight: 1.55, margin: 0 }}>
                  Already confident? Jump straight into deep research and competitive analysis.
                </p>

                <div
                  className="inline-flex items-center gap-1 mt-4 px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(0,0,0,0.04)",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    color: "#9999b0",
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
