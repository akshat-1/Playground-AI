import fitz  # PyMuPDF
from transformers import pipeline

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def extract_text_from_pdf(pdf_path: str) -> str:
    doc = fitz.open(pdf_path)
    full_text = []
    for page in doc:
        full_text.append(page.get_text())
    return "\n".join(full_text)

def summarize_text(text: str, max_length=150):
    # chunk text if long
    return summarizer(text, max_length=max_length, min_length=40, truncation=True)[0]["summary_text"]
