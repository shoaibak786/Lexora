import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  FileText,
  CalendarDays,
  BrainCircuit,
  FilePenLine,
  Settings,
  Search,
  Bell,
  Plus,
  ArrowUpRight,
  ChevronRight,
  Menu,
  X,
  Scale,
  Clock3,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  MoreHorizontal,
  LogOut,
  UserRound,
  Upload,
  MessageSquareText,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loggedInUser = JSON.parse(
    localStorage.getItem("lexoraLoggedInUser")
  ) || {
    name: "User",
    email: "",
    role: "Lawyer",
  };

  /* =========================
     DASHBOARD DATA
  ========================= */

  const stats = [
    {
      title: "Total Cases",
      value: "24",
      detail: "+4 this month",
      icon: BriefcaseBusiness,
    },
    {
      title: "Active Cases",
      value: "18",
      detail: "75% of total",
      icon: Scale,
    },
    {
      title: "Upcoming Hearings",
      value: "06",
      detail: "Next 30 days",
      icon: CalendarDays,
    },
    {
      title: "Documents",
      value: "148",
      detail: "+12 this week",
      icon: FileText,
    },
  ];

  const recentCases = [
    {
      id: "CASE-2026-001",
      title: "Property Dispute",
      client: "Ahmed Raza",
      status: "Active",
      hearing: "Oct 12, 2026",
    },
    {
      id: "CASE-2026-002",
      title: "Contract Dispute",
      client: "Hassan Traders",
      status: "Under Review",
      hearing: "Oct 16, 2026",
    },
    {
      id: "CASE-2026-003",
      title: "Family Matter",
      client: "Ayesha Malik",
      status: "Active",
      hearing: "Oct 21, 2026",
    },
    {
      id: "CASE-2026-004",
      title: "Corporate Agreement",
      client: "Nova Industries",
      status: "Drafting",
      hearing: "Oct 28, 2026",
    },
  ];

  const hearings = [
    {
      date: "12",
      month: "OCT",
      title: "Property Dispute Hearing",
      caseId: "CASE-2026-001",
      time: "10:30 AM",
      court: "Lahore High Court",
    },
    {
      date: "16",
      month: "OCT",
      title: "Contract Dispute",
      caseId: "CASE-2026-002",
      time: "11:00 AM",
      court: "Civil Court Lahore",
    },
    {
      date: "21",
      month: "OCT",
      title: "Family Matter",
      caseId: "CASE-2026-003",
      time: "09:45 AM",
      court: "Family Court Lahore",
    },
  ];

  const documents = [
    {
      name: "Property_Agreement.pdf",
      caseId: "CASE-2026-001",
      type: "PDF",
      time: "2 hours ago",
    },
    {
      name: "Contract_Review.docx",
      caseId: "CASE-2026-002",
      type: "DOCX",
      time: "Yesterday",
    },
    {
      name: "Evidence_Summary.pdf",
      caseId: "CASE-2026-003",
      type: "PDF",
      time: "2 days ago",
    },
  ];

  const navigation = [
    {
      label: "Overview",
      icon: LayoutDashboard,
      active: true,
    },
    {
      label: "Cases",
      icon: BriefcaseBusiness,
    },
    {
      label: "Documents",
      icon: FileText,
    },
    {
      label: "Hearings",
      icon: CalendarDays,
    },
    {
      label: "AI Insights",
      icon: BrainCircuit,
    },
    {
      label: "Drafts",
      icon: FilePenLine,
    },
    {
      label: "Settings",
      icon: Settings,
    },
  ];

  /* =========================
     LOGOUT
  ========================= */

const handleLogout = () => {
  localStorage.removeItem("lexoraLoggedInUser");
  navigate("/login");
};

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#111]">

      {/* =========================
          MOBILE OVERLAY
      ========================= */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[265px] flex-col border-r border-white/10 bg-[#09090a] text-white transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >

        {/* LOGO */}

        <div className="flex h-[76px] items-center justify-between border-b border-white/8 px-6">

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
              <Scale size={19} strokeWidth={2.2} />
            </div>

            <div>
              <div className="text-[17px] font-semibold tracking-[-0.04em]">
                Lexora
              </div>

              <div className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                Legal Intelligence
              </div>
            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* =========================
            PROFILE
        ========================= */}

        <div className="mx-4 mt-5 rounded-2xl border border-white/8 bg-white/[0.035] p-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-black">
              {loggedInUser.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {loggedInUser.name}
              </p>

              <p className="mt-0.5 text-[10px] text-zinc-500">
                {loggedInUser.role}
              </p>
            </div>

            <MoreHorizontal
              size={17}
              className="ml-auto text-zinc-600"
            />
          </div>
        </div>

        {/* =========================
            NAVIGATION
        ========================= */}

        <div className="mt-7 flex-1 overflow-y-auto px-4">

          <p className="mb-3 px-3 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
            Workspace
          </p>

          <nav className="space-y-1">

            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.label === "Cases") {
                      navigate("/cases");
                      setSidebarOpen(false);
                    }
                  }}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] transition ${item.active
                    ? "bg-white text-black"
                    : "text-zinc-500 hover:bg-white/[0.05] hover:text-white"
                    }`}
                >
                  <Icon
                    size={17}
                    strokeWidth={1.8}
                    className={
                      item.active
                        ? "text-black"
                        : "text-zinc-600 group-hover:text-zinc-300"
                    }
                  />

                  <span>{item.label}</span>

                  {item.label === "AI Insights" && (
                    <span
                      className={`ml-auto rounded-full px-2 py-0.5 text-[8px] ${item.active
                        ? "bg-black text-white"
                        : "bg-white/10 text-zinc-400"
                        }`}
                    >
                      AI
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* =========================
            SECURITY
        ========================= */}

        <div className="mx-4 mb-4 rounded-2xl border border-white/8 bg-white/[0.035] p-4">

          <div className="flex items-center gap-2">

            <ShieldCheck
              size={15}
              className="text-emerald-400"
            />

            <span className="text-[11px] font-medium text-zinc-300">
              Secure Workspace
            </span>

          </div>

          <p className="mt-2 text-[10px] leading-5 text-zinc-600">
            Your legal data is protected inside your private workspace.
          </p>

          <div className="mt-3 flex items-center gap-2 text-[10px] text-emerald-400">

            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            All systems secure
          </div>
        </div>

        {/* =========================
            PROFILE + LOGOUT
        ========================= */}

        <div className="border-t border-white/8 p-4">

          <button
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[12px] text-zinc-500 transition hover:bg-white/[0.05] hover:text-white"
          >
            <UserRound size={16} />
            Profile Settings
          </button>

          <button
            onClick={handleLogout}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[12px] text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={16} />
            Logout
          </button>

        </div>
      </aside>

      {/* =========================
          MAIN
      ========================= */}

      <main className="min-h-screen lg:pl-[265px]">

        {/* =========================
            TOPBAR
        ========================= */}

        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-black/8 bg-[#f7f7f8]/90 px-5 backdrop-blur-xl sm:px-7 lg:px-9">

          <div className="flex items-center gap-3">

            {/* MOBILE MENU */}

            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/8 bg-white lg:hidden"
            >
              <Menu size={18} />
            </button>

            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                Lawyer Workspace
              </p>

              <h1 className="mt-0.5 text-lg font-semibold tracking-[-0.04em] sm:text-xl">
                Good evening, {loggedInUser.name.split(" ")[0]}.
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">

            {/* SEARCH */}

            <button className="hidden h-10 items-center gap-2 rounded-xl border border-black/8 bg-white px-3 text-zinc-500 transition hover:border-black/15 sm:flex">
              <Search size={15} />

              <span className="text-xs">
                Search
              </span>

              <span className="ml-3 rounded-md border border-black/8 px-1.5 py-0.5 text-[9px] text-zinc-400">
                /
              </span>
            </button>

            {/* NOTIFICATION */}

            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-black/8 bg-white text-zinc-600 transition hover:text-black">

              <Bell size={17} />

              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
            </button>

            {/* NEW CASE */}

            <button className="hidden h-10 items-center gap-2 rounded-xl bg-[#111] px-4 text-xs font-medium text-white transition hover:bg-black sm:flex">
              <Plus size={15} />
              New Case
            </button>

          </div>
        </header>

        {/* =========================
            DASHBOARD CONTENT
        ========================= */}

        <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-7 lg:px-9 lg:py-9">

          {/* =========================
              OVERVIEW
          ========================= */}

          <section className="mb-7">

            <div className="mb-3 flex items-center gap-2">

              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                Overview
              </span>

            </div>

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>

                <h2 className="text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
                  Your legal command center.
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
                  Manage cases, documents, hearings and AI-powered legal
                  intelligence from one secure workspace.
                </p>

              </div>

              <button className="flex w-fit items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-xs font-medium transition hover:border-black/20 hover:bg-black hover:text-white">
                View activity
                <ArrowUpRight size={14} />
              </button>

            </div>
          </section>

          {/* =========================
              STATS
          ========================= */}

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat) => {

              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-black/8 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-black/15"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5f5f5]">
                      <Icon size={18} strokeWidth={1.8} />
                    </div>

                    <ArrowUpRight
                      size={15}
                      className="text-zinc-300"
                    />

                  </div>

                  <p className="mt-6 text-xs text-zinc-500">
                    {stat.title}
                  </p>

                  <div className="mt-1 flex items-end justify-between gap-3">

                    <p className="text-2xl font-semibold tracking-[-0.04em]">
                      {stat.value}
                    </p>

                    <span className="mb-1 text-[10px] text-zinc-400">
                      {stat.detail}
                    </span>

                  </div>
                </div>
              );
            })}
          </section>

          {/* =========================
              AI CASE INTELLIGENCE
          ========================= */}

          <section className="mt-6 overflow-hidden rounded-2xl bg-[#0a0a0b] text-white">

            <div className="relative p-6 sm:p-8">

              {/* GRID */}

              <div className="pointer-events-none absolute inset-0 opacity-[0.07]">

                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

              </div>

              <div className="relative grid gap-8 lg:grid-cols-[1.5fr_0.8fr] lg:items-center">

                {/* LEFT */}

                <div>

                  <div className="flex items-center gap-2">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                      <Sparkles size={16} />
                    </div>

                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
                      AI Case Intelligence
                    </span>

                  </div>

                  <h3 className="mt-5 max-w-2xl text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
                    Turn your case documents into legal intelligence.
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">
                    Lexora can understand your uploaded case documents,
                    retrieve relevant information and help you analyze
                    arguments, risks and evidence.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">

                    <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-medium text-black transition hover:bg-zinc-200">
                      <BrainCircuit size={15} />
                      Open AI Workspace
                    </button>

                    <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white">
                      <MessageSquareText size={15} />
                      Ask a Question
                    </button>

                  </div>

                </div>

                {/* RIGHT AI STATUS */}

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">

                  <div className="flex items-center justify-between">

                    <span className="text-xs text-zinc-400">
                      Intelligence Status
                    </span>

                    <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">

                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                      Ready

                    </span>

                  </div>

                  <div className="mt-6 space-y-5">

                    <div>

                      <div className="mb-2 flex items-center justify-between">

                        <span className="text-[10px] text-zinc-500">
                          Documents indexed
                        </span>

                        <span className="text-xs font-medium">
                          148
                        </span>

                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">

                        <div className="h-full w-[84%] rounded-full bg-white" />

                      </div>

                    </div>

                    <div className="flex items-center justify-between border-t border-white/8 pt-4">

                      <span className="text-[10px] text-zinc-500">
                        Knowledge coverage
                      </span>

                      <span className="text-xs font-medium">
                        84%
                      </span>

                    </div>

                    <div className="flex items-center justify-between">

                      <span className="text-[10px] text-zinc-500">
                        AI model
                      </span>

                      <span className="rounded-md bg-white/10 px-2 py-1 text-[9px] text-zinc-300">
                        Llama 3
                      </span>

                    </div>

                  </div>

                </div>

              </div>
            </div>
          </section>

          {/* =========================
              RECENT CASES + HEARINGS
          ========================= */}

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">

            {/* RECENT CASES */}

            <section className="rounded-2xl border border-black/8 bg-white">

              <div className="flex items-center justify-between border-b border-black/8 px-5 py-5 sm:px-6">

                <div>

                  <h3 className="text-sm font-semibold">
                    Recent Cases
                  </h3>

                  <p className="mt-1 text-[11px] text-zinc-500">
                    Your latest case activity
                  </p>

                </div>

                <button
                  onClick={() => navigate("/cases")}
                  className="flex items-center gap-1 text-[11px] font-medium text-zinc-500 transition hover:text-black"
                >
                  View all
                  <ChevronRight size={14} />
                </button>

              </div>

              <div className="divide-y divide-black/6">

                {recentCases.map((item) => (

                  <Link
                    key={item.id}
                    to={`/cases/${item.id}`}
                    className="group flex flex-col gap-4 px-5 py-5 transition hover:bg-[#fafafa] sm:flex-row sm:items-center sm:justify-between sm:px-6"
                  >

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f5f5f5]">
                        <BriefcaseBusiness
                          size={17}
                          className="text-zinc-600"
                        />
                      </div>

                      <div className="min-w-0">

                        <p className="truncate text-sm font-medium">
                          {item.title}
                        </p>

                        <p className="mt-1 text-[10px] text-zinc-400">
                          {item.id} · {item.client}
                        </p>

                      </div>

                    </div>

                    <div className="flex items-center justify-between gap-5 sm:justify-end">

                      <div>

                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-medium ${item.status === "Active"
                            ? "bg-emerald-50 text-emerald-600"
                            : item.status === "Drafting"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-amber-50 text-amber-600"
                            }`}
                        >
                          {item.status}
                        </span>

                        <p className="mt-1.5 text-[10px] text-zinc-400">
                          Hearing · {item.hearing}
                        </p>

                      </div>

                      <ChevronRight
                        size={15}
                        className="text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-zinc-600"
                      />

                    </div>

                  </Link>

                ))}
              </div>
            </section>

            {/* UPCOMING HEARINGS */}

            <section className="rounded-2xl border border-black/8 bg-white">

              <div className="flex items-center justify-between border-b border-black/8 px-5 py-5 sm:px-6">

                <div>

                  <h3 className="text-sm font-semibold">
                    Upcoming Hearings
                  </h3>

                  <p className="mt-1 text-[11px] text-zinc-500">
                    Next scheduled hearings
                  </p>

                </div>

                <CalendarDays
                  size={17}
                  className="text-zinc-400"
                />

              </div>

              <div className="divide-y divide-black/6">

                {hearings.map((hearing) => (

                  <div
                    key={hearing.caseId}
                    className="flex gap-4 px-5 py-5 sm:px-6"
                  >

                    <div className="flex h-[52px] w-[52px] shrink-0 flex-col items-center justify-center rounded-xl bg-[#f5f5f5]">

                      <span className="text-lg font-semibold leading-none">
                        {hearing.date}
                      </span>

                      <span className="mt-1 text-[8px] font-medium tracking-widest text-zinc-400">
                        {hearing.month}
                      </span>

                    </div>

                    <div className="min-w-0">

                      <p className="truncate text-xs font-medium">
                        {hearing.title}
                      </p>

                      <p className="mt-1 text-[10px] text-zinc-400">
                        {hearing.caseId}
                      </p>

                      <div className="mt-3 space-y-1.5 text-[10px] text-zinc-500">

                        <span className="flex items-center gap-1.5">
                          <Clock3 size={12} />
                          {hearing.time}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Scale size={12} />
                          {hearing.court}
                        </span>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

              <div className="border-t border-black/8 px-5 py-4 sm:px-6">

                <button className="flex items-center gap-1 text-[11px] font-medium text-zinc-500 transition hover:text-black">
                  View hearing calendar
                  <ChevronRight size={14} />
                </button>

              </div>

            </section>
          </div>

          {/* =========================
              DOCUMENTS + QUICK ACTIONS
          ========================= */}

          <div className="mt-6 grid gap-6 lg:grid-cols-2">

            {/* RECENT DOCUMENTS */}

            <section className="rounded-2xl border border-black/8 bg-white">

              <div className="flex items-center justify-between border-b border-black/8 px-5 py-5 sm:px-6">

                <div>

                  <h3 className="text-sm font-semibold">
                    Recent Documents
                  </h3>

                  <p className="mt-1 text-[11px] text-zinc-500">
                    Latest files added to your workspace
                  </p>

                </div>

                <FileText
                  size={17}
                  className="text-zinc-400"
                />

              </div>

              <div className="divide-y divide-black/6">

                {documents.map((document) => (

                  <div
                    key={document.name}
                    className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6"
                  >

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50">
                        <FileText
                          size={16}
                          className="text-red-500"
                        />
                      </div>

                      <div className="min-w-0">

                        <p className="truncate text-xs font-medium">
                          {document.name}
                        </p>

                        <p className="mt-1 text-[10px] text-zinc-400">
                          {document.caseId} · {document.time}
                        </p>

                      </div>

                    </div>

                    <span className="shrink-0 rounded-md bg-[#f5f5f5] px-2 py-1 text-[9px] font-medium text-zinc-500">
                      {document.type}
                    </span>

                  </div>

                ))}

              </div>

              <div className="border-t border-black/8 px-5 py-4 sm:px-6">

                <button className="flex items-center gap-1 text-[11px] font-medium text-zinc-500 transition hover:text-black">
                  Open document library
                  <ChevronRight size={14} />
                </button>

              </div>

            </section>

            {/* QUICK ACTIONS */}

            <section className="rounded-2xl border border-black/8 bg-white">

              <div className="border-b border-black/8 px-5 py-5 sm:px-6">

                <h3 className="text-sm font-semibold">
                  Quick Actions
                </h3>

                <p className="mt-1 text-[11px] text-zinc-500">
                  Start a legal workflow
                </p>

              </div>

              <div className="grid grid-cols-2 gap-3 p-5 sm:p-6">

                {/* CREATE CASE */}

                <button className="group rounded-2xl border border-black/8 p-4 text-left transition hover:border-black/20 hover:bg-[#fafafa]">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
                    <Plus size={17} />
                  </div>

                  <p className="mt-4 text-xs font-medium">
                    Create Case
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-zinc-400">
                    Start a new legal case
                  </p>

                </button>

                {/* UPLOAD */}

                <button className="group rounded-2xl border border-black/8 p-4 text-left transition hover:border-black/20 hover:bg-[#fafafa]">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f5f5]">
                    <Upload size={17} />
                  </div>

                  <p className="mt-4 text-xs font-medium">
                    Upload Document
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-zinc-400">
                    Add case evidence
                  </p>

                </button>

                {/* AI */}

                <button className="group rounded-2xl border border-black/8 p-4 text-left transition hover:border-black/20 hover:bg-[#fafafa]">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f5f5]">
                    <BrainCircuit size={17} />
                  </div>

                  <p className="mt-4 text-xs font-medium">
                    Ask Lexora AI
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-zinc-400">
                    Analyze your case
                  </p>

                </button>

                {/* DRAFT */}

                <button className="group rounded-2xl border border-black/8 p-4 text-left transition hover:border-black/20 hover:bg-[#fafafa]">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f5f5]">
                    <FilePenLine size={17} />
                  </div>

                  <p className="mt-4 text-xs font-medium">
                    Generate Draft
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-zinc-400">
                    Create legal documents
                  </p>

                </button>

              </div>

            </section>

          </div>

          {/* =========================
              FOOTER STATUS
          ========================= */}

          <div className="mt-7 flex flex-col justify-between gap-3 border-t border-black/8 pt-5 text-[10px] text-zinc-400 sm:flex-row sm:items-center">

            <p>
              Lexora Legal Intelligence · Lawyer Workspace
            </p>

            <div className="flex items-center gap-2">

              <CheckCircle2
                size={13}
                className="text-emerald-500"
              />

              All systems operational

            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;