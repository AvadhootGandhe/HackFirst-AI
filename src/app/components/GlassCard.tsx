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
      className={`rounded-[20px] ${className}`}
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
        ...style,
      }}
      animate={floating ? { y: [0, -6, 0] } : undefined}
      transition={floating ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : undefined}
    >
      {children}
    </motion.div>
  );
}
