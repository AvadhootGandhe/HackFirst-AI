import { motion, HTMLMotionProps } from "motion/react";
import { ReactNode } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  floating?: boolean;
}

export function GlassCard({ children, className = "", floating = false, style, ...props }: GlassCardProps) {
  return (
    <motion.div
      {...props}
      className={`rounded-3xl ${className}`}
      style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
        ...style,
      }}
      animate={floating ? { y: [0, -6, 0] } : undefined}
      transition={floating ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : undefined}
    >
      {children}
    </motion.div>
  );
}
