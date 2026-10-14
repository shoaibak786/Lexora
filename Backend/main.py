from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pathlib import Path
from datetime import datetime

import fitz
from docx import Document
import requests

from rag import add_document_to_chroma, build_context


# =========================
# FastAPI
# =========================

app = FastAPI(
    title="Lexora Backend",
    description="AI Legal Case Document Processing API",
    version="1.0.0"
)


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# Upload Settings
# =========================

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

ALLOWED_EXTENSIONS = {
    ".pdf",
    ".docx"
}

MAX_FILE_SIZE = 25 * 1024 * 1024


# =========================
# Root
# =========================

@app.get("/")
def root():

    return {
        "message": "Lexora Backend is running",
        "status": "online"
    }


# =========================
# PDF Text Extraction
# =========================

def extract_pdf_text(file_path: Path):

    doc = fitz.open(file_path)

    pages_text = []

    for page in doc:

        page_text = page.get_text()

        if page_text.strip():
            pages_text.append(page_text)

    page_count = len(doc)

    doc.close()

    extracted_text = "\n\n".join(
        pages_text
    )

    return extracted_text, page_count


# =========================
# DOCX Text Extraction
# =========================

def extract_docx_text(file_path: Path):

    doc = Document(file_path)

    paragraphs = []

    for paragraph in doc.paragraphs:

        if paragraph.text.strip():

            paragraphs.append(
                paragraph.text
            )

    extracted_text = "\n".join(
        paragraphs
    )

    return extracted_text, None


# =========================
# Upload + Process Document
# =========================

@app.post("/upload-document")
async def upload_document(
    file: UploadFile = File(...)
):

    # -------------------------
    # Validate filename
    # -------------------------

    if not file.filename:

        raise HTTPException(
            status_code=400,
            detail="No file selected."
        )


    # -------------------------
    # File extension
    # -------------------------

    extension = Path(
        file.filename
    ).suffix.lower()


    # -------------------------
    # Validate file type
    # -------------------------

    if extension not in ALLOWED_EXTENSIONS:

        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are allowed."
        )


    # -------------------------
    # Read file
    # -------------------------

    contents = await file.read()


    # -------------------------
    # Empty file check
    # -------------------------

    if not contents:

        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty."
        )


    # -------------------------
    # File size check
    # -------------------------

    if len(contents) > MAX_FILE_SIZE:

        raise HTTPException(
            status_code=400,
            detail="Maximum file size is 25 MB."
        )


    # -------------------------
    # Safe filename
    # -------------------------

    safe_name = Path(
        file.filename
    ).name


    # -------------------------
    # Save file
    # -------------------------

    file_path = UPLOAD_DIR / safe_name

    file_path.write_bytes(
        contents
    )


    # -------------------------
    # Extract text
    # -------------------------

    try:

        if extension == ".pdf":

            extracted_text, pages = (
                extract_pdf_text(
                    file_path
                )
            )

        else:

            extracted_text, pages = (
                extract_docx_text(
                    file_path
                )
            )

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Text extraction failed: {str(error)}"
        )


    # -------------------------
    # Check extracted text
    # -------------------------

    if not extracted_text.strip():

        raise HTTPException(
            status_code=400,
            detail=(
                "No readable text was found "
                "in this document."
            )
        )


    # -------------------------
    # Index in ChromaDB
    # -------------------------

    try:

        indexing_result = (
            add_document_to_chroma(
                filename=safe_name,
                text=extracted_text
            )
        )

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"ChromaDB indexing failed: {str(error)}"
        )


    # -------------------------
    # Final response
    # -------------------------

    return {

        "filename": safe_name,

        "type": extension.replace(
            ".",
            ""
        ).upper(),

        "size": len(contents),

        "pages": pages,

        "text_length": len(
            extracted_text
        ),

        "chunks": indexing_result[
            "chunks"
        ],

        "status": "indexed",

        "uploaded_at": datetime.now().isoformat(),

        "text_preview": extracted_text[:500]
    }


# ==================================================
# RAG LEGAL QUESTION ANSWERING
# ==================================================

@app.post("/ask")
async def ask_legal_question(
    data: dict
):

    # -------------------------
    # Get user question
    # -------------------------

    question = data.get(
        "question",
        ""
    ).strip()


    # -------------------------
    # Validate question
    # -------------------------

    if not question:

        raise HTTPException(
            status_code=400,
            detail="Question is required."
        )


    # -------------------------
    # Search ChromaDB
    # -------------------------

    try:

        context, sources = build_context(
            query=question,
            number_of_results=5
        )

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Document search failed: {str(error)}"
        )


    # -------------------------
    # No relevant information
    # -------------------------

    if not context:

        return {

            "question": question,

            "answer": (
                "The answer was not found "
                "in the uploaded documents."
            ),

            "sources": []
        }


    # -------------------------
    # RAG Prompt
    # -------------------------

    prompt = f"""
You are Lexora, an AI legal document
analysis assistant.

Your task is to answer the user's
question using ONLY the information
provided in the legal document context.

IMPORTANT RULES:

1. Do not invent facts.
2. Do not make up legal clauses.
3. Do not use information that is not
   present in the provided context.
4. If the answer cannot be found in
   the provided documents, say:

"The answer was not found in the
uploaded documents."

5. Give a clear, professional and
   concise answer.
6. When appropriate, mention the
   relevant document name.

USER QUESTION:

{question}


LEGAL DOCUMENT CONTEXT:

{context}


ANSWER:
"""


    # -------------------------
    # Send request to Ollama
    # -------------------------

    try:

        response = requests.post(
            "http://localhost:11434/api/generate",

            json={
                "model": "llama3",
                "prompt": prompt,
                "stream": False
            },

            timeout=120
        )

        response.raise_for_status()

        result = response.json()

        answer = result.get(
            "response",
            ""
        ).strip()

    except requests.exceptions.ConnectionError:

        raise HTTPException(
            status_code=503,
            detail=(
                "Ollama is not running. "
                "Please start Ollama and try again."
            )
        )

    except requests.exceptions.Timeout:

        raise HTTPException(
            status_code=504,
            detail=(
                "Ollama took too long to "
                "generate a response."
            )
        )

    except requests.RequestException as error:

        raise HTTPException(
            status_code=500,
            detail=f"Ollama request failed: {str(error)}"
        )


    # -------------------------
    # Check AI response
    # -------------------------

    if not answer:

        raise HTTPException(
            status_code=500,
            detail="Ollama returned an empty response."
        )


    # -------------------------
    # Final RAG Response
    # -------------------------

    return {

        "question": question,

        "answer": answer,

        "sources": sources
    }