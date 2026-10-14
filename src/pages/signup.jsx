
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Scale,
  ShieldCheck,
  UserRound,
  UserPlus,
} from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("Lawyer");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const user = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: role,
    };

    localStorage.setItem("lexoraUser", JSON.stringify(user));

    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">

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

            {/* Main */}
            <div className="max-w-xl">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5">
                <UserPlus size={12} className="text-zinc-400" />

                <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  Create your workspace
                </span>
              </div>

              <h1 className="text-5xl font-medium leading-[1.02] tracking-[-0.055em] xl:text-7xl">
                Start building
                <span className="block text-zinc-600">
                  smarter legal
                </span>
                <span className="block">workflows.</span>
              </h1>

              <p className="mt-7 max-w-lg text-sm leading-7 text-zinc-500">
                Create your Lexora account and bring your cases, documents
                and legal intelligence together in one professional
                workspace.
              </p>

              {/* Benefits */}
              <div className="mt-10 space-y-4">

                {[
                  "Organize your legal cases in one workspace",
                  "Search and understand case documents with AI",
                  "Generate insights and legal drafts faster",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/[0.035]">
                      <Check size={12} className="text-zinc-400" />
                    </div>

                    <span className="text-xs text-zinc-500">
                      {item}
                    </span>
                  </div>
                ))}

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

            {/* Mobile Header */}
            <div className="mb-10 flex items-center justify-between lg:hidden">

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
                Get started
              </p>

              <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Set up your secure Lexora workspace in a few steps.
              </p>
            </div>

            {/* ROLE */}
            <div className="mt-7">

              <p className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-600">
                I am a
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
            <form onSubmit={handleSignup} className="mt-6 space-y-4">

              {/* NAME */}
              <div>
                <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-600">
                  Full name
                </label>

                <div className="group flex items-center rounded-xl border border-white/[0.08] bg-white/[0.025] transition focus-within:border-white/20">

                  <UserRound
                    size={16}
                    className="ml-4 text-zinc-600 transition group-focus-within:text-zinc-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="w-full bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-zinc-700"
                  />

                </div>
              </div>

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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-zinc-700"
                  />

                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-600">
                  Password
                </label>

                <div className="group flex items-center rounded-xl border border-white/[0.08] bg-white/[0.025] transition focus-within:border-white/20">

                  <Lock
                    size={16}
                    className="ml-4 text-zinc-600 transition group-focus-within:text-zinc-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    className="w-full bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-zinc-700"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
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

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-600">
                  Confirm password
                </label>

                <div className="group flex items-center rounded-xl border border-white/[0.08] bg-white/[0.025] transition focus-within:border-white/20">

                  <Lock
                    size={16}
                    className="ml-4 text-zinc-600 transition group-focus-within:text-zinc-400"
                  />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    className="w-full bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-zinc-700"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="mr-4 text-zinc-600 transition hover:text-zinc-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>

                </div>
              </div>

              {/* TERMS */}
              <label className="flex cursor-pointer items-start gap-2.5 pt-1">

                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-3.5 w-3.5 accent-white"
                />

                <span className="text-[10px] leading-5 text-zinc-600">
                  I agree to Lexora's{" "}
                  <span className="text-zinc-400">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-zinc-400">
                    Privacy Policy
                  </span>
                  .
                </span>

              </label>

              {/* CREATE ACCOUNT */}
              <button
                type="submit"
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                Create {role} account

                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

            </form>

            {/* SECURITY NOTE */}
            <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">

              <div className="flex gap-3">

                <ShieldCheck
                  size={15}
                  className="mt-0.5 shrink-0 text-zinc-600"
                />

                <p className="text-[10px] leading-5 text-zinc-600">
                  Your account is created in prototype mode. Real
                  authentication and encrypted storage will be connected
                  during backend implementation.
                </p>

              </div>

            </div>

            {/* LOGIN LINK */}
            <div className="mt-7 text-center">

              <p className="text-xs text-zinc-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-zinc-300 transition hover:text-white"
                >
                  Sign in
                </Link>
              </p>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

