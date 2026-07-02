import React, { useState, useRef } from 'react';
import './UploadSection.css';

const API_BASE = 'https://research-paper-gap-finder.onrender.com';

export default function UploadSection({ onUpload, onAnalyzeAll, uploadedFiles, onDelete }) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingFile, setDeletingFile] = useState(null);
  const fileRef = useRef();

  const handleFile = async (file) => {
    if (!file || file.type !== 'application/pdf') {
      alert('Please upload a PDF file.');
      return;
    }
    setUploading(true);
    await onUpload(file);
    setUploading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDelete = async (filename) => {
    setDeletingFile(filename);
    try {
      await fetch(`${API_BASE}/delete/${encodeURIComponent(filename)}`, {
        method: 'DELETE',
      });
      onDelete(filename);
    } catch (err) {
      alert('Delete failed. Make sure the backend supports DELETE /delete/{filename}');
    } finally {
      setDeletingFile(null);
    }
  };

  return (
    <section className="upload-section">
      <div className="section-label">Step 1</div>
      <h2 className="section-title">Upload Research Papers</h2>
      <p className="section-desc">
        Upload one or more PDF papers. Each will be summarized individually by the AI.
      </p>

      <div
        className={`drop-zone ${dragOver ? 'drag-over' : ''} ${uploading ? 'uploading' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current.click()}
      >
        <input
          ref={fileRef}
          type="file"
          accept=".pdf"
          style={{ display: 'none' }}
          onChange={(e) => handleFile(e.target.files[0])}
        />
        <div className="drop-icon">
          {uploading ? (
            <div className="spinner" />
          ) : (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="12" fill="rgba(0,212,255,0.08)" />
              <path d="M24 14L24 30M24 14L18 20M24 14L30 20" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 34H34" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </div>
        <p className="drop-title">
          {uploading ? 'Processing paper...' : 'Drop your PDF here'}
        </p>
        <p className="drop-sub">
          {uploading ? 'AI is extracting and summarizing' : 'or click to browse files'}
        </p>
        {!uploading && <div className="drop-tag">PDF only · Max 50MB</div>}
      </div>

      {uploadedFiles.length > 0 && (
        <div className="uploaded-list">
          <div className="uploaded-header">
            <span className="uploaded-count">
              {uploadedFiles.length} paper{uploadedFiles.length > 1 ? 's' : ''} uploaded
            </span>
          </div>

          {uploadedFiles.map((f, i) => (
            <div key={i} className="uploaded-item">
              <div className="uploaded-pdf-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="var(--accent-rose)" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="var(--accent-rose)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="uploaded-name">{f}</span>
              <span className="uploaded-status">✓ Summarized</span>
              <button
                className="delete-btn"
                onClick={(e) => { e.stopPropagation(); handleDelete(f); }}
                disabled={deletingFile === f}
                title="Delete this paper"
              >
                {deletingFile === f ? (
                  <span className="delete-spinner" />
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="analyze-cta">
          <div className="cta-info">
            <p>Ready to generate a full literature review and identify research gaps?</p>
          </div>
          <button className="btn-analyze" onClick={onAnalyzeAll}>
            <span>🔬</span>
            Analyze All Papers
          </button>
        </div>
      )}
    </section>
  );
}   
