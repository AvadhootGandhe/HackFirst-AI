import { motion } from "motion/react";
import { StepLayout } from "./StepLayout";

const domains = [
  { label: "AI / ML", icon: "🤖" },
  { label: "Healthcare", icon: "🏥" },
  { label: "FinTech", icon: "💳" },
  { label: "EdTech", icon: "📚" },
  { label: "Sustainability", icon: "🌱" },
  { label: "Cybersecurity", icon: "🔐" },
  { label: "Robotics", icon: "🦾" },
  { label: "IoT", icon: "📡" },
  { label: "Agriculture", icon: "🌾" },
  { label: "Open Innovation", icon: "💡" },
];

interface Props {
  selected: string[];
  onChange: (v: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2Domain({ selected, onChange, onNext, onBack }: Props) {
  const toggle = (label: string) => {
    onChange(selected.includes(label) ? selected.filter((x) => x !== label) : [...selected, label]);
  };

  return (
    <StepLayout
      stepNumber={2}
      totalSteps={6}
      question="Which domain does your idea belong to?"
      onNext={onNext}
      onBack={onBack}
      nextDisabled={selected.length === 0}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {domains.map((d, i) => {
          const isSelected = selected.includes(d.label);
          return (
            <motion.button
              key={d.label}
              onClick={() => toggle(d.label)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="relative p-4 rounded-[16px] text-left cursor-pointer overflow-hidden"
              style={{
                background: isSelected ? "rgba(0,122,255,0.04)" : "#FAFAFA",
                border: isSelected ? "1.5px solid #007AFF" : "1.5px solid #E5E7EB",
                boxShadow: isSelected ? "0 2px 8px rgba(0,122,255,0.08)" : "none",
              }}
            >
              <div className="relative z-10">
                <div style={{ fontSize: "1.6rem", marginBottom: 6 }}>{d.icon}</div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: isSelected ? "#007AFF" : "#111111",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {d.label}
                </div>
              </div>

              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: "#007AFF", fontSize: "0.6rem", color: "#fff" }}
                >
                  ✓
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-sm"
          style={{ color: "#9CA3AF" }}
        >
          {selected.length} domain{selected.length > 1 ? "s" : ""} selected
        </motion.p>
      )}
    </StepLayout>
  );
}
