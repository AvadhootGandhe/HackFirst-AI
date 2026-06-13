import { motion } from "motion/react";
import { useState, useRef } from "react";
import { Sparkles, Wand2 } from "lucide-react";
import { StepLayout } from "./StepLayout";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const suggestions = [
  "AI-powered mental health companion for Gen Z",
  "Decentralized carbon credit marketplace",
  "Smart agricultural irrigation using IoT sensors",
  "Blockchain-based academic credential verification",
];

export function Step1Idea({ value, onChange, onNext, onBack }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);

  return (
    <StepLayout
      stepNumber={1}
      totalSteps={6}
      question="What is your idea?"
      onNext={onNext}
      onBack={onBack}
      nextDisabled={value.trim().length < 10}
    >
      {/* Textarea */}
      <div className="relative">
        {/* Sparkle animations */}
        {focused && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{
                  left: `${15 + i * 18}%`,
                  top: "-10px",
                  color: "#6366f1",
                }}
                initial={{ opacity: 0, y: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], y: -20, scale: [0, 1, 0] }}
                transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity, repeatDelay: 2 }}
              >
                ✦
              </motion.div>
            ))}
          </>
        )}

        <motion.textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Describe your hackathon idea..."
          rows={6}
          className="w-full rounded-2xl resize-none outline-none transition-all duration-300"
          style={{
            padding: "1.25rem 1.4rem",
            background: "rgba(248,248,252,0.8)",
            border: focused ? "1.5px solid rgba(99,102,241,0.5)" : "1.5px solid rgba(0,0,0,0.07)",
            fontSize: "1rem",
            color: "#0a0a14",
            lineHeight: 1.65,
            boxShadow: focused ? "0 0 0 4px rgba(99,102,241,0.08), 0 2px 12px rgba(99,102,241,0.1)" : "0 2px 8px rgba(0,0,0,0.04)",
          }}
          animate={{ scale: focused ? 1.005 : 1 }}
          transition={{ duration: 0.2 }}
        />

        {/* Char count */}
        <div
          className="absolute bottom-3 right-4"
          style={{ fontSize: "0.75rem", color: "#9999b0" }}
        >
          {value.length} chars
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="mt-5">
        <div className="flex items-center gap-2 mb-3" style={{ fontSize: "0.8rem", color: "#9999b0", fontWeight: 500 }}>
          <Wand2 size={13} />
          <span>Try one of these ideas</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s, i) => (
            <motion.button
              key={i}
              onClick={() => onChange(s)}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="px-3 py-1.5 rounded-xl cursor-pointer text-left"
              style={{
                background: value === s ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.7)",
                border: value === s ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(0,0,0,0.07)",
                fontSize: "0.78rem",
                color: value === s ? "#6366f1" : "#6b6b82",
                fontWeight: value === s ? 500 : 400,
              }}
            >
              {s}
            </motion.button>
          ))}
        </div>
      </div>
    </StepLayout>
  );
}
