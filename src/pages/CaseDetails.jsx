
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  MessageSquareText,
  Scale,
  ShieldCheck,
  Sparkles,
  Upload,
  UserRound,
  AlertTriangle,
  FilePenLine,
  ScanSearch,
} from "lucide-react";

const cases = [
  {
    id: "CASE-2026-001",
    client: "Ahmed Raza",
    type: "Civil Litigation",
    status: "Active",
    hearing: "Oct 14, 2026",
    updated: "2 hours ago",
    priority: "High",
    description:
      "Civil dispute involving a property ownership claim and supporting legal documentation.",
  },
  {
    id: "CASE-2026-002",
    client: "Sana Malik",
    type: "Contract Dispute",
    status: "Active",
    hearing: "Oct 18, 2026",
    updated: "5 hours ago",
    priority: "Medium",
    description:
      "Contract dispute involving obligations, payment terms, and alleged breach of agreement.",
  },
  {
    id: "CASE-2026-003",
    client: "Usman Tariq",
    type: "Property Dispute",
    status: "Pending",
    hearing: "Oct 22, 2026",
    updated: "Yesterday",
    priority: "High",
    description:
      "Property-related dispute currently awaiting the next legal proceeding.",
  },
  {
    id: "CASE-2026-004",
    client: "Ayesha Khan",
    type: "Family Law",
    status: "Active",
    hearing: "Oct 27, 2026",
    updated: "Yesterday",
    priority: "Medium",
    description:
      "Family law matter involving legal documentation and upcoming proceedings.",
  },
];

const timeline = [
  {
    date: "Oct 08, 2026",
    title: "Documents indexed",
    description:
      "12 case documents were processed and added to the AI knowledge base.",
    icon: BrainCircuit,
  },
  {
    date: "Oct 06, 2026",
    title: "Case documents uploaded",
    description:
      "Property agreement and supporting evidence were uploaded.",
    icon: FileText,
  },
  {
    date: "Oct 04, 2026",
    title: "Case created",
    description:
      "The case was created and assigned to the legal workspace.",
    icon: BriefcaseBusiness,
  },
];

const documents = [
  {
    name: "Property_Agreement.pdf",
    type: "PDF",
    size: "2.4 MB",
    status: "Indexed",
  },
  {
    name: "Legal_Notice.pdf",
    type: "PDF",
    size: "1.1 MB",
    status: "Indexed",
  },
  {
    name: "Evidence_Report.docx",
    type: "DOCX",
    size: "840 KB",
    status: "Indexed",
  },
];

const CaseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentCase =
    cases.find((item) => item.id === id) || {
      id: id || "CASE-2026-001",
      client: "Unknown Client",
      type: "Legal Matter",
      status: "Active",
      hearing: "Not scheduled",
      updated: "Just now",
      priority: "Medium",
      description:
        "Case information is currently available in the legal workspace.",
    };

  const statusClass =
    currentCase.status === "Active"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
      : currentCase.status === "Pending"
      ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
      : "border-white/10 bg-white/5 text-white/60";

  const priorityClass =
    currentCase.priority === "High"
      ? "text-red-300 bg-red-400/10 border-red-400/20"
      : "text-amber-300 bg-amber-400/10 border-amber-400/20";

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* TOP BAR */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050505]/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[72px] max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <button
              onClick={() => navigate("/cases")}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/70 transition hover:bg-white/[0.08] hover:text-white"
              aria-label="Back to cases"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/40">
                  Case Details
                </span>

                <span className="hidden text-white/20 sm:inline">/</span>

                <span className="font-mono text-xs text-white/60">
                  {currentCase.id}
                </span>
              </div>

              <h1 className="mt-1 truncate text-lg font-semibold tracking-tight sm:text-xl">
                {currentCase.client}
              </h1>
            </div>
          </div>

          <Link
            to="/cases"
            className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white/75 transition hover:bg-white/[0.08] hover:text-white sm:flex"
          >
            All Cases
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* CASE HEADER */}
        <section className="rounded-3xl border border-white/10 bg-[#0c0c0c] p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${statusClass}`}
                >
                  {currentCase.status}
                </span>

                <span
                  className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${priorityClass}`}
                >
                  {currentCase.priority} Priority
                </span>

                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/50">
                  {currentCase.type}
                </span>
              </div>

              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                {currentCase.client}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
                {currentCase.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row xl:min-w-[350px] xl:justify-end">
              <button
                onClick={() =>
                  navigate(`/cases/${currentCase.id}/documents`)
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
              >
                <Upload size={17} />
                Upload Document
              </button>

              <button
                onClick={() =>
                  navigate(`/cases/${currentCase.id}/ai`)
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                <BrainCircuit size={17} />
                Open AI Workspace
              </button>
            </div>
          </div>
        </section>

        {/* MAIN GRID */}
        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* CASE OVERVIEW */}
            <section className="rounded-3xl border border-white/10 bg-[#0c0c0c]">
              <div className="border-b border-white/10 px-5 py-5 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                      Case Overview
                    </p>

                    <h3 className="mt-1 text-lg font-semibold">
                      Matter information
                    </h3>
                  </div>

                  <Scale size={20} className="text-white/35" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4">
                <InfoItem
                  icon={BriefcaseBusiness}
                  label="Case Type"
                  value={currentCase.type}
                />

                <InfoItem
                  icon={UserRound}
                  label="Client"
                  value={currentCase.client}
                />

                <InfoItem
                  icon={CalendarDays}
                  label="Next Hearing"
                  value={currentCase.hearing}
                />

                <InfoItem
                  icon={Clock3}
                  label="Last Updated"
                  value={currentCase.updated}
                />
              </div>
            </section>

            {/* CLIENT */}
            <section className="rounded-3xl border border-white/10 bg-[#0c0c0c] p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                    Client
                  </p>

                  <h3 className="mt-1 text-lg font-semibold">
                    Client information
                  </h3>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                  <UserRound size={19} className="text-white/65" />
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                  <p className="text-xs text-white/35">Full Name</p>
                  <p className="mt-2 text-sm font-medium text-white">
                    {currentCase.client}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                  <p className="text-xs text-white/35">Client Role</p>
                  <p className="mt-2 text-sm font-medium text-white">
                    Case Client
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                  <p className="text-xs text-white/35">Case ID</p>
                  <p className="mt-2 font-mono text-sm font-medium text-white">
                    {currentCase.id}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                  <p className="text-xs text-white/35">Case Status</p>
                  <p className="mt-2 text-sm font-medium text-emerald-300">
                    {currentCase.status}
                  </p>
                </div>
              </div>
            </section>

            {/* TIMELINE */}
            <section className="rounded-3xl border border-white/10 bg-[#0c0c0c] p-5 sm:p-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  Case Activity
                </p>

                <h3 className="mt-1 text-lg font-semibold">
                  Case timeline
                </h3>
              </div>

              <div className="mt-7">
                {timeline.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="relative flex gap-4 pb-7 last:pb-0"
                    >
                      {index !== timeline.length - 1 && (
                        <div className="absolute left-[19px] top-10 h-[calc(100%-18px)] w-px bg-white/10" />
                      )}

                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#111]">
                        <Icon size={17} className="text-white/65" />
                      </div>

                      <div className="min-w-0 pt-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-semibold">
                            {item.title}
                          </h4>

                          <span className="text-xs text-white/30">
                            {item.date}
                          </span>
                        </div>

                        <p className="mt-1 max-w-2xl text-sm leading-6 text-white/45">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* DOCUMENTS */}
            <section className="rounded-3xl border border-white/10 bg-[#0c0c0c]">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                    Documents
                  </p>

                  <h3 className="mt-1 text-lg font-semibold">
                    Case documents
                  </h3>
                </div>

                <button
                  onClick={() =>
                    navigate(`/cases/${currentCase.id}/documents`)
                  }
                  className="hidden items-center gap-1.5 text-xs font-semibold text-white/55 transition hover:text-white sm:flex"
                >
                  View all
                  <ChevronRight size={14} />
                </button>
              </div>

              <div className="divide-y divide-white/10">
                {documents.map((document) => (
                  <div
                    key={document.name}
                    className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                        <FileText
                          size={17}
                          className="text-white/55"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {document.name}
                        </p>

                        <p className="mt-1 text-xs text-white/35">
                          {document.type} · {document.size}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pl-[52px] sm:pl-0">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                        <CheckCircle2 size={12} />
                        {document.status}
                      </span>

                      <ChevronRight
                        size={15}
                        className="text-white/25"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <aside className="space-y-6">
            {/* AI SUMMARY */}
            <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0c]">
              <div className="border-b border-white/10 bg-gradient-to-br from-white/[0.07] to-transparent p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-white" />

                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                        Lexora Intelligence
                      </span>
                    </div>

                    <h3 className="mt-2 text-xl font-semibold">
                      AI Case Summary
                    </h3>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                    AI Ready
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-white/55">
                  Based on the currently indexed documents, the case appears
                  to involve a property ownership dispute. The available
                  documents indicate that the main issue is related to
                  ownership evidence and supporting agreements.
                </p>
              </div>

              <div className="grid grid-cols-2 divide-x divide-white/10">
                <div className="p-5">
                  <p className="text-2xl font-semibold">12</p>

                  <p className="mt-1 text-xs text-white/35">
                    Documents indexed
                  </p>
                </div>

                <div className="p-5">
                  <p className="text-2xl font-semibold">84%</p>

                  <p className="mt-1 text-xs text-white/35">
                    Knowledge coverage
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 p-4">
                <button
                  onClick={() =>
                    navigate(`/cases/${currentCase.id}/ai`)
                  }
                  className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold transition hover:bg-white/[0.08]"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquareText size={16} />
                    Ask Lexora AI
                  </span>

                  <ArrowUpRight
                    size={16}
                    className="text-white/45"
                  />
                </button>
              </div>
            </section>

            {/* AI INSIGHTS */}
            <section className="rounded-3xl border border-white/10 bg-[#0c0c0c] p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <BrainCircuit
                  size={17}
                  className="text-white/65"
                />

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                    AI Insights
                  </p>

                  <h3 className="mt-1 text-lg font-semibold">
                    Case intelligence
                  </h3>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Insight
                  icon={AlertTriangle}
                  title="Priority"
                  value={`${currentCase.priority} priority`}
                  description="Requires close review before the next hearing."
                  danger
                />

                <Insight
                  icon={ShieldCheck}
                  title="Document readiness"
                  value="84% indexed"
                  description="Most uploaded documents are available to AI."
                />

                <Insight
                  icon={CheckCircle2}
                  title="AI status"
                  value="Ready"
                  description="Case documents can be queried through RAG."
                />
              </div>
            </section>

            {/* NEXT HEARING */}
            <section className="rounded-3xl border border-white/10 bg-[#0c0c0c] p-5 sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                Next Event
              </p>

              <h3 className="mt-1 text-lg font-semibold">
                Upcoming hearing
              </h3>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <CalendarDays
                      size={18}
                      className="text-white/60"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      {currentCase.hearing}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/35">
                      Review case documents and AI insights before the next
                      proceeding.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ACTIONS */}
            <section className="rounded-3xl border border-white/10 bg-[#0c0c0c] p-5 sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                Quick Actions
              </p>

              <div className="mt-4 space-y-2">
                <ActionButton
                  icon={Upload}
                  label="Upload Document"
                  onClick={() =>
                    navigate(`/cases/${currentCase.id}/documents`)
                  }
                />

                <ActionButton
                  icon={BrainCircuit}
                  label="Open AI Workspace"
                  onClick={() =>
                    navigate(`/cases/${currentCase.id}/ai`)
                  }
                />

                {/* AI ANALYSIS */}
                <ActionButton
                  icon={ScanSearch}
                  label="View AI Analysis"
                  onClick={() =>
                    navigate(`/cases/${currentCase.id}/analysis`)
                  }
                />

                {/* LEGAL DRAFTING */}
                <ActionButton
                  icon={FilePenLine}
                  label="Legal Drafting"
                  onClick={() =>
                    navigate(`/cases/${currentCase.id}/drafting`)
                  }
                />

                <ActionButton
                  icon={MessageSquareText}
                  label="Ask a Legal Question"
                  onClick={() =>
                    navigate(`/cases/${currentCase.id}/ai`)
                  }
                />
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
};

const InfoItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="border-b border-white/10 p-5 sm:border-r lg:border-b-0 last:border-r-0">
      <div className="flex items-center gap-2 text-white/35">
        <Icon size={14} />

        <span className="text-[10px] font-semibold uppercase tracking-[0.15em]">
          {label}
        </span>
      </div>

      <p className="mt-3 text-sm font-semibold text-white">
        {value}
      </p>
    </div>
  );
};

const Insight = ({
  icon: Icon,
  title,
  value,
  description,
  danger = false,
}) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
            danger
              ? "border-red-400/15 bg-red-400/10 text-red-300"
              : "border-white/10 bg-white/[0.04] text-white/55"
          }`}
        >
          <Icon size={16} />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs text-white/35">{title}</p>

            <span className="text-xs font-semibold text-white/75">
              {value}
            </span>
          </div>

          <p className="mt-1 text-xs leading-5 text-white/35">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon: Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3.5 text-left transition hover:bg-white/[0.07]"
    >
      <span className="flex items-center gap-3 text-sm font-medium">
        <Icon size={16} className="text-white/55" />
        {label}
      </span>

      <ChevronRight size={15} className="text-white/25" />
    </button>
  );
};

export default CaseDetails;

