
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api.js";

const decorations = [
  { symbol: "🌸", top: "8%", left: "8%", delay: "0s", size: "2rem" },
  { symbol: "🍃", top: "18%", left: "82%", delay: "1s", size: "2.5rem" },
  { symbol: "🌷", top: "38%", left: "5%", delay: "2s", size: "2rem" },
  { symbol: "🌿", top: "65%", left: "90%", delay: "0.5s", size: "2.5rem" },
  { symbol: "🌼", top: "82%", left: "15%", delay: "1.5s", size: "2rem" },
  { symbol: "🍃", top: "88%", left: "75%", delay: "2.5s", size: "2rem" },
  { symbol: "🌸", top: "52%", left: "94%", delay: "3s", size: "1.8rem" },
  { symbol: "🌷", top: "12%", left: "48%", delay: "2s", size: "1.8rem" },
];

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Cannot connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 px-5 py-12 sm:px-8">

      <style>{`
        @keyframes floatDecor {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(-8deg);
          }
          50% {
            transform: translate3d(12px, -22px, 0) rotate(10deg);
          }
        }

        @keyframes cardEnter {
          from {
            opacity: 0;
            transform: translateY(28px) scale(.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: .45;
            transform: scale(1);
          }
          50% {
            opacity: .7;
            transform: scale(1.08);
          }
        }

        .login-decoration {
          position: absolute;
          pointer-events: none;
          user-select: none;
          animation: floatDecor 7s ease-in-out infinite;
          filter: drop-shadow(0 8px 12px rgba(180, 120, 170, .12));
        }

        .login-card-enter {
          animation: cardEnter .8s cubic-bezier(.2,.8,.2,1) both;
        }

        .login-glow {
          animation: glowPulse 8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .login-decoration,
          .login-card-enter,
          .login-glow {
            animation: none !important;
          }
        }
      `}</style>

      {/* Background glows */}
      <div className="login-glow pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-pink-300/40 blur-3xl" />

      <div className="login-glow pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-purple-300/40 blur-3xl" />

      <div className="pointer-events-none absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />

      {/* Floating decorations */}
      {decorations.map((item, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="login-decoration absolute hidden sm:block"
          style={{
            top: item.top,
            left: item.left,
            animationDelay: item.delay,
            fontSize: item.size,
          }}
        >
          {item.symbol}
        </span>
      ))}

      <main className="login-card-enter relative z-10 mx-auto w-full max-w-md">

        {/* Branding */}
        <header className="mb-10 text-center sm:mb-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-white/80 bg-white/80 shadow-xl shadow-pink-200/40 transition duration-500 hover:-translate-y-2 hover:rotate-6 hover:bg-pink-50">
            <span className="text-4xl" aria-hidden="true">
              🛡️
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">
            She <span className="text-pink-600">Shield</span>
          </h1>

          <p className="mt-3 text-base text-slate-600">
            Your safety, our priority
          </p>
        </header>

        {/* Login card */}
        <form
          onSubmit={handleLogin}
          className="rounded-[2rem] border border-white/80 bg-white/85 p-7 shadow-2xl shadow-purple-200/40 backdrop-blur-xl transition duration-500 hover:shadow-pink-200/50 sm:p-10"
        >
          <div className="mb-9 text-center">
            <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Welcome back
            </h2>

            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-500 sm:text-base">
              Sign in to access your safety tools.
            </p>
          </div>

          <div className="mb-7">
            <label
              htmlFor="email"
              className="mb-3 block text-sm font-semibold text-slate-700"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-2xl border border-pink-100 bg-white/90 px-5 py-4 text-base text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-pink-200 hover:bg-pink-50/40 focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="password"
              className="mb-3 block text-sm font-semibold text-slate-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-2xl border border-purple-100 bg-white/90 px-5 py-4 text-base text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-purple-200 hover:bg-purple-50/40 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-100"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-4 text-sm leading-6 text-red-600"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 px-5 py-4 font-bold text-white shadow-lg shadow-pink-200/60 transition duration-300 hover:-translate-y-1 hover:from-pink-600 hover:via-fuchsia-600 hover:to-purple-600 hover:shadow-xl hover:shadow-purple-200/60 focus:outline-none focus:ring-4 focus:ring-pink-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-9 text-center text-sm leading-6 text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="rounded-md font-bold text-pink-600 transition duration-300 hover:text-purple-700 hover:underline focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              Sign up
            </Link>
          </p>
        </form>

        <p className="mt-7 text-center text-sm text-slate-500">
          Your safety journey starts here{" "}
          <span className="inline-block transition duration-300 hover:scale-125">
            💗
          </span>
        </p>
      </main>
    </div>
  );
}

export default Login;
