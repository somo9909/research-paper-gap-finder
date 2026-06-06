import React from 'react';
import './ResearchGaps.css';

const GAP_CATEGORIES = [
  { key: 'Common Themes',              icon: '🔗', color: '#00d4ff'  },
  { key: 'Contradictions',             icon: '⚡', color: '#ff4d6d'  },
  { key: 'Research Gaps',              icon: '🕳️', color: '#ffaa00'  },
  { key: 'Underexplored Areas',        icon: '🌐', color: '#7c3aed'  },
  { key: 'Future Research Directions', icon: '🚀', color: '#00ff88'  },
  { key: 'Thesis',                     icon: '🎓', color: '#e879f9'  },
  { key: 'Project Ideas',              icon: '💡', color: '#f97316'  },
];

function parseSections(text) {
  if (!text) return [];
  const sectionRegex = /\*\*(?:\d+\.\s*)?(.*?)\*\*/g;
  const sections = [];
  let lastIndex = 0;
  let lastTitle = null;
  let match;

  while ((match = sectionRegex.exec(text)) !== null) {
    if (lastTitle !== null) {
      sections.push({ title: lastTitle, content: text.slice(lastIndex, match.index).trim() });
    }
    lastTitle = match[1].trim();
    lastIndex = match.index + match[0].length;
  }
  if (lastTitle !== null) {
    sections.push({ title: lastTitle, content: text.slice(lastIndex).trim() });
  }
  if (sections.length === 0 && text.trim()) {
    sections.push({ title: null, content: text.trim() });
  }
  return sections;
}

function getMeta(title) {
  if (!title) return { icon: '📌', color: '#00d4ff' };
  const found = GAP_CATEGORIES.find(g =>
    title.toLowerCase().includes(g.key.toLowerCase())
  );
  return found || { icon: '📌', color: '#00d4ff' };
}

function BulletList({ text, color }) {
  if (!text) return <p className="gap-empty">—</p>;
  const lines = text
    .split('\n')
    .map(l => l.replace(/^[-*•\d.]\s*/, '').trim())
    .filter(Boolean);
  if (lines.length <= 1) return <p className="gap-text">{text}</p>;
  return (
    <ul className="gap-bullets">
      {lines.map((l, i) => (
        <li key={i} style={{ '--bullet-color': color }}>{l}</li>
      ))}
    </ul>
  );
}

export default function ResearchGaps({ gaps }) {
  if (!gaps) return null;
  const sections = parseSections(gaps);

  return (
    <section className="gaps-section">
      <div className="section-label">AI Analysis</div>
      <h2 className="section-title">Research Gaps & Opportunities</h2>
      <p className="section-desc">
        Identified gaps, contradictions, and future directions from your research corpus.
      </p>

      <div className="gaps-grid">
        {sections.map((sec, i) => {
          const { icon, color } = getMeta(sec.title);
          return (
            <div
              key={i}
              className="gap-card"
              style={{ '--gap-color': color, animationDelay: `${i * 0.08}s` }}
            >
              <div className="gap-card-top">
                <div className="gap-icon-wrap" style={{ background: `${color}18` }}>
                  <span className="gap-icon">{icon}</span>
                </div>
                <h3 className="gap-title" style={{ color }}>{sec.title || 'Overview'}</h3>
              </div>
              <div className="gap-body">
                <BulletList text={sec.content} color={color} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}