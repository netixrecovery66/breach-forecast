import { useState } from "react";

const REVENUE_OPTIONS = [
  { value: "under-10k", label: "Under $10,000/month" },
  { value: "10k-50k", label: "$10,000 - $50,000/month" },
  { value: "50k-200k", label: "$50,000 - $200,000/month" },
  { value: "200k-1m", label: "$200,000 - $1,000,000/month" },
  { value: "over-1m", label: "Over $1,000,000/month" },
];

const INDUSTRY_OPTIONS = [
  "eCommerce / Online Retail",
  "Fashion & Apparel",
  "Health & Beauty",
  "Food & Beverage",
  "Electronics & Tech",
  "Home & Furniture",
  "Marketplace / Multi-vendor",
  "Subscription Box",
  "Digital Products / Downloads",
  "SaaS / Software",
  "Automotive & Parts",
  "Sporting Goods & Outdoor",
  "Toys & Baby Products",
  "Jewelry & Accessories",
  "Pet Products",
  "Travel & Hospitality",
  "Education / Online Courses",
  "Financial Services / Fintech",
  "Real Estate",
  "Professional Services",
  "Other",
];

export default function ScanForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    companyName: "",
    siteUrl: "",
    email: "",
    industry: "",
    revenueRange: "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const newErrors = {};
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.siteUrl.trim()) newErrors.siteUrl = "Website URL is required";
    if (!formData.email.trim() || !formData.email.includes("@"))
      newErrors.email = "A valid email is required";
    if (!formData.industry) newErrors.industry = "Please select an industry";
    if (!formData.revenueRange) newErrors.revenueRange = "Please select a revenue range";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    onSubmit(formData);
  }

  return (
    <div className="scan-card">
      <h2>Run your free scan</h2>
      <p className="scan-card-subtext">
        Fill in your business details and we'll scan across all 6 risk areas immediately.
      </p>

      <form className="scan-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="companyName">Company Name</label>
            <input
              id="companyName"
              type="text"
              placeholder="e.g. Aurora Home Goods"
              value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
            />
            {errors.companyName && <span className="field-error">{errors.companyName}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="siteUrl">Website URL</label>
            <input
              id="siteUrl"
              type="text"
              placeholder="e.g. aurorahome.co.za"
              value={formData.siteUrl}
              onChange={(e) => handleChange("siteUrl", e.target.value)}
            />
            {errors.siteUrl && <span className="field-error">{errors.siteUrl}</span>}
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="industry">Industry</label>
            <select
              id="industry"
              value={formData.industry}
              onChange={(e) => handleChange("industry", e.target.value)}
            >
              <option value="">Select industry</option>
              {INDUSTRY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.industry && <span className="field-error">{errors.industry}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="revenueRange">Monthly Revenue</label>
            <select
              id="revenueRange"
              value={formData.revenueRange}
              onChange={(e) => handleChange("revenueRange", e.target.value)}
            >
              <option value="">Select range</option>
              {REVENUE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.revenueRange && <span className="field-error">{errors.revenueRange}</span>}
          </div>
        </div>

        <button type="submit" className="scan-submit">
          Run My Free Scan →
        </button>
        <p className="scan-disclaimer">100% free. No credit card needed.</p>
      </form>
    </div>
  );
}