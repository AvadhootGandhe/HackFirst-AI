import { motion } from "motion/react";
import { ReactNode } from "react";
import { GlassCard } from "./GlassCard";

interface StepLayoutProps {
  stepNumber: number;
  totalSteps: number;
  question: string;
  children: ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}

export function StepLayout({
  stepNumber,
  totalSteps,
  question,
  children,
  onNext,
  onBack,
  nextLabel = "Continue",
  nextDisabled = false,
}: StepLayoutProps) {
  const progress = (stepNumber / totalSteps) * 100;

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
        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-4"
        >
          {onBack && (
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
          )}
          <div className="flex-1">
            <div className="flex justify-between mb-1.5" style={{ fontSize: "0.75rem", color: "#9999b0" }}>
              <span style={{ fontWeight: 500 }}>Let's Get Started</span>
              <span>{stepNumber} of {totalSteps}</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: 4, background: "rgba(99,102,241,0.12)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>

        {/* Question */}
        <motion.div
          key={stepNumber}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassCard className="p-8 md:p-10">
            <h2
              className="mb-7"
              style={{
                fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                fontWeight: 650,
                color: "#0a0a14",
                letterSpacing: "-0.025em",
                lineHeight: 1.25,
              }}
            >
              {question}
            </h2>

            {children}

            {onNext && (
              <motion.div className="mt-8 flex justify-end">
                <motion.button
                  onClick={onNext}
                  disabled={nextDisabled}
                  whileHover={nextDisabled ? {} : { scale: 1.03, y: -1 }}
                  whileTap={nextDisabled ? {} : { scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="px-7 py-3 rounded-2xl cursor-pointer"
                  style={{
                    background: nextDisabled
                      ? "rgba(99,102,241,0.3)"
                      : "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
                    color: "#ffffff",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    border: "none",
                    letterSpacing: "-0.01em",
                    boxShadow: nextDisabled ? "none" : "0 4px 20px rgba(99,102,241,0.35)",
                    cursor: nextDisabled ? "not-allowed" : "pointer",
                  }}
                >
                  {nextLabel} →
                </motion.button>
              </motion.div>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
