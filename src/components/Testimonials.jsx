const TESTIMONIALS = [
  {
    quote:
      "We ran the free scan expecting nothing much. It flagged R280,000 in exposure across two areas we hadn't even thought about. Took less than 90 seconds.",
    name: "Operations Manager",
    role: "Online fashion store, New York, USA",
  },
  {
    quote:
      "The 6-area breakdown was more specific than I expected from a free tool — it pointed straight at our refund process as the biggest risk.",
    name: "eCommerce Director",
    role: "Electronics retailer, Dubai, UAE",
  },
  {
    quote:
      "No card required, no sales call first — just a straight report we could show our finance team the same day. That's what got us to act.",
    name: "CFO",
    role: "Mid-market retailer, Cape Town, South Africa",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <p className="section-label">WHAT BUSINESSES FOUND IN THEIR SCAN</p>
      <div className="testimonials-grid">
        {TESTIMONIALS.map((t) => (
          <div key={t.name + t.role} className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="testimonial-quote">"{t.quote}"</p>
            <p className="testimonial-name">{t.name}</p>
            <p className="testimonial-role">{t.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}