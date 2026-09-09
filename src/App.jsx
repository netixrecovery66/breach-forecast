import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ScanForm from "./components/ScanForm";
import ScanningScreen from "./components/ScanningScreen";
import RiskBrief from "./components/RiskBrief";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import { generateRiskBrief } from "./lib/riskEngine";
import "./App.css";

export default function App() {
  const [stage, setStage] = useState("form"); // "form" | "scanning" | "report"
  const [formData, setFormData] = useState(null);
  const [brief, setBrief] = useState(null);

  function handleFormSubmit(data) {
    setFormData(data);
    setStage("scanning");
  }

  function handleScanComplete() {
    let domain = "";
    try {
      domain = new URL(
        formData.siteUrl.startsWith("http") ? formData.siteUrl : `https://${formData.siteUrl}`
      ).hostname;
    } catch {
      domain = formData.siteUrl;
    }

    const result = generateRiskBrief({
      companyName: formData.companyName,
      domain,
      revenueRange: formData.revenueRange,
      industry: formData.industry,
    });

    setBrief(result);
    setStage("report");
  }

  function handleRunAnother() {
    setFormData(null);
    setBrief(null);
    setStage("form");
  }

  return (
    <div className="app-shell">
      <Header />

      <main className="app-main">
        {stage === "form" && (
          <>
            <Hero />
            <ScanForm onSubmit={handleFormSubmit} />
            <Testimonials />
          </>
        )}

        {stage === "scanning" && <ScanningScreen onComplete={handleScanComplete} />}

        {stage === "report" && (
          <RiskBrief formData={formData} brief={brief} onRunAnother={handleRunAnother} />
        )}
      </main>

      <Footer />
    </div>
  );
}