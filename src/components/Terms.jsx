import React from 'react';

function Terms({ onBack }) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', color: '#e5e7eb', lineHeight: 1.6 }}>
      <button
        onClick={onBack}
        style={{
          marginBottom: '24px',
          padding: '8px 16px',
          background: 'transparent',
          border: '1px solid #4b5563',
          borderRadius: '6px',
          color: '#e5e7eb',
          cursor: 'pointer'
        }}
      >
        ← Back
      </button>

      <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Terms & Refund Policy</h1>
      <p style={{ color: '#9ca3af', marginBottom: '32px' }}>Last updated: September 2026</p>

      <h2 style={{ fontSize: '20px', marginTop: '28px', marginBottom: '10px' }}>1. About This Tool</h2>
      <p>
        The Breach Forecast & ROI Report is a free diagnostic tool provided by Netix Recovery.
        It generates an estimated risk exposure report based on the information you submit
        (company name, industry, revenue range, tech stack, and website URL). This tool is
        provided at no cost and requires no payment to use.
      </p>

      <h2 style={{ fontSize: '20px', marginTop: '28px', marginBottom: '10px' }}>2. No Payment, No Refunds</h2>
      <p>
        Because this scan tool is completely free, there is no payment taken and therefore
        no refund policy applies to it. Any paid products referenced from this app (such as
        the Fix-It Guide or Netix Recovery's full recovery service) are governed by their own
        separate terms, which are presented at the point of purchase.
      </p>

      <h2 style={{ fontSize: '20px', marginTop: '28px', marginBottom: '10px' }}>3. Accuracy of Results</h2>
      <p>
        The figures shown in your report are estimates generated from the details you provide
        and general industry risk patterns. They are for informational purposes only and should
        not be treated as a certified security audit, legal advice, or a guarantee of actual
        financial exposure. Netix Recovery makes no warranty as to the precision of these figures.
      </p>

      <h2 style={{ fontSize: '20px', marginTop: '28px', marginBottom: '10px' }}>4. Data Use Policy</h2>
      <p>
        Information you submit through this form (company name, email, industry, revenue range,
        tech stack, and any uploaded scan report) is used solely to generate your report and,
        where you've provided an email, to follow up with relevant Netix Recovery services.
        We do not sell your data to third parties. You may request deletion of your submitted
        data at any time by contacting us below.
      </p>

      <h2 style={{ fontSize: '20px', marginTop: '28px', marginBottom: '10px' }}>5. Contact</h2>
      <p>
        For questions about this tool, your data, or Netix Recovery's services, contact us at{' '}
        <a href="mailto:netixashton@gmail.com" style={{ color: '#60a5fa' }}>netixashton@gmail.com</a>.
      </p>
    </div>
  );
}

export default Terms;
