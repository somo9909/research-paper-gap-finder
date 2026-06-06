from services.pdf_parser import extract_text
from services.summarizer import summarize

pdf_path = "uploads/sample.pdf"

text = extract_text(pdf_path)

summary = summarize(text)

print(summary)