import { motion } from "motion/react";
import { StepLayout } from "./StepLayout";
import { Shield, FileText, Bot } from "lucide-react";

const terms = [
  { id: "tos", label: "I agree to the Terms and Conditions", icon: FileText, color: "#007AFF" },
  { id: "privacy", label: "I agree to Privacy Policy", icon: Shield, color: "#34C759" },
  { id: "ai", label: "I agree to AI Generated Content Policy", icon: Bot, color: "#AF52DE" },
];

interface Props {
  agreed: Record<string, boolean>;
  onChange: (v: Record<string, boolean>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step6Terms({ agreed, onChange, onNext, onBack }: Props) {
  const toggle = (id: string) => onChange({ ...agreed, [id]: !agreed[id] });
  const allAgreed = terms.every((t) => agreed[t.id]);

  return (
    <StepLayout
      stepNumber={6}
      totalSteps={6}
      question="Before we launch..."
      onNext={onNext}
      onBack={onBack}
      nextLabel="Launch My Research Workspace"
      nextDisabled={!allAgreed}
    >
      <p style={{ fontSize: "0.9rem", color: "#9CA3AF", marginBottom: "1.5rem", lineHeight: 1.6 }}>
        Please review and agree to our policies to get the full HackFirst AI experience.
      </p>

      <div className="flex flex-col gap-3">
        {terms.map((t, i) => {
          const isChecked = agreed[t.id] || false;
          const Icon = t.icon;
          return (
            <motion.button
              key={t.id}
              onClick={() => toggle(t.id)}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 p-4 rounded-[16px] text-left cursor-pointer"
              style={{
                background: isChecked ? "rgba(0,122,255,0.03)" : "#FAFAFA",
                border: isChecked ? "1.5px solid #007AFF" : "1.5px solid #E5E7EB",
              }}
            >
              <div
                className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0"
                style={{ background: "#F5F5F5" }}
              >
                <Icon size={18} style={{ color: t.color }} />
              </div>
              <span style={{ flex: 1, fontSize: "0.9rem", fontWeight: 500, color: isChecked ? "#111111" : "#6B7280", letterSpacing: "-0.01em" }}>
                {t.label}
              </span>
              <motion.div
                animate={{
                  background: isChecked ? "#007AFF" : "transparent",
                  borderColor: isChecked ? "#007AFF" : "#D1D5DB",
                }}
                className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center"
                style={{ border: "2px solid", transition: "all 0.2s" }}
              >
                {isChecked && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 600, damping: 25 }}
                    style={{ color: "#fff", fontSize: "0.6rem" }}
                  >
                    ✓
                  </motion.span>
                )}
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      {allAgreed && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center gap-2 px-4 py-3 rounded-[12px]"
          style={{ background: "rgba(52,199,89,0.06)", border: "1px solid rgba(52,199,89,0.2)" }}
        >
          <span style={{ fontSize: "1rem" }}>🚀</span>
          <span style={{ fontSize: "0.82rem", color: "#34C759", fontWeight: 500 }}>
            Everything's ready! Click below to launch your workspace.
          </span>
        </motion.div>
      )}
    </StepLayout>
  );
}
