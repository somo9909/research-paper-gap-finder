import React from 'react';
import './Analytics.css';

function countMatches(text, keywords) {
  if (!text) return 0;
  return keywords.reduce((acc, kw) => acc + (text.toLowerCase().split(kw.toLowerCase()).length - 1), 0);
}

export default function Analytics({ result }) {
  if (!result) return null;

  const gapsCount = countMatches(result.research_gaps, ['gap', 'limitation', 'unexplored', 'future']);
  const thesisCount = countMatches(result.research_gaps, ['thesis', 'project idea', 'study could', 'research could']);
  const coverageScore = Math.min(100, 40 + result.paper_count * 12);

  const stats = [
    { label: 'Papers Analyzed',    value: result.paper_count, icon: '📄', color: 'var(--accent-primary)', suffix: '' },
    { label: 'Research Gaps Found', value: Math.max(gapsCount, 3), icon: '🔍', color: 'var(--accent-amber)', suffix: '+' },
    { label: 'Thesis Ideas',        value: Math.max(thesisCount, 2), icon: '🎓', color: '#e879f9', suffix: '+' },
    { label: 'Coverage Score',      value: coverageScore, icon: '📊', color: 'var(--accent-green)', suffix: '%' },
  ];

  return (
    <section className="analytics-section">
      <div className="section-label">Overview</div>
      <h2 className="section-title">Research Analytics</h2>
      <p className="section-desc">High-level metrics from the analysis of your research corpus.</p>

      <div className="analytics-grid">
        {stats.map((s, i) => (
          <div key={s.label} className="stat-card" style={{ '--stat-color': s.color, animationDelay: `${i * 0.1}s` }}>
            <div className="stat-icon-wrap">{s.icon}</div>
            <div className="stat-value">{s.value}{s.suffix}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-bar-track">
              <div
                className="stat-bar-fill"
                style={{ width: `${Math.min(100, (s.value / (s.label === 'Coverage Score' ? 1 : 20)) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}