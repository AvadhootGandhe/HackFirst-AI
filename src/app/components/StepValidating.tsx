import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const phases = [
  { text: "Scanning existing solutions…", icon: "🔎", color: "#6366f1" },
  { text: "Comparing market landscape…", icon: "📈", color: "#8b5cf6" },
  { text: "Evaluating uniqueness score…", icon: "🧬", color: "#a78bfa" },
  { text: "Identifying research gaps…", icon: "🕳️", color: "#7c3aed" },
  { text: "Assessing feasibility…", icon: "⚖️", color: "#6366f1" },
  { text: "Mapping opportunities…", icon: "🗺️", color: "#8b5cf6" },
  { text: "Generating validation report…", icon: "📋", color: "#a78bfa" },
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
      style={{ background: "linear-gradient(135deg, #0a1628 0%, #111d3a 40%, #0c1222 100%)", overflow: "hidden" }}
    >
      {/* Animated orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 220 + i * 70,
              height: 220 + i * 70,
              background: `radial-gradient(circle, ${["rgba(34,197,94,0.12)","rgba(99,102,241,0.1)","rgba(16,185,129,0.08)"][i % 3]}, transparent 70%)`,
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

      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none" style={{ opacity: 0.25 }}>
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={`p-${i}`}
            className="absolute rounded-full"
            style={{
              width: 3, height: 3, background: "#22c55e",
              top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0, 0.9, 0], scale: [0, 1, 0] }}
            transition={{ duration: 2 + Math.random() * 2.5, repeat: Infinity, delay: Math.random() * 3, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-lg w-full">
        {/* Shield animation */}
        <div className="relative" style={{ width: 150, height: 150, marginBottom: 44 }}>
          {/* Outer pulse */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid rgba(34,197,94,0.15)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "1.5px solid rgba(34,197,94,0.25)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 8, height: 8, background: "#22c55e",
                boxShadow: "0 0 14px #22c55e, 0 0 30px rgba(34,197,94,0.3)",
                top: -4, left: "50%", marginLeft: -4,
              }}
            />
          </motion.div>
          {/* Inner ring */}
          <motion.div
            className="absolute rounded-full"
            style={{ inset: 25, border: "1px solid rgba(16,185,129,0.2)" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 6, height: 6, background: "#10b981",
                boxShadow: "0 0 10px #10b981",
                bottom: -3, left: "50%", marginLeft: -3,
              }}
            />
          </motion.div>
          {/* Center */}
          <motion.div
            className="absolute rounded-full flex items-center justify-center"
            style={{
              inset: 40,
              background: "radial-gradient(circle, rgba(34,197,94,0.25), rgba(34,197,94,0.05))",
              boxShadow: "0 0 50px rgba(34,197,94,0.25)",
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
            fontSize: "1.6rem", fontWeight: 700, color: "#ffffff",
            letterSpacing: "-0.03em", marginBottom: 8, textAlign: "center",
          }}
        >
          Validating your idea
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", marginBottom: 40, textAlign: "center" }}
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
              <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "#22c55e", letterSpacing: "-0.01em" }}>
                {phase.text}
              </span>
              <span style={{ color: "#22c55e", opacity: 0.6, fontWeight: 500, width: 20 }}>{dots}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-full" style={{ maxWidth: 360 }}>
          <div
            className="rounded-full overflow-hidden"
            style={{ height: 6, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #22c55e, #10b981, #059669)",
                boxShadow: "0 0 20px rgba(34,197,94,0.5)",
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-3" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
            <span style={{ fontWeight: 500 }}>Validating</span>
            <motion.span
              key={Math.floor(progress)}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              style={{ fontFamily: "monospace", fontWeight: 600, color: "rgba(255,255,255,0.5)" }}
            >
              {Math.floor(progress)}%
            </motion.span>
          </div>
        </div>

        <motion.div
          className="mt-12 rounded-full"
          style={{ width: 120, height: 2, background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)" }}
          animate={{ opacity: [0.3, 0.7, 0.3], scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
