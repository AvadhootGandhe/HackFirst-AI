import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { Step1Idea } from "./components/Step1Idea";
import { Step2Domain } from "./components/Step2Domain";
import { StepAnalyzing } from "./components/StepAnalyzing";
import { StepReview } from "./components/StepReview";
import { StepValidateChoice } from "./components/StepValidateChoice";
import { StepValidating } from "./components/StepValidating";
import { StepValidationResults } from "./components/StepValidationResults";
import { StepTechStack } from "./components/StepTechStack";
import { StepMethodology } from "./components/StepMethodology";
import { Step3Research } from "./components/Step3Research";
import { Step4PPT } from "./components/Step4PPT";
import { Step5Team } from "./components/Step5Team";
import { Step6Terms } from "./components/Step6Terms";
import { Dashboard } from "./components/Dashboard";

type Page = "landing" | "step1" | "step2" | "analyzing" | "review" | "validate-choice" | "validating" | "validation-results" | "tech-stack" | "methodology" | "step3" | "step4" | "step5" | "step6" | "dashboard";

export default function App() {
  /* MARKER-MAKE-KIT-INVOKED */
  const [page, setPage] = useState<Page>("landing");
  const [idea, setIdea] = useState("");
  const [domains, setDomains] = useState<string[]>([]);
  const [researchTypes, setResearchTypes] = useState<string[]>([]);
  const [pptSections, setPptSections] = useState<string[]>([]);
  const [team, setTeam] = useState<string[]>([]);
  const [agreed, setAgreed] = useState<Record<string, boolean>>({});
  const [techStack, setTechStack] = useState<string[]>([]);
  const [methodology, setMethodology] = useState("");

  const nav = (to: Page) => setPage(to);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  const transition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

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
            <Step2Domain selected={domains} onChange={setDomains} onNext={() => nav("analyzing")} onBack={() => nav("step1")} />
          </motion.div>
        )}
        {page === "analyzing" && (
          <motion.div key="analyzing" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
            <StepAnalyzing onComplete={() => nav("review")} />
          </motion.div>
        )}
        {page === "review" && (
          <motion.div key="review" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
            <StepReview onNext={() => nav("validate-choice")} onBack={() => nav("step2")} />
          </motion.div>
        )}
        {page === "validate-choice" && (
          <motion.div key="validate-choice" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
            <StepValidateChoice onValidate={() => nav("validating")} onSkip={() => nav("tech-stack")} onBack={() => nav("review")} />
          </motion.div>
        )}
        {page === "validating" && (
          <motion.div key="validating" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
            <StepValidating onComplete={() => nav("validation-results")} />
          </motion.div>
        )}
        {page === "validation-results" && (
          <motion.div key="validation-results" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
            <StepValidationResults onNext={() => nav("tech-stack")} onBack={() => nav("validate-choice")} />
          </motion.div>
        )}
        {page === "tech-stack" && (
          <motion.div key="tech-stack" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
            <StepTechStack selected={techStack} onChange={setTechStack} onNext={() => nav("methodology")} onBack={() => nav("validation-results")} />
          </motion.div>
        )}
        {page === "methodology" && (
          <motion.div key="methodology" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
            <StepMethodology methodology={methodology} onChange={setMethodology} onNext={() => nav("step3")} onBack={() => nav("tech-stack")} />
          </motion.div>
        )}
        {page === "step3" && (
          <motion.div key="step3" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
            <Step3Research selected={researchTypes} onChange={setResearchTypes} onNext={() => nav("step4")} onBack={() => nav("methodology")} />
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
