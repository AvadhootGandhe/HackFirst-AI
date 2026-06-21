import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const phases = [
  { text: "Understanding your idea…", icon: "🧠", color: "#007AFF" },
  { text: "Analyzing market landscape…", icon: "📊", color: "#5856D6" },
  { text: "Identifying core features…", icon: "⚙️", color: "#AF52DE" },
  { text: "Evaluating constraints…", icon: "🔍", color: "#007AFF" },
  { text: "Refining strategy…", icon: "🎯", color: "#5856D6" },
  { text: "Generating insights…", icon: "✨", color: "#AF52DE" },
];

interface Props {
  onComplete: () => void;
}

export function StepAnalyzing({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [dots, setDots] = useState("");

  // Progress bar: 0 → 100 over 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Ease-in-out-ish: faster in middle, slower at start/end
        const increment = p < 20 ? 0.6 : p < 80 ? 1.2 : 0.5;
        return Math.min(p + increment, 100);
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Phase text rotation every ~1.6s
  useEffect(() => {
    const interval = setInterval(() => {
      setPhaseIndex((i) => (i + 1) % phases.length);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  // Dots animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Auto-advance when progress hits 100
  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(onComplete, 600);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  const currentPhase = phases[phaseIndex];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{
        background: "#FAFAFA",
        overflow: "hidden",
      }}
    >
      {/* Animated background orbs — kept, Apple-toned */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 200 + i * 80,
              height: 200 + i * 80,
              background: `radial-gradient(circle, ${
                ["rgba(0,122,255,0.06)", "rgba(88,86,214,0.05)", "rgba(175,82,222,0.04)"][i % 3]
              }, transparent 70%)`,
              filter: "blur(60px)",
            }}
            animate={{
              x: [0, 30 * Math.sin(i * 1.2), -20, 0],
              y: [0, -25 * Math.cos(i * 0.8), 15, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            initial={{
              top: `${10 + i * 14}%`,
              left: `${5 + i * 16}%`,
            }}
          />
        ))}
      </div>

      {/* Particle grid — kept, Apple-toned */}
      <div className="fixed inset-0 pointer-events-none" style={{ opacity: 0.3 }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`p-${i}`}
            className="absolute rounded-full"
            style={{
              width: 3,
              height: 3,
              background: "#007AFF",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full">
        {/* Orbital ring animation — KEPT, Apple colors */}
        <div className="relative" style={{ width: 160, height: 160, marginBottom: 48 }}>
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: "1.5px solid rgba(0,122,255,0.15)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 10,
                height: 10,
                background: "#007AFF",
                boxShadow: "0 0 16px rgba(0,122,255,0.4), 0 0 40px rgba(0,122,255,0.2)",
                top: -5,
                left: "50%",
                marginLeft: -5,
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>

          {/* Middle ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              inset: 20,
              border: "1px solid rgba(88,86,214,0.15)",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 7,
                height: 7,
                background: "#5856D6",
                boxShadow: "0 0 12px rgba(88,86,214,0.3)",
                bottom: -3.5,
                left: "50%",
                marginLeft: -3.5,
              }}
            />
          </motion.div>

          {/* Inner ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              inset: 40,
              border: "1px solid rgba(175,82,222,0.12)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 5,
                height: 5,
                background: "#AF52DE",
                boxShadow: "0 0 10px rgba(175,82,222,0.25)",
                top: -2.5,
                right: "50%",
                marginRight: -2.5,
              }}
            />
          </motion.div>

          {/* Center glow */}
          <motion.div
            className="absolute rounded-full flex items-center justify-center"
            style={{
              inset: 50,
              background: "radial-gradient(circle, rgba(0,122,255,0.12), rgba(0,122,255,0.02))",
            }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.span
              style={{ fontSize: "1.5rem" }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🧬
            </motion.span>
          </motion.div>
        </div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "1.6rem",
            fontWeight: 600,
            color: "#111111",
            letterSpacing: "-0.03em",
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          AI is analyzing your idea
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: "0.9rem",
            color: "#9CA3AF",
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          Sit tight — we're doing the heavy thinking for you
        </motion.p>

        {/* Rotating phase text */}
        <div style={{ height: 36, marginBottom: 32, overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={phaseIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2 justify-center"
            >
              <span style={{ fontSize: "1.1rem" }}>{currentPhase.icon}</span>
              <span
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: currentPhase.color,
                  letterSpacing: "-0.01em",
                }}
              >
                {currentPhase.text}
              </span>
              <span style={{ color: currentPhase.color, opacity: 0.6, fontWeight: 500, width: 20 }}>
                {dots}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-full" style={{ maxWidth: 360 }}>
          <div
            className="rounded-full overflow-hidden"
            style={{
              height: 4,
              background: "#F0F0F0",
            }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #007AFF, #5856D6, #AF52DE)",
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          {/* Progress percentage */}
          <div
            className="flex justify-between mt-3"
            style={{ fontSize: "0.75rem", color: "#9CA3AF" }}
          >
            <span style={{ fontWeight: 500 }}>Processing</span>
            <motion.span
              key={Math.floor(progress)}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              style={{ fontFamily: "monospace", fontWeight: 600, color: "#6B7280" }}
            >
              {Math.floor(progress)}%
            </motion.span>
          </div>
        </div>

        {/* Bottom shimmer line — kept */}
        <motion.div
          className="mt-12 rounded-full"
          style={{
            width: 120,
            height: 2,
            background: "linear-gradient(90deg, transparent, rgba(0,122,255,0.3), transparent)",
          }}
          animate={{ opacity: [0.3, 0.7, 0.3], scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
