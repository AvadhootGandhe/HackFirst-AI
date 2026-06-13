import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { Step1Idea } from "./components/Step1Idea";
import { Step2Domain } from "./components/Step2Domain";
import { Step3Research } from "./components/Step3Research";
import { Step4PPT } from "./components/Step4PPT";
import { Step5Team } from "./components/Step5Team";
import { Step6Terms } from "./components/Step6Terms";
import { Dashboard } from "./components/Dashboard";

type Page = "landing" | "step1" | "step2" | "step3" | "step4" | "step5" | "step6" | "dashboard";

export default function App() {
  /* MARKER-MAKE-KIT-INVOKED */
  const [page, setPage] = useState<Page>("landing");
  const [idea, setIdea] = useState("");
  const [domains, setDomains] = useState<string[]>([]);
  const [researchTypes, setResearchTypes] = useState<string[]>([]);
  const [pptSections, setPptSections] = useState<string[]>([]);
  const [team, setTeam] = useState<string[]>([]);
  const [agreed, setAgreed] = useState<Record<string, boolean>>({});

  const nav = (to: Page) => setPage(to);

  const pageVariants = {
    initial: { opacity: 0, y: 20, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -20, filter: "blur(8px)" },
  };
  const transition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif", minHeight: "100vh" }}>
      <AnimatePresence mode="wait">
        {page === "landing" && (
          <motion.div key="landing" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
            <LandingPage onGetStarted={() => nav("step1")} />
          </motion.div>
        )}
        {page === "step1" && (
          <motion.div key="step1" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
            <Step1Idea value={idea} onChange={setIdea} onNext={() => nav("step2")} onBack={() => nav("landing")} />
          </motion.div>
        )}
        {page === "step2" && (
          <motion.div key="step2" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
            <Step2Domain selected={domains} onChange={setDomains} onNext={() => nav("step3")} onBack={() => nav("step1")} />
          </motion.div>
        )}
        {page === "step3" && (
          <motion.div key="step3" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
            <Step3Research selected={researchTypes} onChange={setResearchTypes} onNext={() => nav("step4")} onBack={() => nav("step2")} />
          </motion.div>
        )}
        {page === "step4" && (
          <motion.div key="step4" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
            <Step4PPT selected={pptSections} onChange={setPptSections} onNext={() => nav("step5")} onBack={() => nav("step3")} />
          </motion.div>
        )}
        {page === "step5" && (
          <motion.div key="step5" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
            <Step5Team selected={team} onChange={setTeam} onNext={() => nav("step6")} onBack={() => nav("step4")} />
          </motion.div>
        )}
        {page === "step6" && (
          <motion.div key="step6" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
            <Step6Terms agreed={agreed} onChange={setAgreed} onNext={() => nav("dashboard")} onBack={() => nav("step5")} />
          </motion.div>
        )}
        {page === "dashboard" && (
          <motion.div key="dashboard" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
            <Dashboard idea={idea} domains={domains} team={team} pptSections={pptSections} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
