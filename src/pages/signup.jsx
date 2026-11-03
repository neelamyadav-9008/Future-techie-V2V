
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="min-h-screen flex items-center justify-center bg-pink-50 p-4">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="text-3xl font-bold text-pink-600 text-center">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-6">
          Join She Shield
        </p>

        <label className="block mb-2 font-medium">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          className="w-full border rounded-lg p-3 mb-4"
        />

        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full border rounded-lg p-3 mb-4"
        />

        <label className="block mb-2 font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          required
          minLength={6}
          className="w-full border rounded-lg p-3 mb-4"
        />

        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-center mt-5 text-gray-600">
          Already registered?{" "}
          <Link to="/" className="text-pink-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
