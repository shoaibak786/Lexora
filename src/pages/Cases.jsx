
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Filter,
  Plus,
  Search,
  X,
  UserRound,
  Scale,
  CircleDot,
} from "lucide-react";

const initialCases = [
  {
    id: "CASE-2026-001",
    client: "Ahmed Raza",
    type: "Civil Litigation",
    status: "Active",
    hearing: "Oct 14, 2026",
    updated: "2 hours ago",
  },
  {
    id: "CASE-2026-002",
    client: "Sana Malik",
    type: "Contract Dispute",
    status: "Active",
    hearing: "Oct 18, 2026",
    updated: "Yesterday",
  },
  {
    id: "CASE-2026-003",
    client: "Usman Tariq",
    type: "Property Dispute",
    status: "Pending",
    hearing: "Oct 22, 2026",
    updated: "2 days ago",
  },
  {
    id: "CASE-2026-004",
    client: "Ayesha Khan",
    type: "Family Law",
    status: "Active",
    hearing: "Oct 27, 2026",
    updated: "3 days ago",
  },
  {
    id: "CASE-2026-005",
    client: "Bilal Ahmed",
    type: "Criminal Defense",
    status: "Closed",
    hearing: "Completed",
    updated: "1 week ago",
  },
  {
    id: "CASE-2026-006",
    client: "Hira Shah",
    type: "Employment Dispute",
    status: "Pending",
    hearing: "Nov 02, 2026",
    updated: "1 week ago",
  },
  {
    id: "CASE-2026-007",
    client: "Hamza Ali",
    type: "Corporate Law",
    status: "Active",
    hearing: "Nov 05, 2026",
    updated: "2 weeks ago",
  },
];

const statusStyles = {
  Active: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  Pending: {
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dot: "bg-amber-400",
  },
  Closed: {
    badge: "bg-white/5 text-slate-400 border-white/10",
    dot: "bg-slate-500",
  },
};

const caseTypes = [
  "All Types",
  "Civil Litigation",
  "Contract Dispute",
  "Property Dispute",
  "Family Law",
  "Criminal Defense",
  "Employment Dispute",
  "Corporate Law",
];

const Cases = () => {
  const [cases, setCases] = useState(initialCases);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [typeFilter, setTypeFilter] = useState("All Types");

  const [showModal, setShowModal] = useState(false);

  const [newCase, setNewCase] = useState({
    client: "",
    type: "Civil Litigation",
    description: "",
  });

  const filteredCases = useMemo(() => {
    return cases.filter((item) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        item.id.toLowerCase().includes(searchValue) ||
        item.client.toLowerCase().includes(searchValue) ||
        item.type.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All Status" || item.status === statusFilter;

      const matchesType =
        typeFilter === "All Types" || item.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [cases, search, statusFilter, typeFilter]);

  const totalCases = cases.length;
  const activeCases = cases.filter((item) => item.status === "Active").length;
  const pendingCases = cases.filter((item) => item.status === "Pending").length;
  const closedCases = cases.filter((item) => item.status === "Closed").length;

  const handleCreateCase = (e) => {
    e.preventDefault();

    if (!newCase.client.trim()) return;

    const nextNumber = cases.length + 1;

    const generatedCase = {
      id: `CASE-2026-${String(nextNumber).padStart(3, "0")}`,
      client: newCase.client,
      type: newCase.type,
      status: "Active",
      hearing: "Not scheduled",
      updated: "Just now",
    };

    setCases((prev) => [generatedCase, ...prev]);

    setNewCase({
      client: "",
      type: "Civil Litigation",
      description: "",
    });

    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* TOP HEADER */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050505]/95 backdrop-blur-xl">
        <div className="flex h-[72px] items-center justify-between px-5 sm:px-7 lg:px-9">
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft size={18} />
            </Link>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Workspace
              </p>

              <h1 className="text-[18px] font-semibold tracking-[-0.02em] text-white">
                Case Management
              </h1>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-slate-200"
          >
            <Plus size={17} />
            <span className="hidden sm:inline">New Case</span>
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-[1500px] px-5 py-7 sm:px-7 lg:px-9 lg:py-9">
        {/* PAGE INTRO */}
        <section className="mb-7">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
                <BriefcaseBusiness size={16} />
                <span>Cases</span>
                <span>/</span>
                <span className="text-slate-300">All Cases</span>
              </div>

              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Your cases, organized.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-[15px]">
                Manage active matters, track upcoming hearings, and keep every
                case connected to its legal intelligence workspace.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 lg:block">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5">
                  <Scale size={18} className="text-slate-300" />
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Workspace status
                  </p>

                  <div className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-slate-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    All systems operational
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          <StatCard
            title="Total Cases"
            value={totalCases}
            icon={<BriefcaseBusiness size={18} />}
            description="All matters"
          />

          <StatCard
            title="Active Cases"
            value={activeCases}
            icon={<CircleDot size={18} />}
            description="Currently active"
            accent="green"
          />

          <StatCard
            title="Pending Cases"
            value={pendingCases}
            icon={<Clock3 size={18} />}
            description="Awaiting action"
            accent="amber"
          />

          <StatCard
            title="Closed Cases"
            value={closedCases}
            icon={<CheckCircle2 size={18} />}
            description="Completed matters"
            accent="gray"
          />
        </section>

        {/* CASE LIST */}
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]">
          {/* TOOLBAR */}
          <div className="border-b border-white/10 p-4 sm:p-5">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              {/* SEARCH */}
              <div className="relative w-full xl:max-w-md">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by case ID, client or case type..."
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-white/25 focus:bg-white/[0.05]"
                />
              </div>

              {/* FILTERS */}
              <div className="flex flex-col gap-2 sm:flex-row">
                <FilterSelect
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={["All Status", "Active", "Pending", "Closed"]}
                />

                <FilterSelect
                  value={typeFilter}
                  onChange={setTypeFilter}
                  options={caseTypes}
                />

                {(search ||
                  statusFilter !== "All Status" ||
                  typeFilter !== "All Types") && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("All Status");
                      setTypeFilter("All Types");
                    }}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                  >
                    <X size={15} />
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RESULT HEADER */}
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-slate-500" />

              <span className="text-sm font-medium text-slate-300">
                {filteredCases.length}{" "}
                {filteredCases.length === 1 ? "case" : "cases"}
              </span>
            </div>

            <div className="hidden items-center gap-1.5 text-xs text-slate-600 sm:flex">
              <Filter size={13} />
              Filtered results
            </div>
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Case
                  </th>

                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Client
                  </th>

                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Case Type
                  </th>

                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Next Hearing
                  </th>

                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Updated
                  </th>

                  <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredCases.map((item) => (
                  <CaseRow key={item.id} item={item} />
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="divide-y divide-white/5 md:hidden">
            {filteredCases.map((item) => (
              <MobileCaseCard key={item.id} item={item} />
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredCases.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
                <Search size={20} className="text-slate-500" />
              </div>

              <h3 className="text-base font-semibold text-white">
                No cases found
              </h3>

              <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">
                Try changing your search or filters to find the case you're
                looking for.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* NEW CASE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#101010] shadow-2xl">
            {/* MODAL HEADER */}
            <div className="flex items-start justify-between border-b border-white/10 px-5 py-5 sm:px-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Case Management
                </p>

                <h3 className="mt-1 text-xl font-semibold tracking-[-0.025em] text-white">
                  Create a new case
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Start a new matter and generate a unique case ID.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleCreateCase} className="p-5 sm:p-6">
              {/* GENERATED ID */}
              <div className="mb-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Generated Case ID
                    </p>

                    <p className="mt-1 font-mono text-sm font-semibold text-white">
                      CASE-2026-
                      {String(cases.length + 1).padStart(3, "0")}
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-300">
                    <BriefcaseBusiness size={17} />
                  </div>
                </div>
              </div>

              {/* CLIENT */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-semibold text-slate-200">
                  Client Name
                </label>

                <div className="relative">
                  <UserRound
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="text"
                    value={newCase.client}
                    onChange={(e) =>
                      setNewCase({
                        ...newCase,
                        client: e.target.value,
                      })
                    }
                    placeholder="Enter client name"
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-white/25"
                    required
                  />
                </div>
              </div>

              {/* CASE TYPE */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-semibold text-slate-200">
                  Case Type
                </label>

                <div className="relative">
                  <select
                    value={newCase.type}
                    onChange={(e) =>
                      setNewCase({
                        ...newCase,
                        type: e.target.value,
                      })
                    }
                    className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-[#151515] px-4 pr-10 text-sm text-white outline-none transition focus:border-white/25"
                  >
                    {caseTypes
                      .filter((type) => type !== "All Types")
                      .map((type) => (
                        <option key={type} className="bg-[#151515] text-white">
                          {type}
                        </option>
                      ))}
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-semibold text-slate-200">
                  Case Description
                  <span className="ml-1 font-normal text-slate-500">
                    (Optional)
                  </span>
                </label>

                <textarea
                  value={newCase.description}
                  onChange={(e) =>
                    setNewCase({
                      ...newCase,
                      description: e.target.value,
                    })
                  }
                  placeholder="Briefly describe the matter..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-white/25"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="h-11 rounded-xl border border-white/10 px-5 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-black transition hover:bg-slate-200"
                >
                  <Plus size={16} />
                  Create Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------------- STAT CARD ---------------- */

const StatCard = ({
  title,
  value,
  icon,
  description,
  accent = "default",
}) => {
  const iconClasses = {
    default: "bg-white/5 text-slate-300",
    green: "bg-emerald-500/10 text-emerald-400",
    amber: "bg-amber-500/10 text-amber-400",
    gray: "bg-white/5 text-slate-400",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-4 sm:p-5 transition hover:border-white/15">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
            {value}
          </p>

          <p className="mt-1 text-[11px] text-slate-600">{description}</p>
        </div>

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconClasses[accent]}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

/* ---------------- FILTER SELECT ---------------- */

const FilterSelect = ({ value, onChange, options }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-[#111111] px-4 pr-10 text-sm font-medium text-slate-300 outline-none transition hover:bg-white/[0.05] focus:border-white/20 sm:w-auto"
      >
        {options.map((option) => (
          <option key={option} className="bg-[#111111] text-white">
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
      />
    </div>
  );
};

/* ---------------- DESKTOP ROW ---------------- */

const CaseRow = ({ item }) => {
  const status = statusStyles[item.status];

  return (
    <tr className="group border-b border-white/5 last:border-0 hover:bg-white/[0.025]">
      <td className="px-5 py-4">
        <Link to={`/cases/${item.id}`} className="block">
          <p className="font-mono text-xs font-semibold text-white">
            {item.id}
          </p>

          <p className="mt-1 text-xs text-slate-600">
            Legal matter workspace
          </p>
        </Link>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-xs font-semibold text-slate-300">
            {getInitials(item.client)}
          </div>

          <span className="text-sm font-semibold text-slate-300">
            {item.client}
          </span>
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="text-sm text-slate-400">{item.type}</span>
      </td>

      <td className="px-5 py-4">
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-semibold ${status.badge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          {item.status}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <CalendarDays size={15} className="text-slate-600" />
          {item.hearing}
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="text-sm text-slate-500">{item.updated}</span>
      </td>

      <td className="px-5 py-4 text-right">
        <Link
          to={`/cases/${item.id}`}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs font-semibold text-slate-300 opacity-0 transition hover:bg-white/5 hover:text-white group-hover:opacity-100"
        >
          View Case
        </Link>
      </td>
    </tr>
  );
};

/* ---------------- MOBILE CARD ---------------- */

const MobileCaseCard = ({ item }) => {
  const status = statusStyles[item.status];

  return (
    <Link
      to={`/cases/${item.id}`}
      className="block p-4 transition active:bg-white/[0.03]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xs font-semibold text-slate-300">
            {getInitials(item.client)}
          </div>

          <div className="min-w-0">
            <p className="font-mono text-xs font-semibold text-white">
              {item.id}
            </p>

            <p className="mt-1 truncate text-sm font-semibold text-slate-300">
              {item.client}
            </p>
          </div>
        </div>

        <span
          className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] font-semibold ${status.badge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          {item.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/[0.03] p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
            Case Type
          </p>

          <p className="mt-1 text-xs font-medium text-slate-400">
            {item.type}
          </p>
        </div>

        <div className="rounded-xl bg-white/[0.03] p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
            Next Hearing
          </p>

          <p className="mt-1 text-xs font-medium text-slate-400">
            {item.hearing}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[11px] text-slate-600">
          Updated {item.updated}
        </span>

        <span className="text-xs font-semibold text-slate-300">
          View Case →
        </span>
      </div>
    </Link>
  );
};

/* ---------------- HELPERS ---------------- */

const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export default Cases;

