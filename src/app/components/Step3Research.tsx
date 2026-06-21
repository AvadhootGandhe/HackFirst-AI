import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { StepLayout } from "./StepLayout";

const researchTypes = [
  {
    id: "quantitative",
    label: "Quantitative Research",
    desc: "Numerical data, statistics & measurable metrics",
    icon: "📊",
    placeholder: "e.g. What percentage of teachers don't use AI tools in classrooms?\nHow many students prefer AI-assisted learning over traditional methods?\nWhat is the average time saved using automated research tools?",
    inputLabel: "What numerical or statistical questions do you want answered?",
  },
  {
    id: "qualitative",
    label: "Qualitative Research",
    desc: "Reasons, opinions, motivations & behavioral insights",
    icon: "💬",
    placeholder: "e.g. Why do teachers avoid using AI in their workflow?\nWhat are the main concerns students have about AI-generated content?\nHow do researchers feel about automated literature reviews?",
    inputLabel: "What questions about reasons, opinions or experiences do you want explored?",
  },
];

interface Props {
  selected: string[];
  onChange: (v: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step3Research({ selected, onChange, onNext, onBack }: Props) {
  const [questions, setQuestions] = useState<Record<string, string>>({
    quantitative: "",
    qualitative: "",
  });

  const toggle = (id: string) => {
    onChange(
      selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]
    );
  };

  const updateQuestion = (id: string, value: string) => {
    setQuestions((prev) => ({ ...prev, [id]: value }));
  };

  const canProceed =
    selected.length > 0 &&
    selected.every((id) => questions[id]?.trim().length > 0);

  return (
    <StepLayout
      stepNumber={3}
      totalSteps={6}
      question="What type of research would you like?"
      onNext={onNext}
      onBack={onBack}
      nextDisabled={!canProceed}
    >
      <div className="flex flex-col gap-4">
        {researchTypes.map((r, i) => {
          const isSelected = selected.includes(r.id);
          return (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Toggle button */}
              <motion.button
                onClick={() => toggle(r.id)}
                whileHover={{ scale: 1.01, x: 3 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center gap-4 p-5 text-left cursor-pointer"
                style={{
                  background: isSelected ? "rgba(0,122,255,0.03)" : "#FAFAFA",
                  border: isSelected ? "1.5px solid #007AFF" : "1.5px solid #E5E7EB",
                  borderRadius: isSelected ? "1rem 1rem 0 0" : "1rem",
                  boxShadow: isSelected ? "0 2px 8px rgba(0,122,255,0.06)" : "none",
                  transition: "border-radius 0.3s",
                }}
              >
                {/* Checkbox */}
                <motion.div
                  animate={{
                    background: isSelected ? "#007AFF" : "transparent",
                    borderColor: isSelected ? "#007AFF" : "#D1D5DB",
                  }}
                  className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center"
                  style={{ border: "2px solid", transition: "all 0.2s" }}
                >
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 600,
                        damping: 25,
                      }}
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
                      color: isSelected ? "#007AFF" : "#111111",
                      letterSpacing: "-0.01em",
                      marginBottom: 2,
                    }}
                  >
                    {r.label}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#9CA3AF" }}>
                    {r.desc}
                  </div>
                </div>
              </motion.button>

              {/* Textarea — expands when selected */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      className="p-5 pt-4"
                      style={{
                        background: "rgba(0,122,255,0.02)",
                        border: "1.5px solid #007AFF",
                        borderTop: "none",
                        borderRadius: "0 0 1rem 1rem",
                      }}
                    >
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          color: "#007AFF",
                          marginBottom: 8,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {r.inputLabel}
                      </label>
                      <textarea
                        value={questions[r.id]}
                        onChange={(e) => updateQuestion(r.id, e.target.value)}
                        placeholder={r.placeholder}
                        rows={4}
                        className="w-full rounded-xl p-4 resize-none"
                        style={{
                          background: "#FFFFFF",
                          border: "1px solid #E5E7EB",
                          outline: "none",
                          fontSize: "0.84rem",
                          lineHeight: 1.7,
                          color: "#111111",
                          fontFamily: "inherit",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#007AFF";
                          e.target.style.boxShadow = "0 0 0 3px rgba(0,122,255,0.08)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#E5E7EB";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                      <p
                        style={{
                          fontSize: "0.7rem",
                          color: "#9CA3AF",
                          marginTop: 6,
                          marginBottom: 0,
                        }}
                      >
                        Write one question per line for best results
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
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
          {selected.length} research type{selected.length > 1 ? "s" : ""} selected
          {!canProceed && (
            <span style={{ color: "#FF7A00", marginLeft: 8 }}>
              — add questions to continue
            </span>
          )}
        </motion.p>
      )}
    </StepLayout>
  );
}
