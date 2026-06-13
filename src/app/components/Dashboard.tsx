import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { GlassCard } from "./GlassCard";
import {
  Sparkles, FileText, Users, Activity, Zap, TrendingUp,
  CheckCircle2, Clock, ArrowRight, ChevronRight, BarChart3,
  Brain, Presentation, RefreshCw
} from "lucide-react";

interface DashboardProps {
  idea: string;
  domains: string[];
  team: string[];
  pptSections: string[];
}

function ProgressRing({ value, size = 80, strokeWidth = 7, color = "#6366f1" }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth={strokeWidth} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center" style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0a0a14" }}>
        {value}%
      </div>
    </div>
  );
}

const teamMembers = [
  { name: "Alex Johnson", avatar: "#6366f1", online: true },
  { name: "Sarah Lee", avatar: "#10b981", online: true },
  { name: "Mike Chen", avatar: "#f59e0b", online: false },
  { name: "Emma Davis", avatar: "#ec4899", online: true },
  { name: "David Wilson", avatar: "#8b5cf6", online: false },
  { name: "Sophia Patel", avatar: "#06b6d4", online: true },
];

const activityItems = [
  { text: "Research brief generated for AI/ML domain", time: "2m ago", icon: Brain, color: "#6366f1" },
  { text: "3 team members joined the workspace", time: "5m ago", icon: Users, color: "#10b981" },
  { text: "Competitor analysis initiated", time: "12m ago", icon: TrendingUp, color: "#f59e0b" },
  { text: "Presentation template selected", time: "18m ago", icon: Presentation, color: "#8b5cf6" },
  { text: "Idea validation in progress", time: "24m ago", icon: CheckCircle2, color: "#22c55e" },
];

export function Dashboard({ idea, domains, team, pptSections }: DashboardProps) {
  const [researchProgress, setResearchProgress] = useState(0);
  const [pptProgress, setPptProgress] = useState(0);
  const [agentStatus, setAgentStatus] = useState<"idle" | "running" | "done">("idle");
  const [showGenerateAnim, setShowGenerateAnim] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setResearchProgress(62), 500);
    const t2 = setTimeout(() => setPptProgress(38), 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const displayIdea = idea.length > 60 ? idea.slice(0, 60) + "…" : idea;
  const displayDomains = domains.slice(0, 3).join(", ") || "AI / ML";

  const handleGenerate = () => {
    setAgentStatus("running");
    setShowGenerateAnim(true);
    setTimeout(() => {
      setAgentStatus("done");
      setResearchProgress(91);
    }, 3000);
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #f8f8fc 0%, #eeeef8 40%, #f4f0ff 100%)" }}
    >
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-15%", right: "-10%", background: "rgba(139,92,246,0.06)", filter: "blur(100px)" }} />
        <div className="absolute rounded-full" style={{ width: 500, height: 500, bottom: "-10%", left: "-8%", background: "rgba(99,102,241,0.07)", filter: "blur(100px)" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
              >
                <Zap size={14} style={{ color: "#fff" }} />
              </div>
              <span style={{ fontSize: "0.82rem", color: "#9999b0", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                HackFlow AI
              </span>
            </div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#0a0a14", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
              Research Workspace
            </h1>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <div
              className="px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(0,0,0,0.07)",
                fontSize: "0.82rem",
                color: "#6b6b82",
                fontWeight: 500,
                backdropFilter: "blur(12px)",
              }}
            >
              <Activity size={14} />
              <span>Live</span>
              <div className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }} />
            </div>
          </motion.div>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Project Overview — spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2"
          >
            <GlassCard className="p-6 h-full">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span style={{ fontSize: "0.72rem", color: "#9999b0", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Project Overview</span>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0a0a14", letterSpacing: "-0.025em", marginTop: 4, lineHeight: 1.3 }}>
                    {displayIdea || "AI-powered mental health companion"}
                  </h2>
                </div>
                <div
                  className="px-3 py-1 rounded-full"
                  style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", fontSize: "0.72rem", color: "#16a34a", fontWeight: 600 }}
                >
                  Active
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {(domains.length > 0 ? domains : ["AI / ML", "Healthcare"]).map((d) => (
                  <span
                    key={d}
                    className="px-2.5 py-1 rounded-lg"
                    style={{ background: "rgba(99,102,241,0.1)", fontSize: "0.75rem", color: "#6366f1", fontWeight: 500 }}
                  >
                    {d}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Research Depth", value: "Advanced", icon: Brain, color: "#6366f1" },
                  { label: "PPT Sections", value: `${pptSections.length || 12}`, icon: Presentation, color: "#8b5cf6" },
                  { label: "Team Size", value: `${team.length || 3}`, icon: Users, color: "#10b981" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="p-3 rounded-2xl"
                    style={{ background: "rgba(248,248,252,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}
                  >
                    <s.icon size={16} style={{ color: s.color, marginBottom: 6 }} />
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0a0a14" }}>{s.value}</div>
                    <div style={{ fontSize: "0.72rem", color: "#9999b0" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Research Progress */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard className="p-6 h-full flex flex-col">
              <span style={{ fontSize: "0.72rem", color: "#9999b0", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16, display: "block" }}>
                Research Progress
              </span>
              <div className="flex-1 flex flex-col items-center justify-center gap-4">
                <ProgressRing value={researchProgress} size={100} strokeWidth={8} />
                <div className="text-center">
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0a0a14" }}>Research Complete</div>
                  <div style={{ fontSize: "0.75rem", color: "#9999b0" }}>Gathering market data…</div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* AI Agent Status */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard className="p-6">
              <span style={{ fontSize: "0.72rem", color: "#9999b0", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12, display: "block" }}>
                AI Research Agent
              </span>

              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                  >
                    <Brain size={18} style={{ color: "#fff" }} />
                  </div>
                  {agentStatus === "running" && (
                    <motion.div
                      className="absolute -inset-1 rounded-xl"
                      style={{ border: "2px solid rgba(99,102,241,0.4)" }}
                      animate={{ scale: [1, 1.15, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </div>
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#0a0a14" }}>HackFlow AI</div>
                  <div style={{ fontSize: "0.75rem", color: agentStatus === "running" ? "#6366f1" : agentStatus === "done" ? "#22c55e" : "#9999b0" }}>
                    {agentStatus === "idle" ? "Ready to research" : agentStatus === "running" ? "Researching…" : "Research complete"}
                  </div>
                </div>
              </div>

              {agentStatus === "running" && (
                <div className="space-y-2 mb-4">
                  {["Searching databases", "Analyzing trends", "Validating data"].map((task, i) => (
                    <motion.div
                      key={task}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.3 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ background: "#6366f1" }}
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                      <span style={{ fontSize: "0.75rem", color: "#6b6b82" }}>{task}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              <motion.button
                onClick={handleGenerate}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={agentStatus === "running"}
                className="w-full py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-2"
                style={{
                  background: agentStatus === "running" ? "rgba(99,102,241,0.2)" : "linear-gradient(135deg, #6366f1, #7c3aed)",
                  border: "none",
                  color: "#fff",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: agentStatus === "running" ? "not-allowed" : "pointer",
                }}
              >
                {agentStatus === "running" ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <RefreshCw size={13} />
                    </motion.div>
                    Researching…
                  </>
                ) : (
                  <>
                    <Sparkles size={13} />
                    Generate Research
                  </>
                )}
              </motion.button>
            </GlassCard>
          </motion.div>

          {/* Presentation Builder */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard className="p-6">
              <span style={{ fontSize: "0.72rem", color: "#9999b0", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12, display: "block" }}>
                Presentation Builder
              </span>

              <div className="flex items-center gap-3 mb-4">
                <ProgressRing value={pptProgress} size={60} strokeWidth={6} color="#8b5cf6" />
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#0a0a14" }}>
                    {pptSections.length || 8} sections ready
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#9999b0" }}>Building slides…</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {(pptSections.length > 0 ? pptSections.slice(0, 4) : ["Problem Statement", "Proposed Solution", "Market Analysis", "Technology Stack"]).map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: i < 2 ? "#22c55e" : "rgba(99,102,241,0.3)" }}
                    />
                    <span style={{ fontSize: "0.75rem", color: i < 2 ? "#16a34a" : "#9999b0" }}>{s}</span>
                    {i < 2 && <CheckCircle2 size={11} style={{ color: "#22c55e", marginLeft: "auto" }} />}
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-2"
                style={{
                  background: "rgba(139,92,246,0.1)",
                  border: "1.5px solid rgba(139,92,246,0.3)",
                  color: "#8b5cf6",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                }}
              >
                <FileText size={13} />
                Generate PPT
              </motion.button>
            </GlassCard>
          </motion.div>

          {/* Team Members */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span style={{ fontSize: "0.72rem", color: "#9999b0", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Team Members
                </span>
                <span style={{ fontSize: "0.72rem", color: "#6366f1", fontWeight: 600 }}>
                  {teamMembers.filter(t => t.online).length} online
                </span>
              </div>

              <div className="space-y-2.5">
                {teamMembers.slice(0, 4).map((member, i) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="relative">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: member.avatar, fontSize: "0.65rem", color: "#fff", fontWeight: 700 }}
                      >
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div
                        className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white"
                        style={{ background: member.online ? "#22c55e" : "#d1d5db" }}
                      />
                    </div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 500, color: "#0a0a14" }}>{member.name}</div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Recent Activity — spans full width */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-3"
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-5">
                <span style={{ fontSize: "0.72rem", color: "#9999b0", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Recent Activity
                </span>
                <span style={{ fontSize: "0.72rem", color: "#6366f1", fontWeight: 600, cursor: "pointer" }}>
                  View all →
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {activityItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.06 }}
                    className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ background: "rgba(248,248,252,0.8)", border: "1px solid rgba(0,0,0,0.05)" }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${item.color}15` }}
                    >
                      <item.icon size={13} style={{ color: item.color }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.78rem", color: "#0a0a14", fontWeight: 500, lineHeight: 1.4 }}>{item.text}</div>
                      <div style={{ fontSize: "0.68rem", color: "#9999b0", marginTop: 2 }}>{item.time}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
