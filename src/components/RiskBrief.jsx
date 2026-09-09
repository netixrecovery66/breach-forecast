const SEVERITY_CLASS = {
  High: "severity-high",
  Medium: "severity-medium",
  Low: "severity-low",
};

function formatCurrency(amount) {
  return `R${amount.toLocaleString("en-ZA")}`;
}

export default function RiskBrief({ formData, brief, onRunAnother }) {
  const scannedAt = new Date().toLocaleString("en-ZA", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <div className="risk-brief">
      <p className="brief-eyebrow">EXECUTIVE RISK BRIEF · NETIX — BREACH FORECAST</p>
      <h1>{formData.companyName} — Risk Brief</h1>
      <p className="brief-meta">
        Scanned {scannedAt}, {formData.industry} · {
          {
            "under-10k": "Under $10,000/month",
            "10k-50k": "$10,000 - $50,000/month",
            "50k-200k": "$50,000 - $200,000/month",
            "over-200k": "Over $200,000/month",
          }[formData.revenueRange]
        } · {formData.siteUrl}
      </p>

      <div className="brief-summary">
        <div className="summary-card">
          <div className="summary-value exposure">{formatCurrency(brief.totalExposure)}</div>
          <div className="summary-label">Total exposure identified</div>
        </div>
        <div className="summary-card">
          <div className="summary-value">{brief.areasFlagged}</div>
          <div className="summary-label">Areas flagged</div>
        </div>
        <div className="summary-card">
          <div className={`summary-value ${SEVERITY_CLASS[brief.overallRisk]}`}>
            {brief.overallRisk}
          </div>
          <div className="summary-label">Overall risk level</div>
        </div>
      </div>

      <p className="section-label">RISK FINDINGS BY AREA</p>

      <div className="findings-list">
        {brief.findings.map((f) => (
          <div key={f.key} className={`finding-card ${SEVERITY_CLASS[f.severity]}`}>
            <div className="finding-header">
              <h3>{f.title}</h3>
              <div className="finding-amount">
                {formatCurrency(f.amount)}
                <span className={`severity-badge ${SEVERITY_CLASS[f.severity]}`}>
                  {f.severity.toUpperCase()}
                </span>
              </div>
            </div>
            <p className="finding-description">{f.description}</p>
          </div>
        ))}
      </div>

      <div className="next-steps">
        <h3>What happens next</h3>
        <p>
          Download your report to keep a record of these findings. Then head to our Fix-It
          Guide — your personalised step-by-step plan to fix every flagged issue.
        </p>
        <button className="download-btn">↓ Download Report</button>
        <button className="fixit-btn">→ Get my Fix-It Plan — $147</button>
        <button className="rerun-link" onClick={onRunAnother}>
          Run another scan
        </button>
      </div>
    </div>
  );
}