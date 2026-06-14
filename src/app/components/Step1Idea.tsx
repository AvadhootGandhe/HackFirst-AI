import { motion } from "motion/react";
import { useState, useRef } from "react";
import { Wand2 } from "lucide-react";
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
        <motion.textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Describe your hackathon idea..."
          rows={6}
          className="w-full rounded-[12px] resize-none outline-none transition-all duration-300"
          style={{
            padding: "1.25rem 1.4rem",
            background: "#FAFAFA",
            border: focused ? "1.5px solid #007AFF" : "1.5px solid #E5E7EB",
            fontSize: "1rem",
            color: "#111111",
            lineHeight: 1.65,
            boxShadow: focused ? "0 0 0 3px rgba(0,122,255,0.1)" : "none",
          }}
          animate={{ scale: focused ? 1.002 : 1 }}
          transition={{ duration: 0.2 }}
        />

        {/* Char count */}
        <div
          className="absolute bottom-3 right-4"
          style={{ fontSize: "0.75rem", color: "#9CA3AF" }}
        >
          {value.length} chars
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="mt-5">
        <div className="flex items-center gap-2 mb-3" style={{ fontSize: "0.8rem", color: "#9CA3AF", fontWeight: 500 }}>
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
              className="px-3 py-1.5 rounded-full cursor-pointer text-left"
              style={{
                background: value === s ? "#111111" : "#F5F5F5",
                border: value === s ? "1px solid #111111" : "1px solid #E5E7EB",
                fontSize: "0.78rem",
                color: value === s ? "#FFFFFF" : "#6B7280",
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
