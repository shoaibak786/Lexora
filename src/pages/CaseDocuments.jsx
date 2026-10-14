import { useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  FileUp,
  FolderOpen,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";

const MAX_FILE_SIZE = 25 * 1024 * 1024;

// FastAPI backend
const API_BASE_URL = "http://127.0.0.1:8000";

const initialDocuments = [
  {
    id: 1,
    name: "Property_Agreement.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploaded: "Oct 08, 2026",
    status: "Indexed",
    pages: 18,
  },
  {
    id: 2,
    name: "Legal_Notice.pdf",
    type: "PDF",
    size: "1.1 MB",
    uploaded: "Oct 06, 2026",
    status: "Indexed",
    pages: 7,
  },
  {
    id: 3,
    name: "Evidence_Report.docx",
    type: "DOCX",
    size: "840 KB",
    uploaded: "Oct 06, 2026",
    status: "Indexed",
    pages: 12,
  },
  {
    id: 4,
    name: "Court_Order.pdf",
    type: "PDF",
    size: "1.8 MB",
    uploaded: "Oct 05, 2026",
    status: "Processing",
    pages: 9,
  },
  {
    id: 5,
    name: "Client_Statement.docx",
    type: "DOCX",
    size: "620 KB",
    uploaded: "Oct 04, 2026",
    status: "Indexed",
    pages: 5,
  },
  {
    id: 6,
    name: "Ownership_Evidence.pdf",
    type: "PDF",
    size: "3.2 MB",
    uploaded: "Oct 03, 2026",
    status: "Indexed",
    pages: 24,
  },
];

/* CASE DATA
   Used only to show the correct client name/type
   according to the selected case ID.
*/
const caseData = {
  "CASE-2026-001": {
    client: "Ahmed Raza",
    type: "Civil Litigation",
  },
  "CASE-2026-002": {
    client: "Sana Malik",
    type: "Contract Dispute",
  },
  "CASE-2026-003": {
    client: "Usman Tariq",
    type: "Property Dispute",
  },
  "CASE-2026-004": {
    client: "Ayesha Khan",
    type: "Family Law",
  },
  "CASE-2026-005": {
    client: "Bilal Ahmed",
    type: "Criminal Defense",
  },
  "CASE-2026-006": {
    client: "Hira Shah",
    type: "Employment Dispute",
  },
  "CASE-2026-007": {
    client: "Hamza Ali",
    type: "Corporate Law",
  },
};

const CaseDocuments = () => {
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [documents, setDocuments] = useState(initialDocuments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const caseId = id || "CASE-2026-001";

  // Get the correct case information from the URL case ID.
  const currentCase = caseData[caseId] || {
    client: "Unknown Client",
    type: "Case",
  };

  const filteredDocuments = useMemo(() => {
    return documents.filter((document) => {
      const matchesSearch = document.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || document.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [documents, search, statusFilter]);

  const indexedCount = documents.filter(
    (document) => document.status === "Indexed"
  ).length;

  const processingCount = documents.filter(
    (document) => document.status === "Processing"
  ).length;

  const totalPages = documents.reduce(
    (total, document) => total + (document.pages || 0),
    0
  );

  const validateFile = (file) => {
    if (!file) return false;

    const extension = file.name.split(".").pop()?.toLowerCase();

    if (!["pdf", "docx"].includes(extension)) {
      setUploadMessage(
        "Unsupported file type. Please upload a PDF or DOCX document."
      );
      setSelectedFile(null);
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setUploadMessage(
        "File is too large. The maximum allowed size is 25 MB."
      );
      setSelectedFile(null);
      return false;
    }

    if (file.size === 0) {
      setUploadMessage(
        "This file appears to be empty. Please choose another document."
      );
      setSelectedFile(null);
      return false;
    }

    setSelectedFile(file);
    setUploadMessage("");

    return true;
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    validateFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    if (uploading) return;

    const file = event.dataTransfer.files?.[0];

    if (!file) return;

    validateFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();

    if (!uploading) {
      setDragActive(true);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragActive(false);
  };

  // REAL BACKEND UPLOAD
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage("Please select a PDF or DOCX document first.");
      return;
    }

    setUploading(true);
    setUploadMessage("");
    setUploadProgress(10);

    try {
      const formData = new FormData();

      formData.append("file", selectedFile);

      // Show upload progress in the UI.
      setUploadProgress(25);

      const response = await fetch(
        `${API_BASE_URL}/upload-document`,
        {
          method: "POST",
          body: formData,
        }
      );

      setUploadProgress(70);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Document upload failed."
        );
      }

      setUploadProgress(90);

      const newDocument = {
        id: Date.now(),
        name: data.filename,
        type: data.file_type,
        size: formatFileSize(data.file_size),
        uploaded: "Just now",
        status: "Indexed",
        pages: data.pages || 0,

        // Backend extracted information.
        extractedText: data.text || "",
        textLength: data.text_length || 0,
        pageData: data.page_data || [],
      };

      setDocuments((previous) => [
        newDocument,
        ...previous,
      ]);

      setUploadProgress(100);

      // Small delay so user can see the completed state.
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
        setSelectedFile(null);
        setShowUpload(false);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 700);
    } catch (error) {
      console.error("Document upload error:", error);

      setUploading(false);
      setUploadProgress(0);

      setUploadMessage(
        error.message ||
        "Something went wrong while uploading the document."
      );
    }
  };

  const closeUploadModal = () => {
    if (uploading) return;

    setShowUpload(false);
    setSelectedFile(null);
    setUploadMessage("");
    setUploadProgress(0);
    setDragActive(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = (documentId) => {
    setDocuments((previous) =>
      previous.filter((document) => document.id !== documentId)
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050505]/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[72px] max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <Link
              to={`/cases/${caseId}`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/65 transition hover:bg-white/[0.08] hover:text-white"
            >
              <ArrowLeft size={18} />
            </Link>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  Case Documents
                </span>

                <span className="hidden text-white/20 sm:inline">
                  /
                </span>

                <span className="font-mono text-xs text-white/50">
                  {caseId}
                </span>

                <span className="hidden text-white/20 sm:inline">
                  /
                </span>

                <span className="text-xs font-medium text-white/60">
                  {currentCase.client}
                </span>
              </div>

              <h1 className="mt-1 truncate text-lg font-semibold tracking-tight sm:text-xl">
                Legal Document Workspace
              </h1>
            </div>
          </div>

          <button
            onClick={() => setShowUpload(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            <Upload size={16} />

            <span className="hidden sm:inline">
              Upload Document
            </span>

            <span className="sm:hidden">Upload</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* INTRO */}
        <section className="rounded-3xl border border-white/10 bg-[#0c0c0c] p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                <BrainCircuit
                  size={14}
                  className="text-white/65"
                />

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
                  AI Knowledge Base
                </span>
              </div>

              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                Your case documents, ready for legal intelligence.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
                Upload legal documents to prepare this case for AI-powered
                search, analysis, summarization and question answering.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.06] px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10">
                <ShieldCheck
                  size={17}
                  className="text-emerald-300"
                />
              </div>

              <div>
                <p className="text-xs font-semibold text-emerald-200">
                  Workspace Protected
                </p>

                <p className="mt-0.5 text-[11px] text-emerald-200/45">
                  Prototype secure workspace
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            icon={FolderOpen}
            label="Total Documents"
            value={documents.length}
            description="Uploaded to case"
          />

          <StatCard
            icon={BrainCircuit}
            label="Indexed"
            value={indexedCount}
            description="Available to AI"
          />

          <StatCard
            icon={Clock3}
            label="Processing"
            value={processingCount}
            description="Being analyzed"
          />

          <StatCard
            icon={FileText}
            label="Total Pages"
            value={totalPages}
            description="Across all documents"
          />
        </section>

        {/* AI READINESS */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0c]">
          <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <Sparkles
                  size={19}
                  className="text-white/70"
                />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  AI Readiness
                </p>

                <h3 className="mt-1 text-base font-semibold">
                  Case knowledge base is 84% ready
                </h3>

                <p className="mt-1 text-xs leading-5 text-white/35">
                  Indexed documents can be used by Lexora AI for contextual
                  answers.
                </p>
              </div>
            </div>

            <div className="w-full lg:max-w-[330px]">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-white/30">
                  Knowledge coverage
                </span>

                <span className="text-xs font-semibold">
                  84%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: "84%" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* DOCUMENT AREA */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-[#0c0c0c]">
          {/* TOOLBAR */}
          <div className="border-b border-white/10 p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  Document Library
                </p>

                <h3 className="mt-1 text-lg font-semibold">
                  Case knowledge base
                </h3>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative min-w-0 sm:w-[260px]">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search documents..."
                    className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-9 pr-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/20"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  className="h-10 rounded-xl border border-white/10 bg-[#111] px-3 text-sm text-white/65 outline-none focus:border-white/20"
                >
                  <option value="All">All Status</option>
                  <option value="Indexed">Indexed</option>
                  <option value="Processing">Processing</option>
                </select>
              </div>
            </div>
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">
                    Document
                  </th>

                  <th className="px-4 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">
                    Type
                  </th>

                  <th className="px-4 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">
                    Size
                  </th>

                  <th className="px-4 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">
                    Uploaded
                  </th>

                  <th className="px-4 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredDocuments.map((document) => (
                  <DocumentRow
                    key={document.id}
                    document={document}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE LIST */}
          <div className="divide-y divide-white/10 md:hidden">
            {filteredDocuments.map((document) => (
              <MobileDocument
                key={document.id}
                document={document}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* EMPTY */}
          {filteredDocuments.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                <FileText
                  size={22}
                  className="text-white/30"
                />
              </div>

              <h4 className="mt-4 text-sm font-semibold">
                No documents found
              </h4>

              <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-white/30">
                Try changing your search or status filter.
              </p>
            </div>
          )}

          {/* FOOTER */}
          <div className="border-t border-white/10 px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-2 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
              <span>
                Showing {filteredDocuments.length} of{" "}
                {documents.length} documents
              </span>

              <span className="flex items-center gap-1.5">
                <ShieldCheck size={13} />
                Documents are part of this case workspace
              </span>
            </div>
          </div>
        </section>

        {/* NEXT AI STEP */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <BrainCircuit
                  size={20}
                  className="text-white/75"
                />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  Next AI Layer
                </p>

                <h3 className="mt-1 text-base font-semibold">
                  Ask questions from your case documents
                </h3>

                <p className="mt-1 max-w-2xl text-xs leading-6 text-white/35">
                  Once documents are indexed, Lexora can retrieve relevant
                  content and generate contextual legal answers.
                </p>
              </div>
            </div>

            <Link
              to={`/cases/${caseId}/ai`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Open AI Workspace
              <ChevronRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      {/* UPLOAD MODAL */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0c] shadow-2xl shadow-black/50">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  Document Upload
                </p>

                <h3 className="mt-1 text-lg font-semibold">
                  Add case document
                </h3>

                {/* CURRENT CASE CLIENT */}
                <p className="mt-1 text-xs text-white/35">
                  {currentCase.client} · {currentCase.type}
                </p>
              </div>

              <button
                onClick={closeUploadModal}
                disabled={uploading}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/45 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <X size={17} />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* DROPZONE */}
              <button
                type="button"
                disabled={uploading}
                onClick={() =>
                  fileInputRef.current?.click()
                }
                onDragOver={handleDragOver}
                onDragEnter={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`group flex w-full flex-col items-center justify-center rounded-2xl border border-dashed px-5 py-10 text-center transition ${dragActive
                    ? "border-white/50 bg-white/[0.08]"
                    : "border-white/15 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04]"
                  } ${uploading
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer"
                  }`}
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition ${dragActive
                      ? "border-white/25 bg-white/[0.10]"
                      : "border-white/10 bg-white/[0.04] group-hover:bg-white/[0.07]"
                    }`}
                >
                  <FileUp
                    size={24}
                    className="text-white/55"
                  />
                </div>

                <p className="mt-4 text-sm font-semibold">
                  {dragActive
                    ? "Drop your document here"
                    : selectedFile
                      ? selectedFile.name
                      : "Choose a legal document"}
                </p>

                <p className="mt-2 text-xs text-white/30">
                  Drag & drop or click to browse
                </p>

                <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/25">
                  <span className="rounded-md border border-white/10 px-2 py-1">
                    PDF
                  </span>

                  <span className="rounded-md border border-white/10 px-2 py-1">
                    DOCX
                  </span>

                  <span className="text-white/15">
                    •
                  </span>

                  <span>Max 25 MB</span>
                </div>
              </button>

              {/* SELECTED FILE */}
              {selectedFile && (
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                        <FileText
                          size={16}
                          className="text-white/55"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {selectedFile.name}
                        </p>

                        <p className="mt-1 text-xs text-white/30">
                          {formatFileSize(selectedFile.size)} ·{" "}
                          {selectedFile.name
                            .split(".")
                            .pop()
                            ?.toUpperCase()}
                        </p>
                      </div>
                    </div>

                    {!uploading && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setUploadMessage("");

                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                        className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/30 transition hover:bg-white/[0.06] hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  {/* UPLOAD PROGRESS */}
                  {uploading && (
                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[11px] text-white/35">
                          {uploadProgress >= 100
                            ? "Document uploaded. Indexed successfully."
                            : "Uploading and extracting document..."}
                        </span>

                        <span className="text-[11px] font-semibold text-white/60">
                          {uploadProgress}%
                        </span>
                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-white transition-all duration-300"
                          style={{
                            width: `${uploadProgress}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* INFO */}
              {!selectedFile && !uploadMessage && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                  <ShieldCheck
                    size={15}
                    className="mt-0.5 shrink-0 text-white/35"
                  />

                  <p className="text-[11px] leading-5 text-white/30">
                    Your document will be added to this case workspace and
                    prepared for AI-powered legal analysis.
                  </p>
                </div>
              )}

              {/* ERROR */}
              {uploadMessage && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-400/15 bg-red-400/[0.06] px-4 py-3">
                  <X
                    size={15}
                    className="mt-0.5 shrink-0 text-red-300"
                  />

                  <p className="text-xs leading-5 text-red-300">
                    {uploadMessage}
                  </p>
                </div>
              )}

              {/* ACTIONS */}
              <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  onClick={closeUploadModal}
                  disabled={uploading}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpload}
                  disabled={uploading || !selectedFile}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />

                      {uploadProgress >= 100
                        ? "Complete"
                        : "Processing..."}
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      Upload & Process
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  description,
}) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c0c0c] p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
          <Icon size={16} className="text-white/55" />
        </div>

        <span className="text-2xl font-semibold tracking-tight">
          {value}
        </span>
      </div>

      <p className="mt-5 text-xs font-medium text-white/60">
        {label}
      </p>

      <p className="mt-1 text-[11px] text-white/30">
        {description}
      </p>
    </div>
  );
};

const DocumentRow = ({
  document,
  onDelete,
}) => {
  return (
    <tr className="border-b border-white/10 last:border-b-0">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
            <FileText
              size={17}
              className="text-white/55"
            />
          </div>

          <div className="min-w-0">
            <p className="max-w-[300px] truncate text-sm font-medium">
              {document.name}
            </p>

            <p className="mt-1 text-xs text-white/30">
              {document.pages
                ? `${document.pages} pages`
                : "Text extracted"}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-4 text-xs text-white/45">
        {document.type}
      </td>

      <td className="px-4 py-4 text-xs text-white/45">
        {document.size}
      </td>

      <td className="px-4 py-4 text-xs text-white/45">
        {document.uploaded}
      </td>

      <td className="px-4 py-4">
        <StatusBadge status={document.status} />
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-end">
          <button
            onClick={() => onDelete(document.id)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-white/25 transition hover:bg-red-400/10 hover:text-red-300"
            title="Delete document"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
};

const MobileDocument = ({
  document,
  onDelete,
}) => {
  return (
    <div className="p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
          <FileText
            size={17}
            className="text-white/55"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <p className="truncate text-sm font-medium">
              {document.name}
            </p>

            <button
              onClick={() => onDelete(document.id)}
              className="shrink-0 text-white/25 transition hover:text-red-300"
            >
              <Trash2 size={15} />
            </button>
          </div>

          <p className="mt-1 text-xs text-white/30">
            {document.type} · {document.size} ·{" "}
            {document.pages
              ? `${document.pages} pages`
              : "Text extracted"}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <StatusBadge status={document.status} />

            <span className="text-[11px] text-white/25">
              {document.uploaded}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const indexed = status === "Indexed";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${indexed
          ? "border-emerald-400/15 bg-emerald-400/10 text-emerald-300"
          : "border-amber-400/15 bg-amber-400/10 text-amber-300"
        }`}
    >
      {indexed ? (
        <CheckCircle2 size={11} />
      ) : (
        <Clock3 size={11} />
      )}

      {status}
    </span>
  );
};

const formatFileSize = (bytes) => {
  if (!bytes) return "0 KB";

  const megabytes = bytes / (1024 * 1024);

  if (megabytes >= 1) {
    return `${megabytes.toFixed(1)} MB`;
  }

  return `${Math.max(
    1,
    Math.round(bytes / 1024)
  )} KB`;
};

export default CaseDocuments;