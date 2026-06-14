import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const phases = [
  { text: "Scanning existing solutions…", icon: "🔎", color: "#007AFF" },
  { text: "Comparing market landscape…", icon: "📈", color: "#34C759" },
  { text: "Evaluating uniqueness score…", icon: "🧬", color: "#5856D6" },
  { text: "Identifying research gaps…", icon: "🕳️", color: "#007AFF" },
  { text: "Assessing feasibility…", icon: "⚖️", color: "#34C759" },
  { text: "Mapping opportunities…", icon: "🗺️", color: "#5856D6" },
  { text: "Generating validation report…", icon: "📋", color: "#007AFF" },
];

interface Props {
  onComplete: () => void;
}

export function StepValidating({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        const inc = p < 20 ? 0.6 : p < 80 ? 1.2 : 0.5;
        return Math.min(p + inc, 100);
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setPhaseIndex((i) => (i + 1) % phases.length), 1400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setDots((d) => (d.length >= 3 ? "" : d + ".")), 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
  }, [progress, onComplete]);

  const phase = phases[phaseIndex];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: "#FAFAFA", overflow: "hidden" }}
    >
      {/* Animated orbs — kept, Apple-toned */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 220 + i * 70,
              height: 220 + i * 70,
              background: `radial-gradient(circle, ${["rgba(52,199,89,0.06)","rgba(0,122,255,0.05)","rgba(52,199,89,0.04)"][i % 3]}, transparent 70%)`,
              filter: "blur(50px)",
            }}
            animate={{
              x: [0, 25 * Math.sin(i * 1.5), -15, 0],
              y: [0, -20 * Math.cos(i), 10, 0],
              scale: [1, 1.08, 0.96, 1],
            }}
            transition={{ duration: 7 + i * 1.2, repeat: Infinity, ease: "easeInOut" }}
            initial={{ top: `${8 + i * 18}%`, left: `${10 + i * 17}%` }}
          />
        ))}
      </div>

      {/* Particles — kept */}
      <div className="fixed inset-0 pointer-events-none" style={{ opacity: 0.25 }}>
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={`p-${i}`}
            className="absolute rounded-full"
            style={{
              width: 3, height: 3, background: "#34C759",
              top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0, 0.9, 0], scale: [0, 1, 0] }}
            transition={{ duration: 2 + Math.random() * 2.5, repeat: Infinity, delay: Math.random() * 3, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-lg w-full">
        {/* Shield animation — KEPT, Apple colors */}
        <div className="relative" style={{ width: 150, height: 150, marginBottom: 44 }}>
          {/* Outer pulse */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid rgba(52,199,89,0.12)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "1.5px solid rgba(52,199,89,0.15)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 8, height: 8, background: "#34C759",
                boxShadow: "0 0 14px rgba(52,199,89,0.4), 0 0 30px rgba(52,199,89,0.15)",
                top: -4, left: "50%", marginLeft: -4,
              }}
            />
          </motion.div>
          {/* Inner ring */}
          <motion.div
            className="absolute rounded-full"
            style={{ inset: 25, border: "1px solid rgba(52,199,89,0.1)" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 6, height: 6, background: "#34C759",
                boxShadow: "0 0 10px rgba(52,199,89,0.2)",
                bottom: -3, left: "50%", marginLeft: -3,
              }}
            />
          </motion.div>
          {/* Center */}
          <motion.div
            className="absolute rounded-full flex items-center justify-center"
            style={{
              inset: 40,
              background: "radial-gradient(circle, rgba(52,199,89,0.1), rgba(52,199,89,0.02))",
            }}
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.span
              style={{ fontSize: "1.6rem" }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🛡️
            </motion.span>
          </motion.div>
        </div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "1.6rem", fontWeight: 600, color: "#111111",
            letterSpacing: "-0.03em", marginBottom: 8, textAlign: "center",
          }}
        >
          Validating your idea
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ fontSize: "0.9rem", color: "#9CA3AF", marginBottom: 40, textAlign: "center" }}
        >
          Checking against existing solutions and market gaps
        </motion.p>

        {/* Phase text */}
        <div style={{ height: 36, marginBottom: 32, overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={phaseIndex}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 justify-center"
            >
              <span style={{ fontSize: "1.1rem" }}>{phase.icon}</span>
              <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "#34C759", letterSpacing: "-0.01em" }}>
                {phase.text}
              </span>
              <span style={{ color: "#34C759", opacity: 0.6, fontWeight: 500, width: 20 }}>{dots}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-full" style={{ maxWidth: 360 }}>
          <div
            className="rounded-full overflow-hidden"
            style={{ height: 4, background: "#F0F0F0" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #34C759, #30D158, #007AFF)",
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-3" style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>
            <span style={{ fontWeight: 500 }}>Validating</span>
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

        <motion.div
          className="mt-12 rounded-full"
          style={{ width: 120, height: 2, background: "linear-gradient(90deg, transparent, rgba(52,199,89,0.3), transparent)" }}
          animate={{ opacity: [0.3, 0.7, 0.3], scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
