import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen({ message }) {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const i = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="loading-overlay">
      <div className="loading-card">
        <div className="loading-rings">
          <div className="ring ring-1" />
          <div className="ring ring-2" />
          <div className="ring ring-3" />
          <div className="loading-core">AI</div>
        </div>
        <h2 className="loading-title">{message}{dots}</h2>
        <p className="loading-sub">AI is analyzing your research papers</p>
        <div className="loading-bar-track">
          <div className="loading-bar-fill" />
        </div>
      </div>
    </div>
  );
}