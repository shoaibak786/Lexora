import chromadb
from pathlib import Path
import uuid

from sentence_transformers import SentenceTransformer


# =========================
# ChromaDB
# =========================

CHROMA_DIR = Path("chroma_db")

client = chromadb.PersistentClient(
    path=str(CHROMA_DIR)
)

collection = client.get_or_create_collection(
    name="lexora_legal_documents"
)


# =========================
# Embedding Model
# =========================

print("Loading embedding model...")

embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

print("Embedding model loaded.")


# =========================
# Text Chunking
# =========================

def chunk_text(
    text: str,
    chunk_size: int = 1000,
    overlap: int = 200
):

    text = text.strip()

    if not text:
        return []

    chunks = []

    start = 0
    text_length = len(text)

    while start < text_length:

        end = start + chunk_size

        chunk = text[start:end].strip()

        if chunk:
            chunks.append(chunk)

        start += chunk_size - overlap

    return chunks


# =========================
# Add Document
# =========================

def add_document_to_chroma(
    filename: str,
    text: str
):

    chunks = chunk_text(text)

    if not chunks:

        return {
            "filename": filename,
            "chunks": 0,
            "status": "no_text"
        }

    embeddings = embedding_model.encode(
        chunks
    ).tolist()

    ids = []
    metadatas = []

    for index in range(len(chunks)):

        chunk_id = str(uuid.uuid4())

        ids.append(chunk_id)

        metadatas.append({
            "filename": filename,
            "chunk_index": index
        })

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings,
        metadatas=metadatas
    )

    return {
        "filename": filename,
        "chunks": len(chunks),
        "status": "indexed"
    }


# =========================
# Search Documents
# =========================

def search_documents(
    query: str,
    number_of_results: int = 5
):

    query_embedding = embedding_model.encode(
        [query]
    ).tolist()[0]

    results = collection.query(
        query_embeddings=[
            query_embedding
        ],
        n_results=number_of_results
    )

    return results


# =========================
# Build RAG Context
# =========================

def build_context(
    query: str,
    number_of_results: int = 5
):

    results = search_documents(
        query,
        number_of_results
    )

    documents = results.get(
        "documents",
        [[]]
    )[0]

    metadatas = results.get(
        "metadatas",
        [[]]
    )[0]

    context_parts = []

    sources = []

    for index, document in enumerate(
        documents
    ):

        metadata = (
            metadatas[index]
            if index < len(metadatas)
            else {}
        )

        filename = metadata.get(
            "filename",
            "Unknown document"
        )

        chunk_index = metadata.get(
            "chunk_index",
            0
        )

        context_parts.append(
            f"""
SOURCE: {filename}
CHUNK: {chunk_index}

{document}
"""
        )

        sources.append({
            "filename": filename,
            "chunk": chunk_index
        })

    context = "\n\n".join(
        context_parts
    )

    return context, sources