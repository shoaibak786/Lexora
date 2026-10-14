import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Check,
  ChevronRight,
  FileSearch,
  Files,
  LockKeyhole,
  Menu,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050505] text-white">

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.07] bg-[#050505]/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">

          {/* LOGO */}
          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] transition group-hover:bg-white group-hover:text-black">
              <Scale size={17} strokeWidth={1.8} />
            </div>

            <div>
              <span className="text-[17px] font-semibold tracking-[-0.4px]">
                Lexora
              </span>

              <span className="ml-1.5 text-[9px] uppercase tracking-[2px] text-white/30">
                AI
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-9 md:flex">

            <a
              href="#platform"
              className="text-[13px] text-white/45 transition hover:text-white"
            >
              Platform
            </a>

            <a
              href="#intelligence"
              className="text-[13px] text-white/45 transition hover:text-white"
            >
              Intelligence
            </a>

            <a
              href="#workflow"
              className="text-[13px] text-white/45 transition hover:text-white"
            >
              Workflow
            </a>

            <a
              href="#security"
              className="text-[13px] text-white/45 transition hover:text-white"
            >
              Security
            </a>

          </div>

          {/* RIGHT */}
          <div className="hidden items-center gap-3 md:flex">

            <Link
              to="/login"
              className="px-4 py-2 text-[13px] font-medium text-white/60 transition hover:text-white"
            >
              Sign in
            </Link>

            <Link
              to="/login"
              className="group flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-[12px] font-semibold text-black transition hover:bg-white/90"
            >
              Get started
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] md:hidden"
          >
            {mobileMenu ? <X size={19} /> : <Menu size={19} />}
          </button>

        </div>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div className="border-t border-white/[0.07] bg-[#080808] px-5 py-6 md:hidden">

            <div className="flex flex-col gap-5">

              <a
                href="#platform"
                onClick={() => setMobileMenu(false)}
                className="text-sm text-white/60"
              >
                Platform
              </a>

              <a
                href="#intelligence"
                onClick={() => setMobileMenu(false)}
                className="text-sm text-white/60"
              >
                Intelligence
              </a>

              <a
                href="#workflow"
                onClick={() => setMobileMenu(false)}
                className="text-sm text-white/60"
              >
                Workflow
              </a>

              <a
                href="#security"
                onClick={() => setMobileMenu(false)}
                className="text-sm text-white/60"
              >
                Security
              </a>

              <Link
                to="/login"
                className="mt-2 rounded-lg bg-white px-5 py-3 text-center text-sm font-semibold text-black"
              >
                Get started
              </Link>

            </div>

          </div>
        )}
      </nav>


      {/* =====================================================
          HERO
      ====================================================== */}

      <main>

        <section className="relative min-h-screen overflow-hidden pt-[76px]">

          {/* GRID */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />

          {/* CENTER GLOW */}
          <div className="pointer-events-none absolute left-1/2 top-[15%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-white/[0.035] blur-[120px]" />

          {/* TOP LABEL */}
          <div className="relative mx-auto max-w-[1440px] px-5 pt-20 sm:px-8 lg:px-12 lg:pt-28">

            <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">

              {/* LEFT */}
              <div>

                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2">

                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/50" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white/70" />
                  </span>

                  <span className="text-[9px] font-medium uppercase tracking-[2px] text-white/50">
                    Private Legal Intelligence
                  </span>

                </div>

                <h1 className="max-w-[760px] text-[52px] font-semibold leading-[0.98] tracking-[-3px] sm:text-[68px] lg:text-[82px]">

                  Legal
                  <span className="block text-white/35">
                    intelligence.
                  </span>

                  <span className="mt-2 block">
                    Built around
                  </span>

                  <span className="block text-white/35">
                    your cases.
                  </span>

                </h1>

                <p className="mt-8 max-w-xl text-[15px] leading-7 text-white/45 sm:text-[16px]">
                  Lexora brings legal documents, case intelligence and
                  AI-assisted workflows into one private workspace built
                  for modern legal professionals.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-3">

                  <Link
                    to="/login"
                    className="group flex items-center gap-3 rounded-lg bg-white px-6 py-3.5 text-[12px] font-semibold text-black transition hover:bg-white/90"
                  >
                    Explore Lexora

                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>

                  <a
                    href="#platform"
                    className="flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3.5 text-[12px] font-medium text-white/55 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
                  >
                    View platform
                    <ChevronRight size={14} />
                  </a>

                </div>

                {/* MINI TRUST */}
                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">

                  <MiniTrust text="Private by design" />
                  <MiniTrust text="AI-assisted" />
                  <MiniTrust text="Case focused" />

                </div>

              </div>


              {/* RIGHT — PRODUCT PREVIEW */}
              <div className="relative lg:pt-8">

                {/* outer glow */}
                <div className="pointer-events-none absolute -inset-10 rounded-[50px] bg-white/[0.025] blur-[70px]" />

                <div className="relative">

                  {/* browser top */}
                  <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-black/70">

                    <div className="flex h-11 items-center justify-between border-b border-white/[0.07] px-4">

                      <div className="flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-white/15" />
                        <span className="h-2 w-2 rounded-full bg-white/15" />
                        <span className="h-2 w-2 rounded-full bg-white/15" />
                      </div>

                      <div className="rounded-md border border-white/[0.06] bg-white/[0.025] px-6 py-1">
                        <span className="text-[8px] text-white/25">
                          app.lexora.local
                        </span>
                      </div>

                      <div className="w-10" />

                    </div>

                    {/* APP */}
                    <div className="grid min-h-[510px] grid-cols-[58px_1fr] sm:grid-cols-[68px_1fr]">

                      {/* SIDEBAR */}
                      <div className="border-r border-white/[0.07] bg-[#080808] p-3">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
                          <Scale size={14} />
                        </div>

                        <div className="mt-10 flex flex-col items-center gap-6">

                          <div className="rounded-lg bg-white/[0.08] p-2 text-white">
                            <Files size={15} />
                          </div>

                          <div className="p-2 text-white/20">
                            <Search size={15} />
                          </div>

                          <div className="p-2 text-white/20">
                            <Brain size={15} />
                          </div>

                          <div className="p-2 text-white/20">
                            <FileSearch size={15} />
                          </div>

                        </div>

                      </div>


                      {/* DASHBOARD */}
                      <div className="bg-[#0c0c0c] p-5 sm:p-7">

                        <div className="flex items-start justify-between">

                          <div>
                            <p className="text-[8px] uppercase tracking-[1.8px] text-white/25">
                              Case workspace
                            </p>

                            <h3 className="mt-1.5 text-sm font-medium sm:text-base">
                              CASE-2026-001
                            </h3>
                          </div>

                          <div className="flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.06] px-2.5 py-1">

                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                            <span className="text-[8px] text-emerald-400">
                              Active
                            </span>

                          </div>

                        </div>


                        {/* STATS */}
                        <div className="mt-6 grid grid-cols-3 gap-2">

                          <PreviewStat
                            label="Documents"
                            value="24"
                          />

                          <PreviewStat
                            label="Insights"
                            value="12"
                          />

                          <PreviewStat
                            label="Hearings"
                            value="04"
                          />

                        </div>


                        {/* AI PANEL */}
                        <div className="mt-3 rounded-xl border border-white/[0.07] bg-white/[0.018] p-4">

                          <div className="flex items-center justify-between">

                            <div className="flex items-center gap-2.5">

                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
                                <Brain size={14} />
                              </div>

                              <div>
                                <p className="text-[10px] font-medium">
                                  Case Intelligence
                                </p>

                                <p className="mt-0.5 text-[7px] text-white/25">
                                  AI analysis
                                </p>
                              </div>

                            </div>

                            <span className="text-[9px] text-white/35">
                              94%
                            </span>

                          </div>

                          <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.08]">
                            <div className="h-full w-[94%] rounded-full bg-white" />
                          </div>

                        </div>


                        {/* DOCUMENTS + AI */}
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">

                          <div className="rounded-xl border border-white/[0.07] bg-white/[0.018] p-4">

                            <div className="flex items-center justify-between">

                              <p className="text-[8px] uppercase tracking-[1px] text-white/25">
                                Recent documents
                              </p>

                              <FileSearch
                                size={13}
                                className="text-white/25"
                              />

                            </div>

                            <div className="mt-4 space-y-3">

                              <DocumentRow
                                name="Case_Agreement.pdf"
                                meta="12 pages"
                              />

                              <DocumentRow
                                name="Legal_Notice.pdf"
                                meta="06 pages"
                              />

                              <DocumentRow
                                name="Evidence_01.pdf"
                                meta="18 pages"
                              />

                            </div>

                          </div>


                          <div className="rounded-xl border border-white/[0.07] bg-white/[0.018] p-4">

                            <div className="flex items-center gap-2">

                              <Sparkles
                                size={12}
                                className="text-white/40"
                              />

                              <p className="text-[8px] uppercase tracking-[1px] text-white/25">
                                AI insight
                              </p>

                            </div>

                            <p className="mt-4 text-[10px] leading-5 text-white/45">
                              Relevant clauses were identified across
                              8 documents in this case.
                            </p>

                            <div className="mt-4 flex items-center gap-2 text-[8px] text-white/25">

                              <Check size={11} />

                              Sources verified

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>


                  {/* FLOATING CARD */}
                  <div className="absolute -bottom-7 -left-6 hidden w-52 rounded-2xl border border-white/10 bg-[#101010]/95 p-4 shadow-2xl backdrop-blur-xl sm:block">

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-black">
                          <Sparkles size={12} />
                        </div>

                        <span className="text-[9px] font-medium">
                          AI Retrieval
                        </span>

                      </div>

                      <span className="text-[8px] text-emerald-400">
                        Ready
                      </span>

                    </div>

                    <div className="mt-3 flex gap-1">

                      <span className="h-1.5 w-[65%] rounded-full bg-white/15" />
                      <span className="h-1.5 w-[20%] rounded-full bg-white/5" />
                      <span className="h-1.5 w-[10%] rounded-full bg-white/5" />

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* HERO BOTTOM */}
          <div className="mx-auto mt-20 max-w-[1440px] border-t border-white/[0.07] px-5 py-8 sm:px-8 lg:px-12">

            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

              <p className="max-w-md text-[10px] uppercase leading-5 tracking-[1.5px] text-white/25">
                Intelligent tools for legal professionals,
                built around real case workflows.
              </p>

              <div className="flex gap-8 text-right">

                <HeroMetric
                  value="01"
                  label="Private workspace"
                />

                <HeroMetric
                  value="AI"
                  label="Case intelligence"
                />

                <HeroMetric
                  value="RAG"
                  label="Document research"
                />

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            PLATFORM
        ====================================================== */}

        <section
          id="platform"
          className="border-y border-white/[0.07] bg-[#080808] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
        >

          <div className="mx-auto max-w-[1440px]">

            <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">

              <div>

                <p className="text-[9px] font-semibold uppercase tracking-[2.5px] text-white/30">
                  The platform
                </p>

                <h2 className="mt-5 max-w-md text-4xl font-semibold leading-tight tracking-[-1.5px] sm:text-5xl">
                  Everything your case
                  <span className="text-white/35">
                    {" "}needs.
                  </span>
                </h2>

                <p className="mt-6 max-w-md text-sm leading-7 text-white/40">
                  From the first document upload to the final legal draft,
                  Lexora keeps the complete case workflow in one place.
                </p>

                <Link
                  to="/login"
                  className="group mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.5px] text-white/70 transition hover:text-white"
                >
                  Explore workspace
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

              </div>


              <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">

                <PlatformCard
                  number="01"
                  icon={<Files size={19} />}
                  title="Case Management"
                  text="Create cases, generate unique Case IDs, manage hearings, deadlines and case timelines."
                />

                <PlatformCard
                  number="02"
                  icon={<FileSearch size={19} />}
                  title="Document Intelligence"
                  text="Organize legal documents and find important information without manually searching every file."
                />

                <PlatformCard
                  number="03"
                  icon={<Brain size={19} />}
                  title="RAG Legal Research"
                  text="Ask questions about uploaded case documents and retrieve relevant information from your files."
                />

                <PlatformCard
                  number="04"
                  icon={<Sparkles size={19} />}
                  title="AI Legal Workflows"
                  text="Generate summaries, analyze arguments, identify risks and prepare legal drafts."
                />

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            INTELLIGENCE
        ====================================================== */}

        <section
          id="intelligence"
          className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
        >

          <div className="pointer-events-none absolute right-[-200px] top-1/3 h-[500px] w-[500px] rounded-full bg-white/[0.025] blur-[120px]" />

          <div className="relative mx-auto max-w-[1440px]">

            <div className="max-w-2xl">

              <p className="text-[9px] font-semibold uppercase tracking-[2.5px] text-white/30">
                Intelligence layer
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-1.5px] sm:text-5xl">
                Your documents become
                <span className="text-white/35">
                  {" "}searchable intelligence.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/40">
                Lexora is designed to connect your legal documents with
                intelligent retrieval, allowing case information to be
                found when you actually need it.
              </p>

            </div>


            <div className="mt-16 grid gap-4 lg:grid-cols-[1fr_1.2fr]">

              {/* DOCUMENT CARD */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#090909] p-6 sm:p-8">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <FileSearch size={17} />
                    </div>

                    <div>
                      <p className="text-xs font-medium">
                        Document intelligence
                      </p>

                      <p className="mt-1 text-[9px] text-white/25">
                        Case_Agreement.pdf
                      </p>
                    </div>

                  </div>

                  <span className="text-[9px] text-white/25">
                    12 pages
                  </span>

                </div>


                <div className="mt-8 space-y-3">

                  <AnalysisLine width="92%" />
                  <AnalysisLine width="76%" />
                  <AnalysisLine width="86%" />
                  <AnalysisLine width="61%" />
                  <AnalysisLine width="94%" />
                  <AnalysisLine width="70%" />

                </div>


                <div className="mt-8 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">

                  <p className="text-[8px] uppercase tracking-[1.5px] text-white/25">
                    Relevant section
                  </p>

                  <p className="mt-3 text-xs leading-6 text-white/50">
                    Agreement terms, obligations and relevant clauses
                    identified from the uploaded document.
                  </p>

                </div>

              </div>


              {/* AI QUERY */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#090909] p-6 sm:p-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                    <Brain size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-medium">
                      Ask your case
                    </p>

                    <p className="mt-1 text-[9px] text-white/25">
                      AI-assisted document research
                    </p>
                  </div>

                </div>


                <div className="mt-8 rounded-xl border border-white/10 bg-[#050505] p-4">

                  <p className="text-[11px] leading-6 text-white/70">
                    "What obligations does the agreement place on
                    the defendant?"
                  </p>

                </div>


                <div className="mt-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">

                  <div className="flex items-center gap-2">

                    <Sparkles size={13} className="text-white/50" />

                    <span className="text-[9px] font-semibold uppercase tracking-[1.2px] text-white/35">
                      Lexora response
                    </span>

                  </div>

                  <p className="mt-4 text-xs leading-7 text-white/50">
                    The agreement identifies several obligations
                    relating to compliance, payment and contractual
                    responsibilities.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">

                    <SourceTag text="Agreement · p.04" />
                    <SourceTag text="Clause 3.2" />
                    <SourceTag text="Clause 5.1" />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            WORKFLOW
        ====================================================== */}

        <section
          id="workflow"
          className="border-y border-white/[0.07] bg-[#080808] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
        >

          <div className="mx-auto max-w-[1440px]">

            <div className="max-w-2xl">

              <p className="text-[9px] font-semibold uppercase tracking-[2.5px] text-white/30">
                Case workflow
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-1.5px] sm:text-5xl">
                One case.
                <span className="text-white/35">
                  {" "}One intelligent workflow.
                </span>
              </h2>

            </div>


            <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-2 lg:grid-cols-4">

              <WorkflowStep
                number="01"
                title="Create"
                text="Register a case and generate a unique Case ID."
              />

              <WorkflowStep
                number="02"
                title="Understand"
                text="Upload and organize the documents connected to your case."
              />

              <WorkflowStep
                number="03"
                title="Analyze"
                text="Ask questions, retrieve evidence and explore AI-assisted insights."
              />

              <WorkflowStep
                number="04"
                title="Generate"
                text="Create summaries, legal drafts and exportable documents."
              />

            </div>

          </div>

        </section>


        {/* =====================================================
            SECURITY
        ====================================================== */}

        <section
          id="security"
          className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
        >

          <div className="mx-auto grid max-w-[1440px] items-center gap-16 lg:grid-cols-2">

            <div>

              <p className="text-[9px] font-semibold uppercase tracking-[2.5px] text-white/30">
                Privacy first
              </p>

              <h2 className="mt-5 max-w-xl text-4xl font-semibold tracking-[-1.5px] sm:text-5xl">
                Legal information
                <span className="text-white/35">
                  {" "}deserves control.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/40">
                Legal documents contain sensitive information. Lexora is
                designed around controlled access, case isolation and a
                privacy-focused AI workflow.
              </p>

              <div className="mt-8 space-y-4">

                <SecurityPoint text="Controlled case access" />
                <SecurityPoint text="Private document workspace" />
                <SecurityPoint text="Role-based user experience" />
                <SecurityPoint text="AI answers grounded in case documents" />

              </div>

            </div>


            <div className="relative">

              <div className="absolute -inset-8 rounded-full bg-white/[0.025] blur-[80px]" />

              <div className="relative rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 sm:p-10">

                <div className="flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black">
                    <ShieldCheck size={21} />
                  </div>

                  <span className="rounded-full border border-white/10 px-3 py-1 text-[8px] uppercase tracking-[1.5px] text-white/30">
                    Protected workspace
                  </span>

                </div>

                <h3 className="mt-10 text-xl font-semibold">
                  Case access control
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/35">
                  Only permitted users can access the information
                  associated with a case.
                </p>

                <div className="mt-8 space-y-3">

                  <AccessRow
                    icon={<LockKeyhole size={14} />}
                    title="Case documents"
                    status="Protected"
                  />

                  <AccessRow
                    icon={<Files size={14} />}
                    title="Case information"
                    status="Restricted"
                  />

                  <AccessRow
                    icon={<Brain size={14} />}
                    title="AI workspace"
                    status="Private"
                  />

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            FINAL CTA
        ====================================================== */}

        <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">

          <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] px-6 py-20 text-center sm:px-10">

            <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-white/[0.04] blur-[100px]" />

            <div className="relative">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                <Scale size={19} />
              </div>

              <p className="mt-7 text-[9px] uppercase tracking-[2.5px] text-white/25">
                Lexora
              </p>

              <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-[-1.5px] sm:text-5xl lg:text-6xl">
                Turn legal information
                <span className="text-white/35">
                  {" "}into intelligence.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/35">
                A private workspace for managing cases, understanding
                documents and working with AI-assisted legal intelligence.
              </p>

              <Link
                to="/login"
                className="group mt-9 inline-flex items-center gap-3 rounded-lg bg-white px-7 py-3.5 text-[12px] font-semibold text-black transition hover:bg-white/90"
              >
                Enter Lexora

                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

            </div>

          </div>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-white/[0.07] px-5 py-8 sm:px-8 lg:px-12">

        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 sm:flex-row sm:items-center">

          <div className="flex items-center gap-3">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10">
              <Scale size={14} />
            </div>

            <div>
              <span className="text-sm font-semibold">
                Lexora
              </span>

              <span className="ml-2 text-[8px] uppercase tracking-[1.5px] text-white/25">
                Intelligent Legal Platform
              </span>
            </div>

          </div>

          <p className="text-[9px] uppercase tracking-[1.5px] text-white/20">
            Intelligent Legal Case Document Analysis & Research
          </p>

        </div>

      </footer>

    </div>
  );
};


/* =========================================================
   COMPONENTS
========================================================= */

const MiniTrust = ({ text }) => {
  return (
    <div className="flex items-center gap-2">

      <span className="flex h-4 w-4 items-center justify-center rounded-full border border-white/10">
        <Check size={9} className="text-white/50" />
      </span>

      <span className="text-[9px] uppercase tracking-[1px] text-white/25">
        {text}
      </span>

    </div>
  );
};


const PreviewStat = ({ label, value }) => {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.018] p-3.5">

      <p className="text-[7px] uppercase tracking-[1px] text-white/25">
        {label}
      </p>

      <p className="mt-2 text-xl font-semibold tracking-tight">
        {value}
      </p>

    </div>
  );
};


const DocumentRow = ({ name, meta }) => {
  return (
    <div className="flex items-center justify-between gap-3">

      <div className="flex min-w-0 items-center gap-2">

        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/[0.05]">
          <Files size={11} className="text-white/30" />
        </div>

        <div className="min-w-0">

          <p className="truncate text-[8px] text-white/50">
            {name}
          </p>

          <p className="mt-0.5 text-[7px] text-white/20">
            {meta}
          </p>

        </div>

      </div>

      <Check size={10} className="shrink-0 text-white/25" />

    </div>
  );
};


const HeroMetric = ({ value, label }) => {
  return (
    <div>

      <p className="text-sm font-semibold tracking-tight text-white/60">
        {value}
      </p>

      <p className="mt-1 text-[7px] uppercase tracking-[1px] text-white/20">
        {label}
      </p>

    </div>
  );
};


const PlatformCard = ({ number, icon, title, text }) => {
  return (
    <div className="group bg-[#0b0b0b] p-7 transition hover:bg-[#101010] sm:p-8">

      <div className="flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-white/60 transition group-hover:bg-white group-hover:text-black">
          {icon}
        </div>

        <span className="text-[9px] tracking-[1px] text-white/20">
          {number}
        </span>

      </div>

      <h3 className="mt-7 text-base font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-[12px] leading-6 text-white/35">
        {text}
      </p>

      <div className="mt-7 h-px w-8 bg-white/20 transition-all group-hover:w-14" />

    </div>
  );
};


const AnalysisLine = ({ width }) => {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/[0.035]">
      <div
        className="h-full rounded-full bg-white/[0.12]"
        style={{ width }}
      />
    </div>
  );
};


const SourceTag = ({ text }) => {
  return (
    <span className="inline-flex rounded-md border border-white/[0.07] bg-white/[0.025] px-2.5 py-1.5 text-[8px] text-white/30">
      {text}
    </span>
  );
};


const WorkflowStep = ({ number, title, text }) => {
  return (
    <div className="group bg-[#0b0b0b] p-7 transition hover:bg-[#101010] lg:p-9">

      <span className="text-[10px] font-semibold tracking-[2px] text-white/25">
        {number}
      </span>

      <h3 className="mt-8 text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-[12px] leading-6 text-white/35">
        {text}
      </p>

      <div className="mt-8 flex items-center gap-2 text-[8px] uppercase tracking-[1.5px] text-white/20">
        <span className="h-px w-5 bg-white/20 transition-all group-hover:w-8" />
        Lexora workflow
      </div>

    </div>
  );
};


const SecurityPoint = ({ text }) => {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
        <Check size={11} className="text-white/50" />
      </div>

      <span className="text-xs text-white/45">
        {text}
      </span>

    </div>
  );
};


const AccessRow = ({ icon, title, status }) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.018] px-4 py-3">

      <div className="flex items-center gap-3">

        <div className="text-white/30">
          {icon}
        </div>

        <span className="text-[10px] text-white/45">
          {title}
        </span>

      </div>

      <span className="text-[8px] uppercase tracking-[1px] text-white/25">
        {status}
      </span>

    </div>
  );
};


export default Home;