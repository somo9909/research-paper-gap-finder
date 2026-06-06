from services.pdf_parser import extract_text

pdf_path = "uploads/sample.pdf"

text = extract_text(pdf_path)

print(text[:1000])