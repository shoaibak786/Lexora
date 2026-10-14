
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Eye,
    EyeOff,
    Lock,
    Mail,
    Scale,
    ShieldCheck,
    UserRound,
} from "lucide-react";

const Login = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("Lawyer");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

const handleLogin = (e) => {
        e.preventDefault();

        const savedUser = localStorage.getItem("lexoraUser");

        if (!savedUser) {
            alert("No account found. Please create an account first.");
            return;
        }

        const user = JSON.parse(savedUser);

        if (email !== user.email || password !== user.password) {
            alert("Invalid email or password.");
            return;
        }

        const loggedInUser = {
            name: user.name,
            email: user.email,
            role: user.role,
        };

        localStorage.setItem(
            "lexoraLoggedInUser",
            JSON.stringify(loggedInUser)
        );

        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">

                {/* LEFT SIDE */}
                <div className="relative hidden overflow-hidden border-r border-white/[0.07] lg:block">
                    {/* Grid */}
                    <div
                        className="absolute inset-0 opacity-[0.035]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                            backgroundSize: "70px 70px",
                        }}
                    />

                    {/* Glow */}
                    <div className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[130px]" />

                    <div className="relative flex min-h-screen flex-col justify-between p-10 xl:p-14">

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
                                <span className="text-sm font-black">L</span>
                            </div>

                            <div>
                                <span className="text-lg font-semibold tracking-tight">
                                    Lexora
                                </span>

                                <span className="ml-2 text-[9px] uppercase tracking-[0.25em] text-zinc-600">
                                    AI
                                </span>
                            </div>
                        </Link>

                        {/* Main Content */}
                        <div className="max-w-xl">

                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5">
                                <ShieldCheck size={12} className="text-zinc-400" />

                                <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                                    Secure Legal Workspace
                                </span>
                            </div>

                            <h1 className="text-5xl font-medium leading-[1.02] tracking-[-0.055em] xl:text-7xl">
                                Your cases.
                                <span className="block text-zinc-600">
                                    Your intelligence.
                                </span>
                                <span className="block">One workspace.</span>
                            </h1>

                            <p className="mt-7 max-w-lg text-sm leading-7 text-zinc-500">
                                Access your legal workspace, manage case documents,
                                explore AI-powered insights and turn complex information
                                into actionable intelligence.
                            </p>

                            {/* Features */}
                            <div className="mt-10 grid gap-4 sm:grid-cols-2">

                                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                                    <Lock size={16} className="text-zinc-400" />

                                    <p className="mt-4 text-sm font-medium text-zinc-300">
                                        Privacy-first
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-zinc-600">
                                        Designed for sensitive legal information.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                                    <Scale size={16} className="text-zinc-400" />

                                    <p className="mt-4 text-sm font-medium text-zinc-300">
                                        Case-aware AI
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-zinc-600">
                                        Intelligence built around your case context.
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-[10px] text-zinc-700">
                            <span>© 2026 Lexora</span>

                            <span>Intelligent Legal Platform</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">

                    <div className="w-full max-w-md">

                        {/* Mobile Logo */}
                        <div className="mb-12 flex items-center justify-between lg:hidden">

                            <Link to="/" className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
                                    <span className="text-xs font-black">L</span>
                                </div>

                                <span className="text-base font-semibold">
                                    Lexora
                                </span>
                            </Link>

                            <Link
                                to="/"
                                className="flex items-center gap-1.5 text-xs text-zinc-600 transition hover:text-white"
                            >
                                <ArrowLeft size={13} />
                                Home
                            </Link>
                        </div>

                        {/* Heading */}
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-600">
                                Welcome back
                            </p>

                            <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                                Sign in to Lexora
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-zinc-600">
                                Access your cases, documents and legal intelligence.
                            </p>
                        </div>

                        {/* Role Selector */}
                        <div className="mt-8">

                            <p className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-600">
                                Continue as
                            </p>

                            <div className="grid grid-cols-2 gap-2">

                                <button
                                    type="button"
                                    onClick={() => setRole("Lawyer")}
                                    className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm transition ${role === "Lawyer"
                                        ? "border-white/20 bg-white text-black"
                                        : "border-white/[0.08] bg-white/[0.025] text-zinc-500 hover:border-white/15 hover:text-zinc-300"
                                        }`}
                                >
                                    <Scale size={15} />
                                    Lawyer
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setRole("Client")}
                                    className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm transition ${role === "Client"
                                        ? "border-white/20 bg-white text-black"
                                        : "border-white/[0.08] bg-white/[0.025] text-zinc-500 hover:border-white/15 hover:text-zinc-300"
                                        }`}
                                >
                                    <UserRound size={15} />
                                    Client
                                </button>

                            </div>
                        </div>

                        {/* FORM */}
                        <form onSubmit={handleLogin} className="mt-7 space-y-5">

                            {/* EMAIL */}
                            <div>
                                <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-600">
                                    Email address
                                </label>

                                <div className="group flex items-center rounded-xl border border-white/[0.08] bg-white/[0.025] transition focus-within:border-white/20">
                                    <Mail
                                        size={16}
                                        className="ml-4 text-zinc-600 transition group-focus-within:text-zinc-400"
                                    />

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        required
                                        className="w-full bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-zinc-700"
                                    />
                                </div>
                            </div>

                            {/* PASSWORD */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-600">
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        className="text-[10px] text-zinc-600 transition hover:text-zinc-300"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <div className="group flex items-center rounded-xl border border-white/[0.08] bg-white/[0.025] transition focus-within:border-white/20">
                                    <Lock
                                        size={16}
                                        className="ml-4 text-zinc-600 transition group-focus-within:text-zinc-400"
                                    />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                        className="w-full bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-zinc-700"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="mr-4 text-zinc-600 transition hover:text-zinc-300"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={16} />
                                        ) : (
                                            <Eye size={16} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* REMEMBER */}
                            <label className="flex cursor-pointer items-center gap-2.5">
                                <input
                                    type="checkbox"
                                    className="h-3.5 w-3.5 accent-white"
                                />

                                <span className="text-xs text-zinc-600">
                                    Keep me signed in
                                </span>
                            </label>

                            {/* LOGIN */}
                            <button
                                type="submit"
                                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
                            >
                                Sign in as {role}

                                <ArrowRight
                                    size={15}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </button>

                        </form>

                        {/* DEMO NOTE */}
                        <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                            <div className="flex gap-3">
                                <ShieldCheck
                                    size={15}
                                    className="mt-0.5 shrink-0 text-zinc-600"
                                />

                                <p className="text-[10px] leading-5 text-zinc-600">
                                    Prototype mode is enabled. Login credentials are currently
                                    simulated for demonstration purposes.
                                </p>
                            </div>
                        </div>

                        <div className="mt-7 text-center">
                            <p className="text-xs text-zinc-600">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="font-medium text-zinc-300 transition hover:text-white"
                                >
                                    Create account
                                </Link>
                            </p>
                        </div>

                        {/* BACK */}
                        <div className="mt-8 text-center">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-1.5 text-xs text-zinc-600 transition hover:text-white"
                            >
                                <ArrowLeft size={13} />
                                Back to Lexora
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

