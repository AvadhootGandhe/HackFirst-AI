import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { GlassCard } from "./GlassCard";
import {
  Sparkles, FileText, Users, Activity, Zap, TrendingUp,
  CheckCircle2, Clock, ArrowRight, ChevronRight, BarChart3,
  Brain, Presentation, RefreshCw, Home, Layout, Plus, Download, Eye,
  Search, Database, Globe, FileCode, Terminal, Code, Cpu, GitBranch, Layers, Shield, FolderOpen, File
} from "lucide-react";

interface DashboardProps {
  idea: string;
  domains: string[];
  team: string[];
  pptSections: string[];
}

type Tab = "home" | "presentation";

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

const tabs: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "presentation", label: "Presentation", icon: Presentation },
];

const dummySlides = [
  { title: "Title Slide", subtitle: "Project introduction and team", status: "done" as const },
  { title: "Problem Statement", subtitle: "Pain points and target audience", status: "done" as const },
  { title: "Proposed Solution", subtitle: "Core idea and value proposition", status: "done" as const },
  { title: "Market Analysis", subtitle: "TAM, SAM, SOM breakdown", status: "progress" as const },
  { title: "Technology Stack", subtitle: "Architecture and tools", status: "progress" as const },
  { title: "Competitive Landscape", subtitle: "Differentiators vs existing solutions", status: "pending" as const },
  { title: "Business Model", subtitle: "Revenue streams and pricing", status: "pending" as const },
  { title: "Roadmap & Timeline", subtitle: "MVP to launch milestones", status: "pending" as const },
  { title: "Team", subtitle: "Members, roles and expertise", status: "pending" as const },
  { title: "Q&A", subtitle: "Discussion and next steps", status: "pending" as const },
];

/* ──────────────────────────────────────────────
   AI Research Animation Card — 15-second cycle
   ────────────────────────────────────────────── */
const researchTasks = [
  { label: "Scanning academic papers", icon: Search, color: "#6366f1" },
  { label: "Querying knowledge databases", icon: Database, color: "#8b5cf6" },
  { label: "Crawling web sources", icon: Globe, color: "#06b6d4" },
  { label: "Analyzing market trends", icon: TrendingUp, color: "#10b981" },
  { label: "Cross-referencing citations", icon: Layers, color: "#f59e0b" },
  { label: "Validating data integrity", icon: Shield, color: "#ec4899" },
  { label: "Synthesizing findings", icon: Brain, color: "#6366f1" },
  { label: "Compiling research brief", icon: FileText, color: "#22c55e" },
];

const researchLogLines = [
  "[agent] Initializing research pipeline…",
  "[search] Found 2,847 relevant papers",
  "[filter] Applying domain filters: AI/ML, Healthcare",
  "[parse]  Extracting key findings from top 50 papers",
  "[db]     Querying PubMed, ArXiv, IEEE Xplore",
  "[web]    Crawling 128 industry reports",
  "[nlp]    Running sentiment analysis on market data",
  "[graph]  Building citation graph (1,204 nodes)",
  "[stat]   Computing statistical significance",
  "[valid]  Cross-validating 94% of data points",
  "[synth]  Generating executive summary",
  "[done]   Research compilation complete ✓",
];

function AIResearchAnimationCard() {
  const DURATION = 15000; // 15 seconds
  const [progress, setProgress] = useState(0);
  const [activeTaskIdx, setActiveTaskIdx] = useState(0);
  const [logLines, setLogLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<"running" | "done">("running");
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        setPhase("done");
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase === "done") return;
    const interval = setInterval(() => {
      setActiveTaskIdx((prev) => {
        if (prev >= researchTasks.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, DURATION / researchTasks.length);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    const lineInterval = DURATION / researchLogLines.length;
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < researchLogLines.length) {
        setLogLines((prev) => [...prev, researchLogLines[idx]]);
        idx++;
      } else {
        clearInterval(interval);
      }
    }, lineInterval);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logLines]);

  const currentTask = researchTasks[activeTaskIdx];
  const TaskIcon = currentTask.icon;

  return (
    <GlassCard className="p-6" style={{ overflow: "hidden" }}>
      <span style={{ fontSize: "0.72rem", color: "#9999b0", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14, display: "block" }}>
        AI Research Agent
      </span>

      {/* Header with brain icon */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            <motion.div
              animate={phase === "running" ? { rotate: [0, 10, -10, 0] } : { rotate: 0 }}
              transition={phase === "running" ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
            >
              <Brain size={20} style={{ color: "#fff" }} />
            </motion.div>
          </div>
          {phase === "running" && (
            <motion.div
              className="absolute -inset-1.5 rounded-xl"
              style={{ border: "2px solid rgba(99,102,241,0.35)" }}
              animate={{ scale: [1, 1.18, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          )}
          {phase === "done" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: "#22c55e" }}
            >
              <CheckCircle2 size={12} style={{ color: "#fff" }} />
            </motion.div>
          )}
        </div>
        <div>
          <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#0a0a14" }}>HackFlow AI</div>
          <div style={{ fontSize: "0.75rem", color: phase === "running" ? "#6366f1" : "#22c55e", fontWeight: 500 }}>
            {phase === "running" ? "Researching…" : "Research complete ✓"}
          </div>
        </div>
      </div>

      {/* Current task indicator */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTaskIdx}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg"
          style={{ background: `${currentTask.color}10`, border: `1px solid ${currentTask.color}25` }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <TaskIcon size={14} style={{ color: currentTask.color }} />
          </motion.div>
          <span style={{ fontSize: "0.78rem", color: currentTask.color, fontWeight: 600 }}>{currentTask.label}</span>
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span style={{ fontSize: "0.7rem", color: "#9999b0", fontWeight: 500 }}>Progress</span>
          <span style={{ fontSize: "0.7rem", color: "#6366f1", fontWeight: 700 }}>{Math.round(progress)}%</span>
        </div>
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: 6, background: "rgba(99,102,241,0.08)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "linear" }}
          />
        </div>
      </div>

      {/* Task checklist */}
      <div className="space-y-1 mb-3">
        {researchTasks.slice(0, 5).map((task, i) => {
          const isDone = i < activeTaskIdx;
          const isActive = i === activeTaskIdx;
          return (
            <motion.div
              key={task.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-2"
            >
              {isDone ? (
                <CheckCircle2 size={12} style={{ color: "#22c55e" }} />
              ) : isActive ? (
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{ background: task.color }}
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              ) : (
                <div className="w-3 h-3 rounded-full" style={{ background: "rgba(0,0,0,0.08)" }} />
              )}
              <span style={{
                fontSize: "0.72rem",
                color: isDone ? "#22c55e" : isActive ? "#0a0a14" : "#c0c0d0",
                fontWeight: isActive ? 600 : 400,
                textDecoration: isDone ? "line-through" : "none",
              }}>{task.label}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Live log feed */}
      <div
        ref={logRef}
        className="rounded-lg p-2.5 overflow-y-auto"
        style={{
          background: "rgba(10,10,20,0.92)",
          maxHeight: 90,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        }}
      >
        {logLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              fontSize: "0.62rem",
              color: line.includes("✓") ? "#22c55e" : line.includes("[done]") ? "#22c55e" : "rgba(165,165,200,0.85)",
              lineHeight: 1.7,
              whiteSpace: "nowrap",
            }}
          >
            {line}
            {i === logLines.length - 1 && phase === "running" && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                style={{ color: "#6366f1" }}
              >
                █
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}

/* ──────────────────────────────────────────────
   Agentic File Builder Card — 10-second cycle
   ────────────────────────────────────────────── */
const agenticFiles = [
  { name: "research_agent.py", icon: FileCode, color: "#6366f1", size: "2.4 KB" },
  { name: "data_pipeline.py", icon: Code, color: "#8b5cf6", size: "1.8 KB" },
  { name: "validation_agent.py", icon: Shield, color: "#10b981", size: "3.1 KB" },
  { name: "synthesis_engine.py", icon: Cpu, color: "#f59e0b", size: "2.7 KB" },
  { name: "output_formatter.py", icon: FileText, color: "#ec4899", size: "1.2 KB" },
  { name: "agent_config.yaml", icon: Layers, color: "#06b6d4", size: "0.9 KB" },
  { name: "orchestrator.py", icon: GitBranch, color: "#22c55e", size: "4.1 KB" },
];

const terminalLines = [
  { text: "$ hackflow init --agents", type: "cmd" as const },
  { text: "⠋ Scaffolding agentic architecture…", type: "info" as const },
  { text: "✓ Created /agents/research_agent.py", type: "success" as const },
  { text: "✓ Created /agents/data_pipeline.py", type: "success" as const },
  { text: "✓ Created /agents/validation_agent.py", type: "success" as const },
  { text: "⠋ Generating synthesis engine…", type: "info" as const },
  { text: "✓ Created /agents/synthesis_engine.py", type: "success" as const },
  { text: "✓ Created /agents/output_formatter.py", type: "success" as const },
  { text: "✓ Created /config/agent_config.yaml", type: "success" as const },
  { text: "⠋ Wiring orchestration layer…", type: "info" as const },
  { text: "✓ Created /agents/orchestrator.py", type: "success" as const },
  { text: "✓ All agentic files generated successfully", type: "done" as const },
];

function AgenticFileBuilderCard() {
  const DURATION = 10000; // 10 seconds
  const [progress, setProgress] = useState(0);
  const [visibleFiles, setVisibleFiles] = useState(0);
  const [termLines, setTermLines] = useState<typeof terminalLines>([]);
  const [phase, setPhase] = useState<"building" | "done">("building");
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        setPhase("done");
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fileInterval = DURATION / agenticFiles.length;
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < agenticFiles.length) {
        idx++;
        setVisibleFiles(idx);
      } else {
        clearInterval(interval);
      }
    }, fileInterval);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const lineInterval = DURATION / terminalLines.length;
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < terminalLines.length) {
        setTermLines((prev) => [...prev, terminalLines[idx]]);
        idx++;
      } else {
        clearInterval(interval);
      }
    }, lineInterval);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [termLines]);

  return (
    <GlassCard className="p-6" style={{ overflow: "hidden" }}>
      <span style={{ fontSize: "0.72rem", color: "#9999b0", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14, display: "block" }}>
        Agentic File Builder
      </span>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #10b981, #06b6d4)" }}
          >
            <motion.div
              animate={phase === "building" ? { rotateY: [0, 180, 360] } : { rotateY: 0 }}
              transition={phase === "building" ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
            >
              <Terminal size={20} style={{ color: "#fff" }} />
            </motion.div>
          </div>
          {phase === "building" && (
            <motion.div
              className="absolute -inset-1.5 rounded-xl"
              style={{ border: "2px solid rgba(16,185,129,0.35)" }}
              animate={{ scale: [1, 1.18, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          )}
          {phase === "done" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: "#22c55e" }}
            >
              <CheckCircle2 size={12} style={{ color: "#fff" }} />
            </motion.div>
          )}
        </div>
        <div>
          <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#0a0a14" }}>Agent Scaffolder</div>
          <div style={{ fontSize: "0.75rem", color: phase === "building" ? "#10b981" : "#22c55e", fontWeight: 500 }}>
            {phase === "building" ? "Building agents…" : "All agents ready ✓"}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span style={{ fontSize: "0.7rem", color: "#9999b0", fontWeight: 500 }}>Build Progress</span>
          <span style={{ fontSize: "0.7rem", color: "#10b981", fontWeight: 700 }}>{Math.round(progress)}%</span>
        </div>
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: 6, background: "rgba(16,185,129,0.08)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #10b981, #06b6d4, #22d3ee)" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "linear" }}
          />
        </div>
      </div>

      {/* File tree */}
      <div className="mb-3 px-1">
        <div className="flex items-center gap-1.5 mb-2">
          <FolderOpen size={13} style={{ color: "#f59e0b" }} />
          <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#0a0a14" }}>/agents</span>
        </div>
        <div className="space-y-0.5" style={{ paddingLeft: 16 }}>
          {agenticFiles.slice(0, visibleFiles).map((file, i) => {
            const FIcon = file.icon;
            return (
              <motion.div
                key={file.name}
                initial={{ opacity: 0, x: -10, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2 py-0.5"
              >
                <FIcon size={11} style={{ color: file.color }} />
                <span style={{ fontSize: "0.68rem", color: "#0a0a14", fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>
                  {file.name}
                </span>
                <span style={{ fontSize: "0.6rem", color: "#c0c0d0", marginLeft: "auto" }}>{file.size}</span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <CheckCircle2 size={10} style={{ color: "#22c55e" }} />
                </motion.div>
              </motion.div>
            );
          })}
          {phase === "building" && visibleFiles < agenticFiles.length && (
            <motion.div
              className="flex items-center gap-2 py-0.5"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <File size={11} style={{ color: "#c0c0d0" }} />
              <span style={{ fontSize: "0.68rem", color: "#c0c0d0", fontStyle: "italic", fontFamily: "'JetBrains Mono', monospace" }}>
                generating…
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Terminal output */}
      <div
        ref={termRef}
        className="rounded-lg p-2.5 overflow-y-auto"
        style={{
          background: "rgba(10,10,20,0.92)",
          maxHeight: 80,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        }}
      >
        {termLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              fontSize: "0.6rem",
              lineHeight: 1.8,
              whiteSpace: "nowrap",
              color:
                line.type === "cmd" ? "#22d3ee"
                : line.type === "success" ? "#22c55e"
                : line.type === "done" ? "#22c55e"
                : "rgba(165,165,200,0.7)",
              fontWeight: line.type === "done" ? 700 : 400,
            }}
          >
            {line.text}
            {i === termLines.length - 1 && phase === "building" && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                style={{ color: "#10b981" }}
              >
                █
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}

export function Dashboard({ idea, domains, team, pptSections }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [researchProgress, setResearchProgress] = useState(0);
  const [pptProgress, setPptProgress] = useState(0);
  const [agentStatus, setAgentStatus] = useState<"idle" | "running" | "done">("idle");
  const [showGenerateAnim, setShowGenerateAnim] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(0);

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

  const statusColors = { done: "#22c55e", progress: "#6366f1", pending: "#d1d5db" };
  const statusLabels = { done: "Complete", progress: "In Progress", pending: "Pending" };

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
          className="flex items-center justify-between mb-6"
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

        {/* Tab bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div
            className="inline-flex items-center gap-1 p-1 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(0,0,0,0.07)",
              backdropFilter: "blur(16px)",
            }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative px-5 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer"
                  style={{
                    border: "none",
                    background: "transparent",
                    fontSize: "0.85rem",
                    fontWeight: isActive ? 620 : 500,
                    color: isActive ? "#0a0a14" : "#9999b0",
                    zIndex: 1,
                  }}
                  whileHover={!isActive ? { color: "#6b6b82" } : {}}
                  whileTap={{ scale: 0.97 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: "#fff",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 0.5px 1px rgba(0,0,0,0.08)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <tab.icon size={15} style={{ position: "relative", zIndex: 2 }} />
                  <span style={{ position: "relative", zIndex: 2 }}>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
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

                {/* AI Research Animation Card */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <AIResearchAnimationCard />
                </motion.div>

                {/* AI Agentic File Builder Card */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <AgenticFileBuilderCard />
                </motion.div>

                {/* Presentation Builder card */}
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
                      onClick={() => setActiveTab("presentation")}
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
                      Open Presentation
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
            </motion.div>
          )}

          {activeTab === "presentation" && (
            <motion.div
              key="presentation"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Slide list sidebar */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="md:col-span-4"
                >
                  <GlassCard className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span style={{ fontSize: "0.72rem", color: "#9999b0", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                        Slides ({dummySlides.length})
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer"
                        style={{ background: "rgba(99,102,241,0.1)", border: "none", color: "#6366f1" }}
                      >
                        <Plus size={14} />
                      </motion.button>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      {dummySlides.map((slide, i) => (
                        <motion.button
                          key={i}
                          onClick={() => setSelectedSlide(i)}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + i * 0.04 }}
                          whileHover={{ x: 2 }}
                          className="w-full flex items-center gap-3 p-3 rounded-xl text-left cursor-pointer"
                          style={{
                            background: selectedSlide === i ? "rgba(99,102,241,0.08)" : "transparent",
                            border: selectedSlide === i ? "1px solid rgba(99,102,241,0.2)" : "1px solid transparent",
                          }}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                              background: selectedSlide === i ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "rgba(0,0,0,0.04)",
                              color: selectedSlide === i ? "#fff" : "#9999b0",
                              fontSize: "0.7rem",
                              fontWeight: 700,
                            }}
                          >
                            {i + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#0a0a14", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {slide.title}
                            </div>
                            <div style={{ fontSize: "0.68rem", color: "#9999b0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {slide.subtitle}
                            </div>
                          </div>
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: statusColors[slide.status] }}
                          />
                        </motion.button>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Slide preview + details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="md:col-span-8"
                >
                  <GlassCard className="p-6 mb-4">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <span style={{ fontSize: "0.72rem", color: "#9999b0", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                          Slide {selectedSlide + 1} of {dummySlides.length}
                        </span>
                        <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0a0a14", letterSpacing: "-0.02em", marginTop: 4 }}>
                          {dummySlides[selectedSlide].title}
                        </h2>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2.5 py-1 rounded-full"
                          style={{
                            fontSize: "0.68rem",
                            fontWeight: 600,
                            background: `${statusColors[dummySlides[selectedSlide].status]}15`,
                            color: statusColors[dummySlides[selectedSlide].status],
                          }}
                        >
                          {statusLabels[dummySlides[selectedSlide].status]}
                        </span>
                      </div>
                    </div>

                    {/* Slide preview area */}
                    <div
                      className="rounded-2xl flex items-center justify-center mb-5"
                      style={{
                        aspectRatio: "16/9",
                        background: "linear-gradient(145deg, #1a1035, #0f0a1e)",
                        border: "1px solid rgba(99,102,241,0.15)",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 30% 40%, rgba(99,102,241,0.12), transparent 60%)" }} />
                      <div className="text-center relative z-10 px-8">
                        <motion.div
                          key={selectedSlide}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: 8 }}>
                            {dummySlides[selectedSlide].title}
                          </h3>
                          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)" }}>
                            {dummySlides[selectedSlide].subtitle}
                          </p>
                        </motion.div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex-1 py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-2"
                        style={{
                          background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                          border: "none",
                          color: "#fff",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                        }}
                      >
                        <Sparkles size={13} />
                        Generate Content
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="py-2.5 px-4 rounded-xl cursor-pointer flex items-center justify-center gap-2"
                        style={{
                          background: "rgba(255,255,255,0.7)",
                          border: "1px solid rgba(0,0,0,0.08)",
                          color: "#6b6b82",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                        }}
                      >
                        <Eye size={13} />
                        Preview
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="py-2.5 px-4 rounded-xl cursor-pointer flex items-center justify-center gap-2"
                        style={{
                          background: "rgba(255,255,255,0.7)",
                          border: "1px solid rgba(0,0,0,0.08)",
                          color: "#6b6b82",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                        }}
                      >
                        <Download size={13} />
                        Export
                      </motion.button>
                    </div>
                  </GlassCard>

                  {/* Slide notes */}
                  <GlassCard className="p-5">
                    <span style={{ fontSize: "0.72rem", color: "#9999b0", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10, display: "block" }}>
                      Speaker Notes
                    </span>
                    <textarea
                      placeholder="Add speaker notes for this slide…"
                      rows={3}
                      className="w-full rounded-xl p-4 resize-none"
                      style={{
                        background: "rgba(255,255,255,0.6)",
                        border: "1px solid rgba(0,0,0,0.06)",
                        outline: "none",
                        fontSize: "0.82rem",
                        lineHeight: 1.6,
                        color: "#0a0a14",
                        fontFamily: "inherit",
                      }}
                    />
                  </GlassCard>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


