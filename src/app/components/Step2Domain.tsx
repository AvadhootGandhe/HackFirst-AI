import { motion } from "motion/react";
import { StepLayout } from "./StepLayout";

const domains = [
  { label: "AI / ML", icon: "🤖", color: "#6366f1" },
  { label: "Healthcare", icon: "🏥", color: "#10b981" },
  { label: "FinTech", icon: "💳", color: "#f59e0b" },
  { label: "EdTech", icon: "📚", color: "#3b82f6" },
  { label: "Sustainability", icon: "🌱", color: "#22c55e" },
  { label: "Cybersecurity", icon: "🔐", color: "#ef4444" },
  { label: "Robotics", icon: "🦾", color: "#8b5cf6" },
  { label: "IoT", icon: "📡", color: "#06b6d4" },
  { label: "Agriculture", icon: "🌾", color: "#84cc16" },
  { label: "Open Innovation", icon: "💡", color: "#f97316" },
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
              className="relative p-4 rounded-2xl text-left cursor-pointer overflow-hidden"
              style={{
                background: isSelected ? `${d.color}14` : "rgba(255,255,255,0.65)",
                border: isSelected ? `1.5px solid ${d.color}50` : "1.5px solid rgba(0,0,0,0.07)",
                boxShadow: isSelected ? `0 4px 20px ${d.color}18` : "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              {isSelected && (
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ background: `radial-gradient(circle at 50% 50%, ${d.color}10, transparent 70%)` }}
                />
              )}
              <div className="relative z-10">
                <div style={{ fontSize: "1.6rem", marginBottom: 6 }}>{d.icon}</div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: isSelected ? d.color : "#0a0a14",
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
                  style={{ background: d.color, fontSize: "0.6rem", color: "#fff" }}
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
          style={{ color: "#9999b0" }}
        >
          {selected.length} domain{selected.length > 1 ? "s" : ""} selected
        </motion.p>
      )}
    </StepLayout>
  );
}
