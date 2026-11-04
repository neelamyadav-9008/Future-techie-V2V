
import { Link, useNavigate } from "react-router-dom";
import {
  FaShieldAlt,
  FaRoute,
  FaMapMarkedAlt,
  FaClipboardList,
  FaPhoneAlt,
  FaArrowRight,
  FaSignOutAlt,
  FaHeart,
  FaHandsHelping,
  FaLock,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  let user = null;

  try {
    const savedUser = localStorage.getItem("user");
    user = savedUser ? JSON.parse(savedUser) : null;
  } catch {
    user = localStorage.getItem("user");
  }

  const userName =
    typeof user === "string"
      ? user
      : user?.name || user?.username || user?.fullName || "there";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const features = [
    {
      title: "Safe Route",
      description: "Find routes to help you reach your destination.",
      icon: FaRoute,
      path: "/safe-route",
      color: "bg-purple-100 text-purple-600",
      hover: "hover:border-purple-200",
      label: "Explore Routes",
    },
    {
      title: "Community Map",
      description: "Explore the map and view community safety reports.",
      icon: FaMapMarkedAlt,
      path: "/map",
      color: "bg-blue-100 text-blue-600",
      hover: "hover:border-blue-200",
      label: "View Map",
    },
    {
      title: "Safety Reports",
      description: "Submit and view safety-related incident reports.",
      icon: FaClipboardList,
      path: "/reports",
      color: "bg-pink-100 text-pink-600",
      hover: "hover:border-pink-200",
      label: "View Reports",
    },
    {
      title: "Emergency Contacts",
      description: "Access your emergency assistance features.",
      icon: FaHandsHelping,
      path: "/profile",
      color: "bg-orange-100 text-orange-600",
      hover: "hover:border-orange-200",
      label: "Manage Contacts",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10">

      {/* Welcome Section */}
      <section className="text-center py-6 sm:py-10">
        <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center shadow-lg shadow-pink-100">
          <FaShieldAlt className="text-4xl text-pink-600" />
        </div>

        <p className="text-pink-500 font-semibold tracking-widest uppercase text-xs sm:text-sm mb-3">
          Your Safety Companion
        </p>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800">
          Welcome Back,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            {userName}!
          </span>
        </h1>

        <p className="text-gray-500 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Your safety matters. Explore your safety tools and stay connected
          with your community.
        </p>

        <button
          onClick={handleLogout}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-pink-200 text-pink-600 font-semibold text-sm hover:bg-pink-50 transition-all"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </section>

      {/* Emergency SOS Section */}
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 p-7 sm:p-10 text-white shadow-xl shadow-pink-200/50">

        <div className="absolute -right-10 -top-16 w-56 h-56 rounded-full bg-white/10" />
        <div className="absolute -right-2 -bottom-24 w-64 h-64 rounded-full bg-white/10" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-7">

          <div className="text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-xs font-semibold mb-5">
              <FaHeart />
              We're here for you
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Need Emergency Assistance?
            </h2>

            <p className="mt-3 text-white/90 text-sm sm:text-base leading-relaxed">
              Access your emergency assistance dashboard whenever you need help.
            </p>
          </div>

          <Link
            to="/emergency"
            className="shrink-0 inline-flex items-center justify-center gap-3 bg-white text-pink-600 px-7 py-4 rounded-2xl font-bold shadow-lg hover:bg-pink-50 hover:scale-105 transition-all"
          >
            <FaPhoneAlt className="text-lg" />
            Emergency SOS
            <FaArrowRight />
          </Link>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-2">

        <div className="text-center mb-8">
          <p className="text-pink-500 text-xs font-bold tracking-widest uppercase mb-2">
            Explore SheShield
          </p>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
            Your Safety Tools
          </h2>

          <p className="text-gray-500 mt-3 text-sm">
            Everything you need, organized in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Link
                to={feature.path}
                key={feature.title}
                className={`group bg-white rounded-3xl border border-pink-100 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 ${feature.hover} transition-all duration-300`}
              >
                <div className="flex items-start justify-between gap-4">

                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                    <Icon />
                  </div>

                  <FaArrowRight className="text-gray-300 group-hover:text-pink-500 group-hover:translate-x-1 transition-all mt-2" />

                </div>

                <h3 className="text-xl font-bold text-gray-800 mt-6">
                  {feature.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2 leading-relaxed min-h-10">
                  {feature.description}
                </p>

                <div className="mt-5 text-sm font-bold text-pink-500 group-hover:text-purple-500 transition">
                  {feature.label} →
                </div>
              </Link>
            );
          })}

        </div>
      </section>

      {/* Safety Reminder */}
      <section className="rounded-3xl bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 border border-pink-100 p-7 sm:p-9 text-center">

        <div className="w-14 h-14 mx-auto rounded-2xl bg-white shadow-sm flex items-center justify-center text-pink-500 text-2xl mb-4">
          <FaLock />
        </div>

        <h3 className="text-xl font-bold text-gray-800">
          A Little Safety Reminder 💗
        </h3>

        <p className="text-sm text-gray-500 mt-3 max-w-xl mx-auto leading-relaxed">
          Keep your emergency contacts updated and make sure you know how to
          access your emergency assistance features.
        </p>

      </section>

      {/* Footer */}
      <footer className="text-center pb-4 pt-2">
        <p className="text-xs text-gray-400">
          Made with 💗 for your safety | SheShield
        </p>
      </footer>

    </div>
  );
}

export default Dashboard;
