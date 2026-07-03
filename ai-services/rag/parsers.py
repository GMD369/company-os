import io

import fitz  # PyMuPDF
import pandas as pd
from docx import Document as DocxDocument

PDF_MIME_TYPES = {"application/pdf"}
DOCX_MIME_TYPES = {
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}
XLSX_MIME_TYPES = {
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
}
CSV_MIME_TYPES = {"text/csv"}
TEXT_MIME_TYPES = {"text/plain"}


def parse_pdf(content: bytes) -> str:
    with fitz.open(stream=content, filetype="pdf") as doc:
        return "\n".join(page.get_text() for page in doc)


def parse_docx(content: bytes) -> str:
    doc = DocxDocument(io.BytesIO(content))
    return "\n".join(p.text for p in doc.paragraphs)


def parse_xlsx(content: bytes) -> str:
    sheets = pd.read_excel(io.BytesIO(content), sheet_name=None)
    return "\n\n".join(df.to_csv(index=False) for df in sheets.values())


def parse_csv(content: bytes) -> str:
    df = pd.read_csv(io.BytesIO(content))
    return df.to_csv(index=False)


def parse_text(content: bytes) -> str:
    return content.decode("utf-8", errors="ignore")


def parse_document(content: bytes, mime_type: str) -> str:
    if mime_type in PDF_MIME_TYPES:
        return parse_pdf(content)
    if mime_type in DOCX_MIME_TYPES:
        return parse_docx(content)
    if mime_type in XLSX_MIME_TYPES:
        return parse_xlsx(content)
    if mime_type in CSV_MIME_TYPES:
        return parse_csv(content)
    if mime_type in TEXT_MIME_TYPES:
        return parse_text(content)
    raise ValueError(f"Unsupported mime type: {mime_type}")
