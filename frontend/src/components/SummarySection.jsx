import React, { useState } from 'react';
import './SummarySection.css';

const FIELDS = [
  { key: 'Research Objective', icon: '🎯', color: 'var(--accent-primary)' },
  { key: 'Methodology',        icon: '⚙️', color: 'var(--accent-secondary)' },
  { key: 'Key Findings',       icon: '💡', color: 'var(--accent-green)' },
  { key: 'Limitations',        icon: '⚠️', color: 'var(--accent-amber)' },
];

function parseSummary(raw) {
  if (!raw) return {};
  
  // Clean up leftover ** markers like **3. or **4.
  const cleaned = raw.replace(/\*\*\d+\.\s*/g, '').replace(/\*\*/g, '');
  
  const result = {};
  const allKeys = FIELDS.map(f => f.key);

  allKeys.forEach((key, idx) => {
    // Find where this key starts
    const keyIndex = cleaned.toLowerCase().indexOf(key.toLowerCase());
    if (keyIndex === -1) {
      result[key] = '';
      return;
    }

    // Content starts after the key + any colon/dash/newline
    const afterKey = cleaned.slice(keyIndex + key.length).replace(/^[\s:*\-–]+/, '');

    // Find where the NEXT key starts to know where to stop
    let endIndex = afterKey.length;
    for (let i = idx + 1; i < allKeys.length; i++) {
      const nextPos = afterKey.toLowerCase().indexOf(allKeys[i].toLowerCase());
      if (nextPos !== -1 && nextPos < endIndex) {
        endIndex = nextPos;
      }
    }

    result[key] = afterKey.slice(0, endIndex).trim();
  });

  return result;
}

export default function SummarySection({ summaries }) {
  const [active, setActive] = useState(0);

  if (!summaries.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📋</div>
        <h3>No Summaries Yet</h3>
        <p>Upload a paper to generate its AI summary.</p>
      </div>
    );
  }

  // Clamp active index in case a paper was deleted
  const safeActive = Math.min(active, summaries.length - 1);
  const current = summaries[safeActive];
  const parsed = parseSummary(current.summary);

  return (
    <section className="summary-section">
      <div className="section-label">AI Summaries</div>
      <h2 className="section-title">Paper Summaries</h2>
      <p className="section-desc">Structured breakdown of each uploaded research paper.</p>

      {summaries.length > 1 && (
        <div className="paper-tabs">
          {summaries.map((s, i) => (
            <button
              key={i}
              className={`paper-tab ${safeActive === i ? 'active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="paper-tab-num">{i + 1}</span>
              {s.filename.length > 20 ? s.filename.slice(0, 20) + '…' : s.filename}
            </button>
          ))}
        </div>
      )}

      <div className="summary-grid">
        {FIELDS.map(({ key, icon, color }) => (
          <div key={key} className="summary-card" style={{ '--card-accent': color }}>
            <div className="summary-card-header">
              <span className="summary-icon">{icon}</span>
              <span className="summary-card-title">{key}</span>
            </div>
            <p className="summary-card-body">
              {parsed[key] || <span style={{ color: 'var(--text-muted)' }}>Not found in summary</span>}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}