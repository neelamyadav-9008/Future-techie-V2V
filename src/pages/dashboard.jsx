
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/");
  }

  const features = [
    {
      title: "Safe Route",
      description: "Find a safer route to your destination.",
      path: "/safe-route",
      icon: "🗺️",
      color: "bg-blue-100",
    },
    {
      title: "Emergency Contacts",
      description: "Manage your trusted emergency contacts.",
      path: "/profile",
      icon: "📞",
      color: "bg-green-100",
    },
    {
      title: "Community Safety",
      description: "View and report safety concerns.",
      path: "/reports",
      icon: "📍",
      color: "bg-purple-100",
    },
    {
      title: "Emergency SOS",
      description: "Get help when you need it.",
      path: "/emergency",
      icon: "🚨",
      color: "bg-red-100",
    },
  ];

  return (
    <div className="min-h-screen bg-pink-50">
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-pink-600">
          She Shield
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            Hello, {user.name || "there"}!
          </span>
          <button
            onClick={handleLogout}
            className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <section className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-3">
            Your safety matters.
          </h2>
          <p className="text-lg">
            Welcome to your personal safety assistant.
          </p>
        </section>

        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Your Safety Tools
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((feature) => (
            <Link
              key={feature.title}
              to={feature.path}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center text-2xl mb-4`}>
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
