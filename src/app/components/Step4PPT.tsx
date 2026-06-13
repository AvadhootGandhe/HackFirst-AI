import { motion } from "motion/react";
import { StepLayout } from "./StepLayout";

const pptSections = [
  "Problem Statement", "Objective", "Research Gap", "Market Analysis",
  "Existing Solutions", "Proposed Solution", "Innovation", "Technical Architecture",
  "Technology Stack", "Business Model", "Revenue Model", "Competitor Analysis",
  "User Journey", "Impact", "Scalability", "Future Scope",
  "Validation Results", "Implementation Plan", "Team Structure", "Budget",
  "Timeline", "Risks & Mitigation", "Conclusion", "Q&A",
];

interface Props {
  selected: string[];
  onChange: (v: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step4PPT({ selected, onChange, onNext, onBack }: Props) {
  const allSelected = selected.length === pptSections.length;

  const toggle = (s: string) => {
    onChange(selected.includes(s) ? selected.filter((x) => x !== s) : [...selected, s]);
  };

  const toggleAll = () => {
    onChange(allSelected ? [] : [...pptSections]);
  };

  return (
    <StepLayout
      stepNumber={4}
      totalSteps={6}
      question="What sections should be in your presentation?"
      onNext={onNext}
      onBack={onBack}
      nextDisabled={selected.length === 0}
    >
      {/* Select All */}
      <div className="flex items-center justify-between mb-4">
        <span style={{ fontSize: "0.82rem", color: "#9999b0" }}>
          {selected.length} of {pptSections.length} selected
        </span>
        <motion.button
          onClick={toggleAll}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-3 py-1.5 rounded-xl cursor-pointer"
          style={{
            background: allSelected ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.7)",
            border: "1px solid rgba(99,102,241,0.2)",
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "#6366f1",
          }}
        >
          {allSelected ? "Deselect All" : "Select All"}
        </motion.button>
      </div>

      <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
        {pptSections.map((s, i) => {
          const isSelected = selected.includes(s);
          return (
            <motion.button
              key={s}
              onClick={() => toggle(s)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 p-3 rounded-xl text-left cursor-pointer"
              style={{
                background: isSelected ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.55)",
                border: isSelected ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgba(0,0,0,0.07)",
              }}
            >
              <motion.div
                animate={{
                  background: isSelected ? "#6366f1" : "transparent",
                  borderColor: isSelected ? "#6366f1" : "rgba(0,0,0,0.18)",
                }}
                className="w-4 h-4 rounded-md flex-shrink-0 flex items-center justify-center"
                style={{ border: "1.5px solid", transition: "all 0.15s" }}
              >
                {isSelected && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 700, damping: 25 }}
                    style={{ color: "#fff", fontSize: "0.55rem" }}
                  >
                    ✓
                  </motion.span>
                )}
              </motion.div>
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? "#6366f1" : "#0a0a14",
                  letterSpacing: "-0.005em",
                }}
              >
                {s}
              </span>
            </motion.button>
          );
        })}
      </div>
    </StepLayout>
  );
}
