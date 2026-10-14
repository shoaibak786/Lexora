import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Brain,
  CheckCircle2,
  ChevronRight,
  FileText,
  Flag,
  Lightbulb,
  Scale,
  ShieldAlert,
  Sparkles,
  Target,
  TriangleAlert,
  CalendarDays,
  Database,
  RefreshCw,
  Search,
} from "lucide-react";

const AIAnalysis = () => {
  const { id } = useParams();

  const [activeSection, setActiveSection] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const caseId = id || "CASE-2026-001";

  // Case-specific information
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

  const caseInfo = {
    id: caseId,
    client: currentCase.client,
    type: currentCase.type,
    status: "Active",
    documents: 12,
    coverage: 84,
    model: "Llama 3",
    lastAnalyzed: "Oct 08, 2026",
  };

  const facts = [
    "The dispute concerns ownership and possession of the property mentioned in the uploaded agreement.",
    "The client claims that the property was legally transferred through the documented agreement.",
    "A legal notice was issued after the opposing party challenged the client's ownership position.",
    "Supporting evidence includes the property agreement, legal notice, evidence report, and court order.",
  ];

  const legalIssues = [
    {
      title: "Ownership Validity",
      description:
        "Whether the available agreement and supporting evidence sufficiently establish the client's ownership claim.",
      confidence: "94%",
    },
    {
      title: "Possession Dispute",
      description:
        "Whether the opposing party has a legally supportable claim over current possession of the property.",
      confidence: "89%",
    },
    {
      title: "Documentary Evidence",
      description:
        "Whether the uploaded documents provide a consistent chain of evidence supporting the client's position.",
      confidence: "91%",
    },
  ];

  const strengths = [
    "Property agreement is available and indexed.",
    "Multiple supporting documents are available for cross-reference.",
    "Evidence report supports important factual claims.",
    "Case documents show a consistent ownership narrative.",
  ];

  const risks = [
    "Some supporting ownership evidence may require additional verification.",
    "The opposing party's possession claim needs further document-level analysis.",
    "Important dates should be cross-checked against the court record.",
    "Additional evidence may be required to strengthen the ownership timeline.",
  ];

  const evidence = [
    {
      name: "Property_Agreement.pdf",
      page: "Page 4",
      relevance: "96%",
      status: "Strong",
    },
    {
      name: "Legal_Notice.pdf",
      page: "Page 2",
      relevance: "91%",
      status: "Relevant",
    },
    {
      name: "Evidence_Report.docx",
      page: "Page 7",
      relevance: "87%",
      status: "Strong",
    },
    {
      name: "Court_Order.pdf",
      page: "Page 3",
      relevance: "82%",
      status: "Relevant",
    },
  ];

  const dates = [
    {
      date: "Oct 14, 2026",
      title: "Upcoming Hearing",
      type: "Hearing",
    },
    {
      date: "Oct 08, 2026",
      title: "Property Agreement Indexed",
      type: "Document",
    },
    {
      date: "Oct 06, 2026",
      title: "Legal Notice Indexed",
      type: "Document",
    },
    {
      date: "Oct 03, 2026",
      title: "Ownership Evidence Added",
      type: "Evidence",
    },
  ];

  const missingInformation = [
    "Complete chain of ownership documents",
    "Detailed possession history",
    "Any witness statements supporting the client's claim",
  ];

  const recommendations = [
    "Verify the complete ownership chain before the next hearing.",
    "Cross-reference the legal notice with the original property agreement.",
    "Review the opposing party's evidence and identify contradictions.",
    "Upload any missing ownership or witness documents for deeper AI analysis.",
  ];

  const analysisScore = useMemo(() => {
    return Math.round(
      (caseInfo.coverage + 91 + 88 + 86) / 4
    );
  }, [caseInfo.coverage]);

  const handleRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 1600);
  };

  const sections = [
    { id: "overview", label: "Overview", icon: Brain },
    { id: "issues", label: "Legal Issues", icon: Scale },
    { id: "evidence", label: "Evidence", icon: FileText },
    { id: "risks", label: "Risks", icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-[#080808]">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              to={`/cases/${caseInfo.id}`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition hover:border-white/20 hover:bg-white/[0.07]"
            >
              <ArrowLeft size={18} />
            </Link>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-lg font-semibold sm:text-xl">
                  AI Case Analysis
                </h1>

                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                  AI Powered
                </span>
              </div>

              <p className="mt-1 text-xs text-white/40 sm:text-sm">
                {caseInfo.id} · {caseInfo.client} · {caseInfo.type}
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Link
              to={`/cases/${caseInfo.id}/documents`}
              className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-white/70 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
            >
              Documents
            </Link>

            <Link
              to={`/cases/${caseInfo.id}/ai`}
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Ask Lexora AI
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* CASE SUMMARY HEADER */}
        <section className="mb-6 rounded-2xl border border-white/10 bg-[#0b0b0b] p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/60">
                  {caseInfo.id}
                </span>

                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                  {caseInfo.status}
                </span>
              </div>

              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Intelligence Report
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">
                Lexora analyzed the indexed case documents and generated
                structured legal intelligence based on the available evidence.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3">
                <div className="text-[10px] uppercase tracking-[0.16em] text-white/35">
                  Last analyzed
                </div>
                <div className="mt-1 text-sm font-medium text-white/75">
                  {caseInfo.lastAnalyzed}
                </div>
              </div>

              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white/70 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >
                <RefreshCw
                  size={16}
                  className={isRefreshing ? "animate-spin" : ""}
                />
                Re-analyze
              </button>
            </div>
          </div>
        </section>

        {/* AI METRICS */}
        <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MetricCard
            icon={Brain}
            label="AI Confidence"
            value={`${analysisScore}%`}
            detail="Overall analysis"
          />

          <MetricCard
            icon={Database}
            label="Documents"
            value={caseInfo.documents}
            detail="Indexed documents"
          />

          <MetricCard
            icon={Search}
            label="Knowledge Coverage"
            value={`${caseInfo.coverage}%`}
            detail="Retrieval coverage"
          />

          <MetricCard
            icon={Sparkles}
            label="AI Model"
            value={caseInfo.model}
            detail="Local intelligence"
          />
        </section>

        {/* NAVIGATION */}
        <section className="mb-6 overflow-x-auto">
          <div className="flex min-w-max items-center gap-2 rounded-xl border border-white/10 bg-[#0b0b0b] p-1.5">
            {sections.map((section) => {
              const Icon = section.icon;
              const active = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-white text-black"
                      : "text-white/50 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <Icon size={15} />
                  {section.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* AI SUMMARY */}
        {activeSection === "overview" && (
          <div className="space-y-6">
            <section className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5 sm:p-7">
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                  <Brain size={21} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                    AI Generated Summary
                  </p>
                  <h3 className="mt-1 text-xl font-semibold">
                    Case intelligence overview
                  </h3>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.025] p-5">
                <p className="text-sm leading-7 text-white/65">
                  Based on the currently indexed documents, the case primarily
                  concerns a property ownership and possession dispute. The
                  available agreement and supporting evidence appear to provide
                  a meaningful foundation for the client's position. However,
                  the ownership chain and possession history should be further
                  verified before the upcoming hearing.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <AnalysisTag text="Ownership Dispute" />
                  <AnalysisTag text="Property Evidence" />
                  <AnalysisTag text="Document Review" />
                  <AnalysisTag text="Active Litigation" />
                </div>
              </div>
            </section>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* KEY FACTS */}
              <AnalysisListCard
                icon={CheckCircle2}
                title="Key Facts Identified"
                items={facts}
                iconClass="text-emerald-300"
                iconBg="bg-emerald-400/10 border-emerald-400/20"
              />

              {/* STRENGTHS */}
              <AnalysisListCard
                icon={Target}
                title="Case Strengths"
                items={strengths}
                iconClass="text-blue-300"
                iconBg="bg-blue-400/10 border-blue-400/20"
              />
            </div>

            {/* RECOMMENDATIONS */}
            <section className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5 sm:p-7">
              <SectionHeading
                icon={Lightbulb}
                label="Recommended Next Steps"
                title="What Lexora recommends"
              />

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {recommendations.map((item, index) => (
                  <Recommendation
                    key={index}
                    number={index + 1}
                    text={item}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* LEGAL ISSUES */}
        {activeSection === "issues" && (
          <div className="space-y-6">
            <section className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5 sm:p-7">
              <SectionHeading
                icon={Scale}
                label="NLP / Legal Issue Detection"
                title="Legal issues identified"
              />

              <div className="mt-6 space-y-3">
                {legalIssues.map((issue, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-white/15"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex gap-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-sm font-semibold text-white/60">
                          0{index + 1}
                        </div>

                        <div>
                          <h4 className="font-semibold">{issue.title}</h4>
                          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/45">
                            {issue.description}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-300">
                        {issue.confidence} confidence
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <AnalysisListCard
                icon={Target}
                title="Potential Strengths"
                items={strengths}
                iconClass="text-emerald-300"
                iconBg="bg-emerald-400/10 border-emerald-400/20"
              />

              <AnalysisListCard
                icon={ShieldAlert}
                title="Potential Risks"
                items={risks}
                iconClass="text-amber-300"
                iconBg="bg-amber-400/10 border-amber-400/20"
              />
            </section>
          </div>
        )}

        {/* EVIDENCE */}
        {activeSection === "evidence" && (
          <div className="space-y-6">
            <section className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5 sm:p-7">
              <SectionHeading
                icon={FileText}
                label="Evidence Intelligence"
                title="Most relevant case documents"
              />

              <div className="mt-6 space-y-3">
                {evidence.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-white/60">
                        <FileText size={18} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white/85">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs text-white/35">
                          {item.page} · {item.status}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:justify-end">
                      <div className="min-w-[110px]">
                        <div className="mb-1 flex justify-between text-[10px] uppercase tracking-wider text-white/35">
                          <span>Relevance</span>
                          <span>{item.relevance}</span>
                        </div>

                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-emerald-400"
                            style={{ width: item.relevance }}
                          />
                        </div>
                      </div>

                      <ChevronRight
                        size={17}
                        className="text-white/25"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* GROUNDING */}
            <section className="grid gap-4 sm:grid-cols-3">
              <GroundingCard
                label="Retrieved Sources"
                value="04"
                detail="High relevance"
              />
              <GroundingCard
                label="Evidence Match"
                value="91%"
                detail="Cross-document"
              />
              <GroundingCard
                label="Grounding"
                value="Strong"
                detail="Source-backed AI"
              />
            </section>
          </div>
        )}

        {/* RISKS */}
        {activeSection === "risks" && (
          <div className="space-y-6">
            <section className="rounded-2xl border border-amber-400/15 bg-[#0b0b0b] p-5 sm:p-7">
              <SectionHeading
                icon={TriangleAlert}
                label="Risk Intelligence"
                title="Potential risks requiring attention"
              />

              <div className="mt-6 space-y-3">
                {risks.map((risk, index) => (
                  <div
                    key={index}
                    className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-4"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-400/20 bg-amber-400/10 text-amber-300">
                      <Flag size={15} />
                    </div>

                    <div>
                      <p className="text-sm leading-6 text-white/70">
                        {risk}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* MISSING INFO */}
            <section className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5 sm:p-7">
              <SectionHeading
                icon={Search}
                label="Knowledge Gaps"
                title="Information Lexora could not find"
              />

              <div className="mt-6 space-y-3">
                {missingInformation.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-xs font-semibold text-white/50">
                      {index + 1}
                    </div>

                    <p className="text-sm text-white/65">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* HEARINGS / DATES */}
            <section className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5 sm:p-7">
              <SectionHeading
                icon={CalendarDays}
                label="Timeline Intelligence"
                title="Important dates detected"
              />

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {dates.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-white/10 bg-white/[0.025] p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-white/80">
                        {item.date}
                      </span>

                      <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/40">
                        {item.type}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-white/50">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* FOOTER ACTIONS */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-[#0b0b0b] p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={17} className="text-emerald-300" />
                <h3 className="font-semibold">Continue with Lexora</h3>
              </div>

              <p className="mt-1 text-sm text-white/40">
                Use the analyzed case intelligence to research, review or
                generate legal documents.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to={`/cases/${caseInfo.id}`}
                className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white"
              >
                Case Details
              </Link>

              <Link
                to={`/cases/${caseInfo.id}/documents`}
                className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white"
              >
                View Documents
              </Link>

              <Link
                to={`/cases/${caseInfo.id}/ai`}
                className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Open AI Workspace
                <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

/* =========================
   COMPONENTS
========================= */

const MetricCard = ({ icon: Icon, label, value, detail }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05] text-white/55">
          <Icon size={17} />
        </div>

        <Sparkles size={14} className="text-white/20" />
      </div>

      <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-white/30">
        {label}
      </p>

      <p className="mt-1 truncate text-xl font-semibold text-white">
        {value}
      </p>

      <p className="mt-1 text-xs text-white/35">{detail}</p>
    </div>
  );
};

const SectionHeading = ({ icon: Icon, label, title }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60">
        <Icon size={18} />
      </div>

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
          {label}
        </p>

        <h3 className="mt-1 text-xl font-semibold">{title}</h3>
      </div>
    </div>
  );
};

const AnalysisListCard = ({
  icon: Icon,
  title,
  items,
  iconClass,
  iconBg,
}) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${iconBg} ${iconClass}`}
        >
          <Icon size={18} />
        </div>

        <h3 className="font-semibold">{title}</h3>
      </div>

      <div className="mt-5 space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5"
          >
            <CheckCircle2
              size={16}
              className={`mt-0.5 shrink-0 ${iconClass}`}
            />

            <p className="text-sm leading-6 text-white/55">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const AnalysisTag = ({ text }) => {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/50">
      {text}
    </span>
  );
};

const Recommendation = ({ number, text }) => {
  return (
    <div className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
        {number}
      </div>

      <div className="flex items-center">
        <p className="text-sm leading-6 text-white/60">{text}</p>
      </div>
    </div>
  );
};

const GroundingCard = ({ label, value, detail }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5">
      <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold">{value}</p>

      <p className="mt-1 text-xs text-emerald-300/70">{detail}</p>
    </div>
  );
};

export default AIAnalysis;