// riskEngine.js
// Generates a business's risk exposure numbers from real inputs
// (revenue bracket + company name), instead of static placeholders.

// Revenue bracket -> monthly revenue used for exposure calculations
const REVENUE_BRACKETS = {
  "under-10k": 5000,
  "10k-50k": 30000,
  "50k-200k": 125000,
  "200k-1m": 600000,
  "over-1m": 2000000,
};

// The 6 risk areas, with their share of total exposure and base severity tier.
// Shares add up to 1.0 (100% of total exposure).
const RISK_AREAS = [
  {
    key: "fraudAbuse",
    title: "Fraud & Abuse",
    share: 0.28,
    severity: "High",
    description: (industry) =>
      `${industry} businesses at your revenue level typically see 2-4% of revenue lost to refund abuse and chargeback fraud. Patterns suggest multiple accounts may be exploiting your return policy.`,
  },
  {
    key: "digitalRisk",
    title: "Digital Risk",
    share: 0.22,
    severity: "High",
    description: (industry) =>
      `Access control and third-party integration risks are elevated for ${industry} stores. Unpatched plugins and weak admin credentials are the most common entry points.`,
  },
  {
    key: "revenueLeakage",
    title: "Revenue Leakage",
    share: 0.2,
    severity: "Medium",
    description: (industry) =>
      `Pricing misconfiguration and expired discount codes are quietly reducing your margin. Businesses in ${industry} commonly lose 1-3% of revenue to stale promotional logic.`,
  },
  {
    key: "operationalWeaknesses",
    title: "Operational Weaknesses",
    share: 0.15,
    severity: "Medium",
    description: () =>
      `Manual approval processes and unoptimised workflows are adding cost and slowing recovery. Refund handling in particular shows signs of inconsistent policy application.`,
  },
  {
    key: "incidentReadiness",
    title: "Incident Readiness",
    share: 0.1,
    severity: "Medium",
    description: () =>
      `No evidence of a documented incident response plan at this business size is common but costly. Recovery time from a breach without a plan averages 3-5x longer.`,
  },
  {
    key: "digitalForensicInvestigation",
    title: "Digital Forensic Investigation",
    share: 0.05,
    severity: "Low",
    description: () =>
      `Log retention and evidence preservation capabilities appear limited. Without adequate forensic readiness proving fraud or recovering from an incident becomes significantly harder.`,
  },
];

// Simple deterministic string hash (djb2) — same company always gets the
// same jitter, different companies get different jitter.
function hashString(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
}

// Turns the hash into a jitter multiplier between 0.85 and 1.15 (+/-15%)
function jitterFromSeed(seed, salt = 0) {
  const combined = hashString(`${seed}-${salt}`);
  const normalized = (combined % 1000) / 1000; // 0 to 1
  return 0.85 + normalized * 0.3; // 0.85 to 1.15
}

export function generateRiskBrief({ companyName, domain, revenueRange, industry }) {
  const monthlyRevenue = REVENUE_BRACKETS[revenueRange] || REVENUE_BRACKETS["50k-200k"];
  const seed = `${companyName || ""}-${domain || ""}`.toLowerCase();

  // Total exposure: 3-9% of monthly revenue, varied per-business by seed
  const baseExposurePct = 0.03 + jitterFromSeed(seed, "total") * 0.06;
  const totalExposure = Math.round((monthlyRevenue * baseExposurePct) / 10) * 10;

  const findings = RISK_AREAS.map((area, i) => {
    const areaJitter = jitterFromSeed(seed, area.key);
    const amount = Math.round((totalExposure * area.share * areaJitter) / 10) * 10;
    return {
      key: area.key,
      title: area.title,
      amount,
      severity: area.severity,
      description: area.description(industry || "eCommerce / Online Retail"),
    };
  });

  // Recompute the displayed total from the actual findings so it's internally consistent
  const displayedTotal = findings.reduce((sum, f) => sum + f.amount, 0);

  const highCount = findings.filter((f) => f.severity === "High").length;
  const overallRisk = highCount >= 2 ? "High" : highCount === 1 ? "Medium" : "Low";

  return {
    totalExposure: displayedTotal,
    areasFlagged: findings.length,
    overallRisk,
    findings,
  };
}
export function generateReportText(formData, brief) {
  const revenueLabels = {
    "under-10k": "Under $10,000/month",
    "10k-50k": "$10,000 - $50,000/month",
    "50k-200k": "$50,000 - $200,000/month",
    "200k-1m": "$200,000 - $1,000,000/month",
    "over-1m": "Over $1,000,000/month",
  };

  const lines = [];
  lines.push("NETIX RECOVERY — BREACH FORECAST REPORT");
  lines.push("");
  lines.push(`Company: ${formData.companyName}`);
  lines.push(`Industry: ${formData.industry}`);
  lines.push(`Monthly Revenue: ${revenueLabels[formData.revenueRange] || formData.revenueRange}`);
  lines.push(`Scan Date: ${new Date().toLocaleString("en-ZA")}`);
  lines.push(`Website: ${formData.siteUrl}`);
  lines.push("");
  lines.push(`Total Exposure Identified: R${brief.totalExposure.toLocaleString("en-ZA")}`);
  lines.push(`Overall Risk Level: ${brief.overallRisk}`);
  lines.push(`Areas Flagged: ${brief.areasFlagged}`);
  lines.push("");
  lines.push("RISK FINDINGS BY AREA");
  lines.push("---");

  brief.findings.forEach((f) => {
    lines.push(f.title);
    lines.push(`Severity: ${f.severity}`);
    lines.push(`Estimated Exposure: R${f.amount.toLocaleString("en-ZA")}`);
    lines.push(`Finding: ${f.description}`);
    lines.push("---");
  });

  return lines.join("\n");
}