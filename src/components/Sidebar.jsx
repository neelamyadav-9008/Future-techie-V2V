import { Link, useLocation } from "react-router-dom";

import {
  FaHome,
  FaMapMarkedAlt,
  FaExclamationTriangle,
  FaUser,
  FaCog,
  FaShieldAlt,
  FaChevronRight
} from "react-icons/fa";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: FaHome },
  { name: "Safe Route", path: "/safe-route", icon: FaMapMarkedAlt },
  { name: "Community Map", path: "/map", icon: FaMapMarkedAlt },
  { name: "Reports", path: "/reports", icon: FaExclamationTriangle },
  { name: "Profile", path: "/profile", icon: FaUser },
  { name: "Settings", path: "/settings", icon: FaCog },
];

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen sticky top-0 h-screen flex flex-col bg-white border-r border-pink-100 shadow-[4px_0_25px_rgba(236,72,153,0.06)]">

      {/* Logo */}
      <div className="px-6 py-7 border-b border-pink-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white text-2xl shadow-md">
            <FaShieldAlt />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-pink-600">
              SheShield
            </h1>
            <p className="text-[11px] text-gray-400 tracking-widest uppercase">
              Your Safety Companion
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-7 space-y-2">

        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[2px] px-3 mb-4">
          Main Menu
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                active
                  ? "bg-gradient-to-r from-pink-500 to-purple-400 text-white shadow-lg shadow-pink-100"
                  : "text-gray-500 hover:bg-pink-50 hover:text-pink-600"
              }`}
            >
              <span className="flex items-center gap-3 font-medium">
                <Icon className="text-lg" />
                {item.name}
              </span>

              {active && <FaChevronRight className="text-xs" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Safety Card */}
      <div className="p-4 mt-auto">
        <div className="rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-100 p-4">
          <div className="text-2xl mb-2">💗</div>
          <h3 className="text-sm font-bold text-pink-700">
            Stay Safe, Stay Strong
          </h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Your safety matters. SheShield is here to support you.
          </p>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;