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
      style={{ background: "#FFFFFF" }}
    >
      <div className="relative z-10 w-full max-w-2xl">
        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex items-center gap-4"
        >
          {onBack && (
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
          )}
          <div className="flex-1">
            <div className="flex justify-between mb-2" style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>
              <span style={{ fontWeight: 500 }}>Step {stepNumber}</span>
              <span>{stepNumber} of {totalSteps}</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: 3, background: "#F0F0F0" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "#007AFF" }}
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
                fontWeight: 600,
                color: "#111111",
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
                  whileHover={nextDisabled ? {} : { scale: 1.02 }}
                  whileTap={nextDisabled ? {} : { scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="px-7 py-3 rounded-[12px] cursor-pointer"
                  style={{
                    background: nextDisabled
                      ? "#E5E7EB"
                      : "#111111",
                    color: nextDisabled ? "#9CA3AF" : "#FFFFFF",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    border: "none",
                    letterSpacing: "-0.01em",
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
