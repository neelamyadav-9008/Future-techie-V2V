
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaUser,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaHeart,
  FaExclamationCircle,
} from "react-icons/fa";
import API from "../api/api.js";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      navigate("/");
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white/90 backdrop-blur-xl rounded-[32px] shadow-[0_20px_70px_rgba(219,39,119,0.13)] overflow-hidden border border-white">

        {/* Left Branding Section */}
        <div className="hidden md:flex flex-col justify-center items-center text-center px-10 lg:px-14 py-16 bg-gradient-to-br from-pink-400 via-pink-300 to-purple-400 text-white relative overflow-hidden">

          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 -right-20 w-72 h-72 rounded-full bg-white/10" />

          <div className="relative z-10">

            <div className="w-24 h-24 rounded-[28px] bg-white/25 backdrop-blur-sm flex items-center justify-center mb-8 mx-auto shadow-lg">
              <FaShieldAlt className="text-5xl" />
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold mb-5">
              SheShield
            </h1>

            <p className="text-lg leading-8 text-white/95 max-w-sm mx-auto">
              Your safety, your strength, your space. Join our community
              and take a step towards a safer tomorrow.
            </p>

            <div className="mt-10 flex items-center justify-center gap-3 text-white/90 font-medium">
              <FaHeart />
              <span>Your safety matters.</span>
            </div>

            <div className="mt-20 text-sm text-white/80">
              Empowering women through technology
            </div>

          </div>
        </div>

        {/* Signup Form Section */}
        <div className="p-7 sm:p-10 lg:p-14">

          <div className="text-center mb-9">

            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center shadow-sm">
              <FaUserPlus className="text-3xl text-pink-600" />
            </div>

            <p className="text-pink-500 text-xs font-bold uppercase tracking-[3px] mb-3">
              Join Our Community
            </p>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
              Create Account
            </h2>

            <p className="text-gray-500 mt-3 text-sm sm:text-base">
              Create your SheShield account and stay connected.
            </p>

          </div>

          <form onSubmit={handleSignup} className="space-y-6">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400" />

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  autoComplete="name"
                  className="w-full bg-pink-50/50 border border-pink-100 rounded-2xl pl-12 pr-4 py-4 text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-pink-400 focus:ring-4 focus:ring-pink-100 hover:border-pink-200"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  autoComplete="email"
                  className="w-full bg-pink-50/50 border border-pink-100 rounded-2xl pl-12 pr-4 py-4 text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-pink-400 focus:ring-4 focus:ring-pink-100 hover:border-pink-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400" />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full bg-pink-50/50 border border-pink-100 rounded-2xl pl-12 pr-4 py-4 text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-pink-400 focus:ring-4 focus:ring-pink-100 hover:border-pink-200"
                />
              </div>

              <p className="text-xs text-gray-400 mt-2 ml-1">
                Password must contain at least 6 characters.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-red-600 text-sm flex items-start gap-3">
                <FaExclamationCircle className="mt-1 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 via-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 text-white font-bold py-4 rounded-2xl shadow-lg shadow-pink-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              {loading ? "Creating Account..." : "Create My Account →"}
            </button>

          </form>

          {/* Login Link */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-pink-600 font-bold hover:text-purple-600 transition-colors"
              >
                Login
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-9 pt-6 border-t border-pink-100 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <FaHeart className="text-pink-400" />
              Made with love for a safer tomorrow.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signup;
