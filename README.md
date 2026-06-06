# 🔬 Research Paper Gap Finder

> AI-powered academic research assistant that analyzes papers, generates literature reviews, and discovers research gaps.

![App Preview](frontend/public/homepage.png)

---

## ✨ Features

- 📄 **PDF Upload** — Drag & drop research papers in PDF format
- 🤖 **AI Summarization** — Automatically extracts Research Objective, Methodology, Key Findings, and Limitations
- 📚 **Literature Review** — Generates a complete structured academic literature review
- 🕳️ **Gap Analysis** — Identifies research gaps, contradictions, underexplored areas
- 🚀 **Future Directions** — Suggests thesis ideas and future research directions
- 📊 **Analytics Dashboard** — Visual stats on papers analyzed, gaps found, and coverage score
- 🗑️ **File Management** — Delete uploaded papers individually

---

## 🖼️ Screenshots

| Homepage | Upload |
|----------|--------|
| ![Homepage](frontend/public/homepage.png) | ![Upload](frontend/public/upload.png) |

---

## 🛠️ Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | React + Vite + CSS      |
| Backend   | FastAPI (Python)        |
| PDF Parse | PyPDF                   |

---

## 📁 Project Structure
```
Research_Paper_Gap_Finder/
│
├── backend/
│   ├── app.py                      # FastAPI server
│   ├── config.py                   # Groq API key
│   ├── uploads/                    # Uploaded PDFs stored here
│   └── services/
│       ├── pdf_parser.py           # Extracts text from PDFs
│       ├── summarizer.py           # Generates paper summaries
│       ├── gap_finder.py           # Finds research gaps
│       └── literature_review.py    # Generates literature review
│
└── frontend/
    ├── public/
    │   ├── homepage.png
    │   └── upload.png
    └── src/
        ├── App.jsx
        ├── App.css
        ├── index.js
        ├── index.css
        └── components/
            ├── Hero.jsx
            ├── Hero.css
            ├── UploadSection.jsx
            ├── UploadSection.css
            ├── SummarySection.jsx
            ├── SummarySection.css
            ├── LiteratureReview.jsx
            ├── LiteratureReview.css
            ├── ResearchGaps.jsx
            ├── ResearchGaps.css
            ├── Analytics.jsx
            ├── Analytics.css
            ├── LoadingScreen.jsx
            └── LoadingScreen.css
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.9+
- Node.js 18+
- Groq API Key → get one free at [console.groq.com](https://console.groq.com)

---

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/Research_Paper_Gap_Finder.git
cd Research_Paper_Gap_Finder
```

---

### 2. Backend Setup

```bash
cd backend
pip install fastapi uvicorn pypdf groq python-multipart
```

Add your Groq API key to `config.py`:

```python
GROQ_API_KEY = "your_groq_api_key_here"
```

Start the backend:

```bash
uvicorn app:app --reload --port 8000
```

Backend runs at → `http://localhost:8000`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at → `http://localhost:5173`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/upload` | Upload a PDF and get AI summary |
| `POST` | `/analyze-all` | Analyze all uploaded papers |
| `DELETE` | `/delete/{filename}` | Delete an uploaded paper |

### POST `/upload` — Response

```json
{
  "filename": "paper.pdf",
  "summary": "Research Objective: ...\nMethodology: ...\nKey Findings: ...\nLimitations: ..."
}
```

### POST `/analyze-all` — Response

```json
{
  "paper_count": 2,
  "papers": ["paper1.pdf", "paper2.pdf"],
  "literature_review": "...",
  "research_gaps": "..."
}
```

---

## 💡 How to Use

1. Open `http://localhost:5173` in your browser
2. Drag & drop a research paper PDF into the upload zone
3. Wait for the AI to generate a structured summary
4. Upload more papers if needed
5. Click **Analyze All Papers**
6. View the generated:
   - 📚 Literature Review
   - 🕳️ Research Gaps
   - 🚀 Future Research Directions
   - 🎓 Thesis Ideas

---

## ⚙️ Environment Variables

Create a `.env` file in `/backend` (optional, or edit `config.py` directly):

```env
GROQ_API_KEY=your_groq_api_key_here
```

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 🙌 Acknowledgements

- [Groq](https://groq.com) — Ultra-fast LLM inference
- [FastAPI](https://fastapi.tiangolo.com) — Python web framework
- [Vite](https://vitejs.dev) — Lightning fast React builds