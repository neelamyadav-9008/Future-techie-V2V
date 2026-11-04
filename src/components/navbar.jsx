import { Link, useLocation } from "react-router-dom";
import { FaBell, FaUserCircle, FaBars, FaHeart } from "react-icons/fa";

function Navbar() {
  const location = useLocation();

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/map": "Community Safety Map",
    "/safe-route": "Safe Route",
    "/reports": "Safety Reports",
    "/profile": "My Profile",
    "/settings": "Settings",
    "/emergency": "Emergency Assistance",
  };

  const title = pageTitles[location.pathname] || "SheShield";

  return (
    <header className="w-full bg-white/85 backdrop-blur-xl border-b border-pink-100 px-5 sm:px-8 py-4 flex justify-between items-center">

      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-pink-500">
          <FaHeart />
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            {title}
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Welcome to your safe space 💗
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 sm:gap-6">

        <button
          type="button"
          aria-label="Notifications"
          className="relative w-10 h-10 rounded-xl flex items-center justify-center bg-pink-50 text-pink-500 hover:bg-pink-100 transition"
        >
          <FaBell className="text-lg" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-pink-500 border-2 border-white"></span>
        </button>

        <Link
          to="/profile"
          aria-label="Open profile"
          className="flex items-center gap-2 group"
        >
          <FaUserCircle className="text-3xl text-pink-500 group-hover:text-purple-500 transition" />
          <span className="hidden sm:block text-sm font-semibold text-gray-600">
            My Account
          </span>
        </Link>

      </div>
    </header>
  );
}

export default Navbar;