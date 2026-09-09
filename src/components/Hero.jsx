export default function Hero() {
  return (
    <section className="hero-section">
      <p className="hero-eyebrow">— FREE BUSINESS RISK SCAN</p>
      <h1 className="hero-title">
        Find out exactly where your business is <span className="highlight">losing money.</span>
      </h1>
      <p className="hero-subtext">
        Our AI scans your business across 6 risk areas in under 90 seconds — and shows you
        the value of what's at risk, in your currency, for free.
      </p>
      <div className="hero-stats">
        <div className="hero-stat">
          <div className="stat-value">6</div>
          <div className="stat-label">Risk areas covered</div>
        </div>
        <div className="hero-stat">
          <div className="stat-value">90s</div>
          <div className="stat-label">Scan duration</div>
        </div>
        <div className="hero-stat">
          <div className="stat-value">Free</div>
          <div className="stat-label">No credit card needed</div>
        </div>
      </div>
    </section>
  );
}