from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
from fastapi import HTTPException
from services.pdf_parser import extract_text
from services.summarizer import summarize
from services.gap_finder import find_research_gaps
from services.literature_review import generate_literature_review
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://research-paper-gap-finder.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def home():
    return {
        "message": "Research Gap Finder API Running"
    }


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    if not file.filename.lower().endswith(".pdf"):
        return {
            "error": "Only PDF files are allowed"
        }

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    text = extract_text(file_path)

    summary = summarize(text)

    return {
        "message": "File uploaded successfully",
        "filename": file.filename,
        "summary": summary
    }


@app.post("/analyze-all")
async def analyze_all():

    summaries = []

    for filename in os.listdir(UPLOAD_FOLDER):

        if not filename.lower().endswith(".pdf"):
            continue

        file_path = os.path.join(UPLOAD_FOLDER, filename)

        text = extract_text(file_path)

        summary = summarize(text)

        summaries.append({
            "filename": filename,
            "summary": summary
        })

    if not summaries:
        return {
            "error": "No PDF files found in uploads folder"
        }

    combined_summaries = "\n\n".join(
        [paper["summary"] for paper in summaries]
    )

    try:
      literature_review = generate_literature_review(
        combined_summaries
    )
    except Exception as e:
      literature_review = f"Error generating literature review: {str(e)}"


    try:
      research_gaps = find_research_gaps(combined_summaries)
    except Exception as e:
      research_gaps = f"Error generating research gaps: {str(e)}"

    return {
    "paper_count": len(summaries),
    "papers": summaries,
    "literature_review": literature_review,
    "research_gaps": research_gaps

    }

@app.delete("/delete/{filename}")
async def delete_paper(filename: str):
    file_path = os.path.join("uploads", filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return {"message": f"{filename} deleted"}
    raise HTTPException(status_code=404, detail="File not found")