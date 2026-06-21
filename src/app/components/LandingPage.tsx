import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

function FloatingOrb({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: color,
        filter: "blur(100px)",
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function ParticleDot({ x, y, size, opacity }: { x: number; y: number; size: number; opacity: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: "rgba(0,122,255,0.25)",
        opacity,
      }}
      animate={{ opacity: [opacity, opacity * 0.3, opacity] }}
      transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  const particles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 3,
    speedX: (Math.random() - 0.5) * 0.2,
    speedY: (Math.random() - 0.5) * 0.2,
    opacity: 0.15 + Math.random() * 0.3,
  }));

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center" style={{ background: "#FFFFFF" }}>
      {/* Ambient orbs — kept, just softer Apple-toned */}
      <FloatingOrb x="10%" y="15%" size={400} color="rgba(0,122,255,0.04)" delay={0} />
      <FloatingOrb x="65%" y="5%" size={350} color="rgba(175,82,222,0.03)" delay={2} />
      <FloatingOrb x="5%" y="55%" size={300} color="rgba(0,122,255,0.03)" delay={4} />
      <FloatingOrb x="70%" y="60%" size={380} color="rgba(255,122,0,0.025)" delay={1} />

      {/* Particles — kept, subtle */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <ParticleDot key={p.id} x={p.x * window.innerWidth / 100} y={p.y * window.innerHeight / 100} size={p.size} opacity={p.opacity} />
        ))}
      </div>

      {/* Subtle grid — kept, more muted */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm"
            style={{
              background: "#FAFAFA",
              borderColor: "#E5E7EB",
              color: "#6B7280",
            }}
          >
            <Sparkles size={14} style={{ color: "#007AFF" }} />
            <span style={{ fontWeight: 500 }}>Powered by AI Research Intelligence</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 tracking-tight"
          style={{
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            fontWeight: 600,
            lineHeight: 1.06,
            color: "#111111",
            letterSpacing: "-0.04em",
          }}
        >
          Turn Ideas Into{" "}
          <span style={{ color: "#FF7A00" }}>
            Winning
          </span>{" "}
          Hackathon Projects
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(1.05rem, 2.2vw, 1.25rem)",
            color: "#6B7280",
            maxWidth: 480,
            lineHeight: 1.65,
            fontWeight: 400,
          }}
          className="mb-12"
        >
          AI-powered research, validation, and presentation generation — all in one elegant workspace.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            onClick={onGetStarted}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="relative overflow-hidden px-10 py-4 rounded-full cursor-pointer"
            style={{
              background: "#111111",
              color: "#FFFFFF",
              fontSize: "1.05rem",
              fontWeight: 600,
              border: "none",
              letterSpacing: "-0.01em",
            }}
          >
            <span className="relative z-10">Get Started →</span>
          </motion.button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-10 flex items-center gap-3"
          style={{ color: "#9CA3AF", fontSize: "0.85rem" }}
        >
          <div className="flex -space-x-2">
            {["#007AFF", "#34C759", "#FF7A00", "#AF52DE"].map((c, i) => (
              <div
                key={i}
                className="rounded-full border-2 border-white"
                style={{ width: 28, height: 28, background: c }}
              />
            ))}
          </div>
          <span>Trusted by 2,400+ hackers worldwide</span>
        </motion.div>
      </div>
    </div>
  );
}
