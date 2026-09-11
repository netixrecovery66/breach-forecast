export default function Header({ onTermsClick }) {
  return (
    <header className="site-header">
      <span className="app-logo">● NETIX — BREACH FORECAST</span>
      <nav className="header-nav">
        <a href="https://wa.me/27627391320" target="_blank" rel="noreferrer" className="nav-btn nav-btn-whatsapp">WhatsApp</a>
        <a href="mailto:netixashton@gmail.com" className="nav-btn nav-btn-outline">Contact Us</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onTermsClick(); }} className="nav-btn nav-btn-ghost">Terms &amp; Refund Policy</a>
      </nav>
    </header>
  );
}