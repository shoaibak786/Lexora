import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUp,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Copy,
  FileText,
  Info,
  Menu,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

const suggestedQuestions = [
  "What is the main issue in this case?",
  "Summarize the key facts from the uploaded documents.",
  "What evidence supports the client's position?",
  "What risks should the lawyer consider?",
];

const initialMessages = [
  {
    id: 1,
    role: "assistant",
    text:
      "Hello. I'm Lexora AI. I can analyze the documents indexed for this case and answer questions using the available case context.",
    sources: [],
  },
];

const sourceDocuments = [
  {
    name: "Property_Agreement.pdf",
    page: "Page 4",
    relevance: "96%",
    excerpt:
      "The agreement identifies the parties involved and establishes the relevant ownership terms.",
  },
  {
    name: "Legal_Notice.pdf",
    page: "Page 2",
    relevance: "91%",
    excerpt:
      "The notice outlines the dispute and references the claimant's position regarding ownership.",
  },
  {
    name: "Evidence_Report.docx",
    page: "Page 7",
    relevance: "87%",
    excerpt:
      "Supporting evidence is described along with the documents relied upon by the client.",
  },
];

const AIWorkspace = () => {
  const { id } = useParams();

  const caseId = id || "CASE-2026-001";

  // Case information based on the selected Case ID
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

  const currentCase =
    caseData[caseId] || caseData["CASE-2026-001"];

  const [messages, setMessages] = useState(initialMessages);
  const [question, setQuestion] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [showSources, setShowSources] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const latestSources = useMemo(() => {
    const lastAssistantMessage = [...messages]
      .reverse()
      .find((message) => message.role === "assistant");

    return lastAssistantMessage?.sources?.length
      ? lastAssistantMessage.sources
      : sourceDocuments;
  }, [messages]);

  const askQuestion = (customQuestion) => {
    const value = (customQuestion ?? question).trim();

    if (!value || isThinking) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: value,
    };

    setMessages((previous) => [...previous, userMessage]);
    setQuestion("");
    setIsThinking(true);

    setTimeout(() => {
      const answer = generateAnswer(value);

      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        text: answer,
        sources: sourceDocuments,
      };

      setMessages((previous) => [...previous, assistantMessage]);
      setIsThinking(false);
    }, 1500);
  };

  const clearConversation = () => {
    setMessages(initialMessages);
    setQuestion("");
  };

  const copyAnswer = async (text, messageId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(messageId);

      setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505] text-white">
      {/* MOBILE OVERLAY */}
      {mobileMenu && (
        <button
          onClick={() => setMobileMenu(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          aria-label="Close menu"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[290px] flex-col border-r border-white/10 bg-[#080808] transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* BRAND */}
        <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-5">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
              <ScaleIcon />
            </div>

            <div>
              <p className="text-sm font-bold tracking-tight">LEXORA</p>
              <p className="text-[9px] uppercase tracking-[0.22em] text-white/30">
                Legal Intelligence
              </p>
            </div>
          </Link>

          <button
            onClick={() => setMobileMenu(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 hover:bg-white/[0.05] hover:text-white lg:hidden"
          >
            <X size={17} />
          </button>
        </div>

        {/* CASE CONTEXT */}
        <div className="border-b border-white/10 p-4">
          <Link
            to={`/cases/${caseId}`}
            className="block rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:bg-white/[0.05]"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
                Current Case
              </span>

              <ArrowLeft size={14} className="rotate-180 text-white/25" />
            </div>

            <p className="mt-2 font-mono text-xs text-white/70">
              {caseId}
            </p>

            {/* FIXED: Dynamic client name */}
            <p className="mt-1 text-sm font-medium">
              {currentCase.client}
            </p>

            {/* FIXED: Dynamic case type */}
            <p className="mt-1 text-[11px] text-white/30">
              {currentCase.type}
            </p>
          </Link>
        </div>

        {/* AI STATUS */}
        <div className="p-4">
          <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.04] p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400/10">
                <BrainCircuit size={14} className="text-emerald-300" />
              </div>

              <div>
                <p className="text-xs font-semibold">AI Ready</p>
                <p className="text-[10px] text-emerald-200/45">
                  Case knowledge loaded
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <StatusLine label="Documents indexed" value="12" />
              <StatusLine label="Knowledge coverage" value="84%" />
              <StatusLine label="AI model" value="Llama 3" />
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4">
          <p className="px-2 pb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/25">
            Workspace
          </p>

          <div className="space-y-1">
            <WorkspaceNav active icon={BrainCircuit} label="AI Research" />

            <Link
              to={`/cases/${caseId}/documents`}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/45 transition hover:bg-white/[0.05] hover:text-white"
            >
              <FileText size={16} />
              Documents
            </Link>

            <Link
              to={`/cases/${caseId}`}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/45 transition hover:bg-white/[0.05] hover:text-white"
            >
              <Search size={16} />
              Case Overview
            </Link>
          </div>
        </nav>

        {/* SECURITY */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-2 text-[10px] text-white/30">
            <ShieldCheck size={14} />
            <span>Protected legal workspace</span>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* TOPBAR */}
        <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/10 bg-[#050505] px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setMobileMenu(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/60 lg:hidden"
            >
              <Menu size={18} />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
                  AI Workspace
                </span>

                <span className="text-white/15">/</span>

                <span className="truncate font-mono text-[10px] text-white/35">
                  {caseId}
                </span>
              </div>

              <h1 className="mt-1 truncate text-sm font-semibold sm:text-base">
                Legal Research Assistant
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearConversation}
              className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/50 transition hover:bg-white/[0.07] hover:text-white sm:flex"
            >
              <RotateCcw size={14} />
              New conversation
            </button>

            <button
              onClick={clearConversation}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/50 sm:hidden"
              title="New conversation"
            >
              <Plus size={17} />
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex min-h-0 flex-1">
          {/* CHAT */}
          <main className="flex min-w-0 flex-1 flex-col">
            <div className="flex-1 overflow-y-auto">
              <div className="mx-auto w-full max-w-4xl px-4 py-7 sm:px-6 sm:py-10">
                {/* INTRO */}
                <div className="mb-9">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                    <Sparkles size={20} className="text-white/75" />
                  </div>

                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Ask Lexora about this case.
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/40">
                    Ask questions about the uploaded documents. Lexora retrieves
                    relevant case information and generates a contextual answer.
                  </p>
                </div>

                {/* MESSAGES */}
                <div className="space-y-8">
                  {messages.map((message) => (
                    <Message
                      key={message.id}
                      message={message}
                      onCopy={copyAnswer}
                      copiedId={copiedId}
                    />
                  ))}

                  {isThinking && <ThinkingIndicator />}
                </div>

                {/* SUGGESTIONS */}
                {messages.length === 1 && !isThinking && (
                  <div className="mt-10">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                      Suggested questions
                    </p>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {suggestedQuestions.map((item) => (
                        <button
                          key={item}
                          onClick={() => askQuestion(item)}
                          className="group rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-left transition hover:border-white/20 hover:bg-white/[0.05]"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm leading-5 text-white/55 transition group-hover:text-white/80">
                              {item}
                            </span>

                            <ArrowUp
                              size={15}
                              className="rotate-45 shrink-0 text-white/20 transition group-hover:text-white/55"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* INPUT */}
            <div className="shrink-0 border-t border-white/10 bg-[#050505] p-3 sm:p-4">
              <div className="mx-auto max-w-4xl">
                <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-2 shadow-2xl shadow-black/20">
                  <textarea
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        askQuestion();
                      }
                    }}
                    placeholder="Ask a question about this case..."
                    rows={2}
                    className="max-h-32 min-h-[52px] w-full resize-none bg-transparent px-3 py-2 text-sm leading-6 text-white outline-none placeholder:text-white/25"
                  />

                  <div className="flex items-center justify-between gap-3 px-2 pb-1">
                    <div className="flex items-center gap-2 text-[10px] text-white/25">
                      <ShieldCheck size={13} />
                      <span>Answers grounded in case documents</span>
                    </div>

                    <button
                      onClick={() => askQuestion()}
                      disabled={!question.trim() || isThinking}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-25"
                      title="Send question"
                    >
                      <ArrowUp size={17} />
                    </button>
                  </div>
                </div>

                <p className="mt-2 text-center text-[9px] text-white/20">
                  Lexora AI may make mistakes. Review important legal
                  information against the original documents.
                </p>
              </div>
            </div>
          </main>

          {/* SOURCES */}
          <aside
            className={`hidden w-[350px] shrink-0 border-l border-white/10 bg-[#080808] xl:flex xl:flex-col ${
              showSources ? "" : "xl:hidden"
            }`}
          >
            <SourcesPanel
              sources={latestSources}
              onClose={() => setShowSources(false)}
            />
          </aside>
        </div>
      </div>

      {/* SOURCES MOBILE/TABLET */}
      {!showSources && (
        <button
          onClick={() => setShowSources(true)}
          className="fixed bottom-5 right-5 z-30 hidden items-center gap-2 rounded-full border border-white/10 bg-[#111] px-4 py-3 text-xs font-semibold shadow-xl shadow-black/30 lg:flex xl:hidden"
        >
          <FileText size={14} />
          Sources
        </button>
      )}
    </div>
  );
};

const Message = ({ message, onCopy, copiedId }) => {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-white px-4 py-3 text-sm leading-6 text-black sm:max-w-[75%]">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 sm:gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
        <BrainCircuit size={15} className="text-white/65" />
      </div>

      <div className="min-w-0 max-w-3xl">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs font-semibold">Lexora AI</span>

          <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-emerald-300/70">
            <CheckCircle2 size={10} />
            Grounded
          </span>
        </div>

        <div className="text-sm leading-7 text-white/65">
          {message.text}
        </div>

        {message.sources?.length > 0 && (
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-white/45" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                  Retrieved Sources
                </span>
              </div>

              <span className="text-[10px] text-white/25">
                {message.sources.length} sources
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {message.sources.map((source) => (
                <div
                  key={source.name}
                  className="rounded-xl border border-white/10 bg-[#0b0b0b] p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <FileText size={13} className="shrink-0 text-white/40" />

                      <p className="truncate text-xs font-medium text-white/70">
                        {source.name}
                      </p>
                    </div>

                    <span className="shrink-0 text-[9px] font-semibold text-emerald-300/70">
                      {source.relevance}
                    </span>
                  </div>

                  <p className="mt-2 text-[11px] leading-5 text-white/30">
                    {source.excerpt}
                  </p>

                  <p className="mt-2 text-[9px] uppercase tracking-wider text-white/20">
                    {source.page}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-3 flex items-center gap-1">
          <button
            onClick={() => onCopy(message.text, message.id)}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[10px] text-white/25 transition hover:bg-white/[0.05] hover:text-white/60"
          >
            <Copy size={12} />
            {copiedId === message.id ? "Copied" : "Copy"}
          </button>

          <button className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[10px] text-white/25 transition hover:bg-white/[0.05] hover:text-white/60">
            <Info size={12} />
            About answer
          </button>
        </div>
      </div>
    </div>
  );
};

const ThinkingIndicator = () => {
  return (
    <div className="flex gap-3 sm:gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
        <BrainCircuit size={15} className="animate-pulse text-white/65" />
      </div>

      <div>
        <p className="text-xs font-semibold">Lexora AI</p>

        <div className="mt-3 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/40 [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/30 [animation-delay:300ms]" />
          <span className="ml-2 text-xs text-white/30">
            Retrieving relevant case documents...
          </span>
        </div>
      </div>
    </div>
  );
};

const SourcesPanel = ({ sources, onClose }) => {
  return (
    <>
      <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/10 px-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
            Retrieval
          </p>

          <h2 className="mt-1 text-sm font-semibold">
            Document Sources
          </h2>
        </div>

        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/30 transition hover:bg-white/[0.05] hover:text-white"
        >
          <ChevronDown size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.04] p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10">
              <CheckCircle2 size={15} className="text-emerald-300" />
            </div>

            <div>
              <p className="text-xs font-semibold text-emerald-200">
                Retrieval active
              </p>

              <p className="mt-1 text-[10px] leading-5 text-emerald-200/40">
                Lexora retrieves relevant sections from the case knowledge
                base before generating an answer.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/25">
              Retrieved Documents
            </p>

            <span className="text-[9px] text-white/20">
              Top {sources.length}
            </span>
          </div>

          <div className="mt-3 space-y-2">
            {sources.map((source, index) => (
              <div
                key={source.name}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[10px] font-semibold text-white/40">
                    0{index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-xs font-medium text-white/70">
                        {source.name}
                      </p>

                      <span className="shrink-0 text-[9px] font-semibold text-emerald-300/70">
                        {source.relevance}
                      </span>
                    </div>

                    <p className="mt-1 text-[9px] uppercase tracking-wider text-white/20">
                      {source.page}
                    </p>

                    <p className="mt-3 text-[10px] leading-5 text-white/30">
                      {source.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-white/40" />

            <p className="text-[10px] font-semibold text-white/50">
              Grounding
            </p>
          </div>

          <div className="mt-4 space-y-3">
            <Metric label="Source relevance" value="92%" />
            <Metric label="Knowledge coverage" value="84%" />
            <Metric label="Answer confidence" value="High" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 p-4">
        <p className="text-[9px] leading-4 text-white/20">
          Source references shown here represent the retrieval layer of the
          Lexora RAG workflow.
        </p>
      </div>
    </>
  );
};

const StatusLine = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between text-[10px]">
      <span className="text-white/30">{label}</span>
      <span className="font-medium text-white/65">{value}</span>
    </div>
  );
};

const Metric = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-white/30">{label}</span>
      <span className="text-[10px] font-semibold text-white/65">
        {value}
      </span>
    </div>
  );
};

const WorkspaceNav = ({ icon: Icon, label, active }) => {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
        active
          ? "bg-white/[0.07] text-white"
          : "text-white/45"
      }`}
    >
      <Icon size={16} />
      {label}
    </div>
  );
};

const ScaleIcon = () => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v18" />
      <path d="M5 6h14" />
      <path d="M7 6 3.5 13h7L7 6Z" />
      <path d="m17 6-3.5 7h7L17 6Z" />
      <path d="M8 21h8" />
    </svg>
  );
};

const generateAnswer = (question) => {
  const lower = question.toLowerCase();

  if (lower.includes("main issue") || lower.includes("issue")) {
    return "Based on the indexed case documents, the primary issue appears to concern a property ownership dispute. The available agreement and legal notice indicate that ownership rights, supporting documentation, and the parties' respective claims are central to the matter. The evidence report provides additional supporting information that may be relevant to establishing the client's position.";
  }

  if (
    lower.includes("summarize") ||
    lower.includes("summary") ||
    lower.includes("key facts")
  ) {
    return "The indexed documents indicate that the matter involves a dispute concerning property ownership. The Property Agreement establishes the relevant parties and ownership terms, while the Legal Notice describes the dispute and the claimant's position. The Evidence Report contains supporting material that may strengthen the client's argument. Further review of the original documents is recommended before relying on any specific legal conclusion.";
  }

  if (lower.includes("evidence")) {
    return "The available evidence appears to include the Property Agreement, Legal Notice, and Evidence Report. These documents collectively provide information about the ownership arrangement, the dispute raised by the parties, and supporting material. The strongest evidence should be evaluated against the original documents and the applicable legal requirements before being used in formal proceedings.";
  }

  if (lower.includes("risk")) {
    return "A preliminary review suggests that the main risks relate to the sufficiency of ownership evidence, consistency between the agreement and supporting documents, and the strength of the opposing party's claim. These are AI-generated observations for prototype purposes and should be verified against the original documents and applicable law.";
  }

  return "I found relevant information across the indexed case documents. The documents currently available indicate that the question is connected to the facts, agreements, and evidence associated with this matter. A more specific answer can be generated when the question is narrowed to a particular document, fact, legal issue, or piece of evidence.";
};

export default AIWorkspace;