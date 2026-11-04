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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center items-center text-center p-12 bg-gradient-to-br from-pink-400 via-pink-300 to-purple-400 text-white">

          <div className="w-24 h-24 rounded-3xl bg-white/25 flex items-center justify-center mb-8">
            <FaShieldAlt className="text-5xl" />
          </div>

          <h1 className="text-4xl font-bold mb-5">
            She Shield
          </h1>

          <p className="text-lg leading-8 text-white/95 max-w-sm">
            Your safety, your strength, your space. Join our community
            and take a step towards a safer tomorrow.
          </p>

          <div className="mt-10 flex items-center gap-3 text-white/90">
            <FaHeart />
            <span>Your safety matters.</span>
          </div>

          <div className="mt-16 text-sm text-white/80">
            Empowering women through technology
          </div>
        </div>

        {/* Right Section */}
        <div className="p-7 sm:p-10 lg:p-12">

          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-pink-100 flex items-center justify-center">
              <FaUserPlus className="text-3xl text-pink-600" />
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Create Account
            </h2>

            <p className="text-gray-500 mt-3">
              Join She Shield and become part of our community.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-7">

            {/* Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Full Name
              </label>

              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500" />

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  autoComplete="name"
                  className="w-full border border-pink-200 bg-pink-50/40 rounded-xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  className="w-full border border-pink-200 bg-pink-50/40 rounded-xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500" />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full border border-pink-200 bg-pink-50/40 rounded-xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                />
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Password must contain at least 6 characters.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-red-600 text-sm flex items-start gap-3">
                <FaExclamationCircle className="mt-1 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 text-white font-semibold py-4 rounded-xl shadow-md hover:shadow-lg transition"
            >
              {loading ? "Creating Account..." : "Create My Account"}
            </button>

          </form>

          {/* Login Link */}
          <p className="text-center mt-9 text-gray-600">
            Already registered?{" "}
            <Link
              to="/"
              className="text-pink-600 font-bold hover:text-purple-600 transition"
            >
              Login
            </Link>
          </p>

          <p className="text-center text-xs text-gray-400 mt-8">
            Made with <span className="text-pink-500">♥</span> for a safer tomorrow.
          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;