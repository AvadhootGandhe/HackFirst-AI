import { motion } from "motion/react";
import { StepLayout } from "./StepLayout";

const researchTypes = [
  {
    id: "quantitative",
    label: "Quantitative Research",
    desc: "Numerical data, statistics, measurable insights",
    icon: "📊",
  },
  {
    id: "qualitative",
    label: "Qualitative Research",
    desc: "Interviews, observations, behavioral patterns",
    icon: "💬",
  },
  {
    id: "validation",
    label: "Validation Research",
    desc: "Hypothesis testing, prototype feedback, market fit",
    icon: "✅",
  },
];

interface Props {
  selected: string[];
  onChange: (v: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step3Research({ selected, onChange, onNext, onBack }: Props) {
  const toggle = (id: string) => {
    onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  };

  return (
    <StepLayout
      stepNumber={3}
      totalSteps={6}
      question="What type of research would you like?"
      onNext={onNext}
      onBack={onBack}
      nextDisabled={selected.length === 0}
    >
      <div className="flex flex-col gap-3">
        {researchTypes.map((r, i) => {
          const isSelected = selected.includes(r.id);
          return (
            <motion.button
              key={r.id}
              onClick={() => toggle(r.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 p-5 rounded-2xl text-left cursor-pointer"
              style={{
                background: isSelected ? "rgba(99,102,241,0.07)" : "rgba(255,255,255,0.6)",
                border: isSelected ? "1.5px solid rgba(99,102,241,0.4)" : "1.5px solid rgba(0,0,0,0.07)",
                boxShadow: isSelected ? "0 4px 20px rgba(99,102,241,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              {/* Custom checkbox */}
              <motion.div
                animate={{
                  background: isSelected ? "#6366f1" : "transparent",
                  borderColor: isSelected ? "#6366f1" : "rgba(0,0,0,0.2)",
                }}
                className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center"
                style={{ border: "2px solid", transition: "all 0.2s" }}
              >
                {isSelected && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 600, damping: 25 }}
                    style={{ color: "#fff", fontSize: "0.65rem" }}
                  >
                    ✓
                  </motion.span>
                )}
              </motion.div>

              <div style={{ fontSize: "1.4rem" }}>{r.icon}</div>

              <div className="flex-1">
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: isSelected ? "#6366f1" : "#0a0a14",
                    letterSpacing: "-0.01em",
                    marginBottom: 2,
                  }}
                >
                  {r.label}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#9999b0" }}>{r.desc}</div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </StepLayout>
  );
}
