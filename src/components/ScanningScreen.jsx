import { useEffect, useState } from "react";

const SCAN_STEPS = [
  "Analysing Fraud & Abuse signals",
  "Mapping Digital Risk exposure",
  "Calculating Revenue Leakage",
  "Reviewing Operational Weaknesses",
  "Checking Incident Readiness",
  "Running Digital Forensic sweep",
];

const STEP_DELAY_MS = 500;

export default function ScanningScreen({ onComplete }) {
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    if (completedSteps >= SCAN_STEPS.length) {
      const finishTimer = setTimeout(onComplete, 500);
      return () => clearTimeout(finishTimer);
    }
    const timer = setTimeout(() => {
      setCompletedSteps((prev) => prev + 1);
    }, STEP_DELAY_MS);
    return () => clearTimeout(timer);
  }, [completedSteps, onComplete]);

  return (
    <div className="scanning-screen">
      <p className="scanning-intro">Our AI is analysing your risk profile across all 6 areas.</p>
      <ul className="scanning-list">
        {SCAN_STEPS.map((step, i) => {
          const status = i < completedSteps ? "done" : i === completedSteps ? "active" : "pending";
          return (
            <li key={step} className={`scan-step ${status}`}>
              {status === "done" ? "✓" : "●"} {step}
            </li>
          );
        })}
      </ul>
    </div>
  );
}