import React, { useState } from 'react';
import './App.css';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import SummarySection from './components/SummarySection';
import LiteratureReview from './components/LiteratureReview';
import ResearchGaps from './components/ResearchGaps';
import Analytics from './components/Analytics';
import LoadingScreen from './components/LoadingScreen';

const API_BASE = 'https://research-paper-gap-finder.onrender.com';

export default function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [activeTab, setActiveTab] = useState('upload');

  const loadingMessages = [
    'Parsing research papers...',
    'Analyzing methodologies...',
    'Generating literature review...',
    'Finding research gaps...',
    'Creating research insights...',
    'Synthesizing findings...',
  ];

  const handleUpload = async (file) => {
    setLoading(true);
    setLoadingMessage('Extracting and summarizing paper...');
    const formData = new FormData();
    formData.append('file', file);
    try {
  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData,
  });

  console.log("Status:", res.status);
  console.log("OK:", res.ok);

  const data = await res.json();
  console.log(data);

  if (!res.ok) {
    throw new Error(data.error || "Upload failed");
  }

  setUploadedFiles((prev) => [...prev, data.filename]);

  setSummaries((prev) => [
    ...prev,
    {
      filename: data.filename,
      summary: data.summary,
    },
  ]);

  setActiveTab("summary");

} catch (err) {
  console.error(err);
  alert(err.message);
}
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeAll = async () => {
    if (uploadedFiles.length < 1) {
      alert('Please upload at least one paper first.');
      return;
    }
    setLoading(true);
    let msgIdx = 0;
    setLoadingMessage(loadingMessages[0]);
    const interval = setInterval(() => {
      msgIdx = (msgIdx + 1) % loadingMessages.length;
      setLoadingMessage(loadingMessages[msgIdx]);
    }, 2000);
    try {
      const res = await fetch(`${API_BASE}/analyze-all`, { method: 'POST' });
      const data = await res.json();
      setAnalysisResult(data);
      setActiveTab('analysis');
    } catch (err) {
      alert('Analysis failed. Make sure the backend is running.');
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  // ── ADDED: removes file from both state arrays ──────────────
  const handleDelete = (filename) => {
    setUploadedFiles((prev) => prev.filter((f) => f !== filename));
    setSummaries((prev) => prev.filter((s) => s.filename !== filename));
  };
  // ────────────────────────────────────────────────────────────

  return (
    <div className="app">
      {/* Background effects */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-grid" />

      {loading && <LoadingScreen message={loadingMessage} />}

      <Hero />

      {/* Nav Tabs */}
      <nav className="tab-nav">
        <div className="tab-nav-inner">
          {['upload', 'summary', 'analysis'].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'upload' && '📄 Upload'}
              {tab === 'summary' && `📋 Summaries ${summaries.length > 0 ? `(${summaries.length})` : ''}`}
              {tab === 'analysis' && '🔬 Analysis'}
            </button>
          ))}
        </div>
      </nav>

      <main className="main-content">
        {activeTab === 'upload' && (
          <UploadSection
            onUpload={handleUpload}
            onAnalyzeAll={handleAnalyzeAll}
            uploadedFiles={uploadedFiles}
            onDelete={handleDelete} // ── ADDED ──
          />
        )}
        {activeTab === 'summary' && (
          <SummarySection summaries={summaries} />
        )}
        {activeTab === 'analysis' && analysisResult && (
          <>
            <Analytics result={analysisResult} />
            <LiteratureReview review={analysisResult.literature_review} />
            <ResearchGaps gaps={analysisResult.research_gaps} />
          </>
        )}
        {activeTab === 'analysis' && !analysisResult && (
          <div className="empty-state">
            <div className="empty-icon">🔬</div>
            <h3>No Analysis Yet</h3>
            <p>Upload papers and click <strong>Analyze All Papers</strong> to generate insights.</p>
            <button className="btn-primary" onClick={() => setActiveTab('upload')}>
              Go to Upload
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Research Paper Gap Finder &nbsp;·&nbsp; AI-Powered Research Analysis</p>
      </footer>
    </div>
  );
}
