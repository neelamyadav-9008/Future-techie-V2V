
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaShieldAlt,
  FaPlusCircle,
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaPaperPlane,
  FaEye,
  FaUserSecret,
} from "react-icons/fa";

const initialReports = [
  {
    id: 1,
    type: "Poor Street Lighting",
    location: "Main Road",
    date: "2026-11-01",
    description: "Street lights were not working properly in this area.",
    status: "Submitted",
    anonymous: true,
  },
  {
    id: 2,
    type: "Unsafe Public Area",
    location: "Near Bus Stop",
    date: "2026-10-29",
    description: "The area feels unsafe, especially during evening hours.",
    status: "Under Review",
    anonymous: false,
  },
];

const incidentTypes = [
  "Poor Street Lighting",
  "Unsafe Public Area",
  "Harassment",
  "Suspicious Activity",
  "Public Transport Safety",
  "Other",
];

function Reports() {
  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem("sheShieldReports");
      return saved ? JSON.parse(saved) : initialReports;
    } catch {
      return initialReports;
    }
  });

  const [form, setForm] = useState({
    type: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    anonymous: false,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReport = {
      id: Date.now(),
      ...form,
      status: "Submitted",
    };

    const updatedReports = [newReport, ...reports];

    setReports(updatedReports);
    localStorage.setItem("sheShieldReports", JSON.stringify(updatedReports));

    setForm({
      type: "",
      location: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      anonymous: false,
    });

    setMessage("Your report has been submitted successfully!");
    setTimeout(() => setMessage(""), 3500);
  };

  const getStatusStyle = (status) => {
    if (status === "Resolved") return "bg-green-100 text-green-700";
    if (status === "Under Review") return "bg-yellow-100 text-yellow-700";
    return "bg-blue-100 text-blue-700";
  };

  const inputStyle =
    "w-full px-5 py-4 rounded-2xl border border-purple-100 bg-purple-50/40 outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition";

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-5 sm:px-10 lg:px-14 py-10 sm:py-14">

      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">

        {/* Header */}
        <header className="space-y-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-3 text-purple-600 hover:text-pink-600 font-semibold transition"
          >
            <FaArrowLeft />
            Back to Dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-7">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white text-2xl shadow-md shrink-0">
                <FaShieldAlt />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                  Community Safety Reports
                </h1>
                <p className="text-gray-500 leading-relaxed">
                  Share concerns and help create safer communities.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm px-7 py-5 flex items-center gap-5">
              <FaClipboardList className="text-purple-500 text-3xl" />
              <div>
                <p className="text-3xl font-bold text-gray-800">
                  {reports.length}
                </p>
                <p className="text-sm text-gray-500 mt-1">Total Reports</p>
              </div>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 px-8 py-12 sm:px-12 sm:py-14 text-white shadow-lg">
          <div className="relative z-10 max-w-2xl space-y-5">
            <p className="uppercase tracking-widest text-sm font-semibold text-white/80">
              Your voice matters
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              Speak up. Stay safe. Make a difference.
            </h2>

            <p className="text-white/90 leading-8 text-base sm:text-lg">
              Report unsafe places, suspicious activities or other safety
              concerns. Every report can help raise awareness.
            </p>
          </div>

          <div className="absolute -right-5 -bottom-12 text-white/15 text-9xl">
            ♡
          </div>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">

          {/* Report Form */}
          <section className="lg:col-span-3 bg-white rounded-3xl shadow-sm border border-purple-50 p-7 sm:p-10 lg:p-11">

            <div className="flex items-center gap-5 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600 text-2xl shrink-0">
                <FaPlusCircle />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  Submit a Report
                </h2>
                <p className="text-sm text-gray-500">
                  Tell us what happened.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700">
                  Type of Incident *
                </label>

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                >
                  <option value="">Select incident type</option>
                  {incidentTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700">
                  Location *
                </label>

                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-400" />
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Enter the incident location"
                    required
                    className={`${inputStyle} pl-12`}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700">
                  Date of Incident *
                </label>

                <div className="relative">
                  <FaCalendarAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-400" />
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    max={new Date().toISOString().split("T")[0]}
                    required
                    className={`${inputStyle} pl-12`}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700">
                  Description *
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows="6"
                  maxLength="1000"
                  placeholder="Describe the safety concern in detail..."
                  className={`${inputStyle} resize-none leading-7`}
                />

                <p className="text-right text-xs text-gray-400">
                  {form.description.length}/1000 characters
                </p>
              </div>

              <label className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-pink-50 border border-pink-100 cursor-pointer">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={form.anonymous}
                  onChange={handleChange}
                  className="w-5 h-5 accent-pink-500 mt-1 shrink-0"
                />

                <div className="space-y-2">
                  <p className="font-bold text-gray-800 flex items-center gap-3">
                    <FaUserSecret className="text-pink-500" />
                    Submit Anonymously
                  </p>
                  <p className="text-sm text-gray-500 leading-6">
                    Mark this report as anonymous in the community report list.
                  </p>
                </div>
              </label>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-base shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300"
              >
                <FaPaperPlane />
                Submit Safety Report
              </button>

              {message && (
                <div role="status" className="flex items-center gap-3 p-5 rounded-2xl bg-green-50 text-green-700 font-semibold">
                  <FaCheckCircle />
                  {message}
                </div>
              )}
            </form>
          </section>

          {/* Right Side Information */}
          <aside className="lg:col-span-2 space-y-8">

            <section className="bg-white rounded-3xl p-7 sm:p-8 shadow-sm border border-purple-50">
              <div className="flex items-center gap-4 mb-7">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 text-xl">
                  <FaExclamationTriangle />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Reporting Guidelines
                </h2>
              </div>

              <div className="space-y-6 text-sm text-gray-600">
                <p className="flex gap-3 leading-6">
                  <span className="text-pink-500">♡</span>
                  Provide accurate incident details.
                </p>
                <p className="flex gap-3 leading-6">
                  <span className="text-pink-500">♡</span>
                  Mention the location clearly.
                </p>
                <p className="flex gap-3 leading-6">
                  <span className="text-pink-500">♡</span>
                  Avoid sharing unnecessary personal information.
                </p>
                <p className="flex gap-3 leading-6">
                  <span className="text-pink-500">♡</span>
                  Never submit false or misleading reports.
                </p>
                <p className="flex gap-3 leading-6">
                  <span className="text-pink-500">♡</span>
                  Contact emergency services directly if someone is in immediate danger.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-7 sm:p-8">
              <FaEye className="text-purple-600 text-3xl mb-5" />

              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Why Report?
              </h2>

              <p className="text-sm text-gray-600 leading-7">
                Reporting safety concerns can help communities identify
                potentially unsafe areas and encourage awareness and action.
              </p>
            </section>

            <section className="bg-white rounded-3xl p-7 sm:p-8 shadow-sm border border-purple-50">
              <h2 className="text-xl font-bold text-gray-800 mb-7">
                Report Summary
              </h2>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Total Reports</span>
                  <span className="text-xl font-bold text-purple-600">
                    {reports.length}
                  </span>
                </div>

                <div className="h-px bg-purple-100" />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Submitted</span>
                  <span className="text-xl font-bold text-blue-600">
                    {reports.filter((r) => r.status === "Submitted").length}
                  </span>
                </div>

                <div className="h-px bg-purple-100" />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Under Review</span>
                  <span className="text-xl font-bold text-yellow-600">
                    {reports.filter((r) => r.status === "Under Review").length}
                  </span>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* Recent Reports */}
        <section className="bg-white rounded-3xl p-7 sm:p-10 shadow-sm border border-purple-50">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-9">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Recent Community Reports
              </h2>
              <p className="text-sm text-gray-500">
                Reports submitted on this device.
              </p>
            </div>

            <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-5 py-3 rounded-full">
              {reports.length} Reports
            </span>
          </div>

          {reports.length === 0 ? (
            <div className="text-center py-16">
              <FaClipboardList className="text-5xl text-purple-200 mx-auto mb-5" />
              <h3 className="font-bold text-gray-700 text-lg">
                No reports yet
              </h3>
              <p className="text-sm text-gray-500 mt-3">
                Your submitted reports will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {reports.map((report) => (
                <article
                  key={report.id}
                  className="border border-purple-100 rounded-2xl p-6 sm:p-7 hover:shadow-md transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">

                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-bold text-gray-800 text-lg">
                          {report.type}
                        </h3>

                        <span className={`text-xs font-semibold px-4 py-2 rounded-full ${getStatusStyle(report.status)}`}>
                          {report.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-pink-400" />
                          {report.location}
                        </span>

                        <span className="flex items-center gap-2">
                          <FaCalendarAlt className="text-purple-400" />
                          {report.date}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 leading-7">
                        {report.description}
                      </p>

                      {report.anonymous && (
                        <span className="inline-flex items-center gap-2 text-xs text-purple-600 font-semibold">
                          <FaUserSecret />
                          Anonymous report
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-400 shrink-0">
                      <FaClock />
                      Community report
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-400 text-sm py-5">
          She Shield • Together for a safer community ♡
        </footer>

      </div>
    </div>
  );
}

export default Reports;
