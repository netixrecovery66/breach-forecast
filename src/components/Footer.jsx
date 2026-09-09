export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="app-logo">● 🛡 Netix Recovery</span>
          <p>
            We help eCommerce businesses identify and recover losses from refund abuse,
            chargeback fraud, payment manipulation, and policy exploitation.
          </p>
        </div>

        <div className="footer-links">
          <p className="footer-heading">OUR TOOLS</p>
          <a href="/">Breach Forecast App</a>
          <a href="/fix-it-guide">Fix-It Guide</a>
          <a href="/netix-shield">Netix Shield (Coming Soon)</a>
          <a href="/terms">Terms &amp; Refund Policy</a>
        </div>

        <div className="footer-contact">
          <p className="footer-heading">CONTACT</p>
          <a href="https://wa.me/27627391320" target="_blank" rel="noreferrer">💬 +27 62 739 1320</a>
          <a href="mailto:netixrecovery66@gmail.com">✉ Contact Us</a>
          <a href="#">📅 Book a Consultation</a>
          <span>📍 Cape Town, South Africa</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Netix Recovery. All rights reserved.</span>
        <div className="footer-bottom-btns">
          <a href="https://wa.me/27627391320" target="_blank" rel="noreferrer" className="nav-btn nav-btn-whatsapp">WhatsApp</a>
          <a href="mailto:netixashton@gmail.com" className="nav-btn nav-btn-outline">Contact Us</a>
          <a href="/terms" className="nav-btn nav-btn-ghost">Terms &amp; Refund Policy</a>
        </div>
      </div>
    </footer>
  );
}