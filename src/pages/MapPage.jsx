
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaLocationArrow,
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaPlusCircle,
  FaClipboardList,
  FaPaperPlane,
} from "react-icons/fa";
import "leaflet/dist/leaflet.css";

const defaultCenter = [20.5937, 78.9629];

function MapUpdater({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 15);
    }
  }, [position, map]);

  return null;
}

function MapPage() {
  const [position, setPosition] = useState(null);

  const [reports, setReports] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("safetyReports") || "[]");
    } catch {
      return [];
    }
  });

  const [description, setDescription] = useState("");
  const [type, setType] = useState("unsafe");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [locating, setLocating] = useState(false);

  function locateMe() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLocating(true);
    setError("");
    setSuccess("");

    navigator.geolocation.getCurrentPosition(
      (result) => {
        setPosition([
          result.coords.latitude,
          result.coords.longitude,
        ]);
        setLocating(false);
      },
      () => {
        setError("Location access denied. Please allow location access.");
        setLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }

  function addReport(e) {
    e.preventDefault();

    if (!position) {
      setError("Please locate yourself before submitting a report.");
      setSuccess("");
      return;
    }

    const report = {
      id: Date.now(),
      type,
      description,
      position,
      date: new Date().toLocaleDateString(),
    };

    const updated = [...reports, report];

    setReports(updated);
    localStorage.setItem("safetyReports", JSON.stringify(updated));

    setDescription("");
    setError("");
    setSuccess("Your safety report has been added to the map!");
  }

  const unsafeCount = reports.filter(
    (report) => report.type === "unsafe"
  ).length;

  const safeCount = reports.filter(
    (report) => report.type === "safe"
  ).length;

  const inputStyle =
    "w-full rounded-2xl border border-purple-100 bg-purple-50/40 px-5 py-4 outline-none transition focus:ring-2 focus:ring-pink-300";

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-5 sm:px-8 lg:px-12 py-10 sm:py-12">

      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">

        {/* Header */}
        <header className="space-y-6">

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-3 text-purple-600 font-semibold hover:text-pink-600 transition"
          >
            <FaArrowLeft />
            Back to Dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white text-2xl shadow-md shrink-0">
                <FaMapMarkerAlt />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                  Community Safety Map
                </h1>

                <p className="text-gray-500 leading-relaxed">
                  Explore locations and share safety updates with your community.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl px-6 py-5 shadow-sm flex items-center gap-4">
              <FaClipboardList className="text-purple-500 text-3xl" />

              <div>
                <p className="text-3xl font-bold text-gray-800">
                  {reports.length}
                </p>
                <p className="text-sm text-gray-500">
                  Community Reports
                </p>
              </div>
            </div>

          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 px-8 py-10 sm:px-12 sm:py-14 text-white shadow-lg">

          <div className="relative z-10 max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-widest font-semibold text-white/80">
              Together for safer spaces
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              Explore. Report. Protect.
            </h2>

            <p className="text-white/90 leading-8 text-base sm:text-lg">
              Discover community safety information, identify potentially
              unsafe locations and help others by sharing your observations.
            </p>
          </div>

          <div className="absolute -right-5 -bottom-12 text-white/15 text-9xl">
            ♡
          </div>
        </section>

        {/* Map Information Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-50 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 text-2xl">
              <FaClipboardList />
            </div>

            <div>
              <p className="text-3xl font-bold text-gray-800">
                {reports.length}
              </p>
              <p className="text-sm text-gray-500 mt-1">Total Reports</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-50 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-red-500 text-2xl">
              <FaExclamationTriangle />
            </div>

            <div>
              <p className="text-3xl font-bold text-gray-800">
                {unsafeCount}
              </p>
              <p className="text-sm text-gray-500 mt-1">Unsafe Areas</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-50 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 text-2xl">
              <FaCheckCircle />
            </div>

            <div>
              <p className="text-3xl font-bold text-gray-800">
                {safeCount}
              </p>
              <p className="text-sm text-gray-500 mt-1">Safe Areas</p>
            </div>
          </div>

        </section>

        {/* Interactive Map */}
        <section className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-purple-50">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-7">

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600 text-xl">
                <FaMapMarkerAlt />
              </div>

              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Explore Safety Map
                </h2>
                <p className="text-sm text-gray-500">
                  View your location and reported areas.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={locateMe}
              disabled={locating}
              className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-md hover:shadow-lg transition disabled:opacity-60"
            >
              <FaLocationArrow />
              {locating ? "Finding Location..." : "Find My Location"}
            </button>

          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-5 mb-6 px-2">

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              Your Location
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              Unsafe Area
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              Safe Area
            </div>

          </div>

          {/* Map */}
          <div className="h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-inner border border-purple-100 relative z-0">

            <MapContainer
              center={position || defaultCenter}
              zoom={position ? 15 : 5}
              className="h-full w-full"
            >
              <MapUpdater position={position} />

              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {position && (
                <CircleMarker
                  center={position}
                  radius={10}
                  pathOptions={{
                    color: "#2563eb",
                    fillColor: "#3b82f6",
                    fillOpacity: 0.8,
                  }}
                >
                  <Popup>You are here</Popup>
                </CircleMarker>
              )}

              {reports.map((report) => (
                <CircleMarker
                  key={report.id}
                  center={report.position}
                  radius={8}
                  pathOptions={{
                    color:
                      report.type === "unsafe" ? "#dc2626" : "#16a34a",
                    fillColor:
                      report.type === "unsafe" ? "#ef4444" : "#22c55e",
                    fillOpacity: 0.8,
                  }}
                >
                  <Popup>
                    <strong>
                      {report.type === "unsafe" ? "Unsafe Area" : "Safe Area"}
                    </strong>
                    <p>{report.description}</p>
                    {report.date && <p>{report.date}</p>}
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>

          </div>

          <p className="text-xs text-gray-400 mt-5 leading-6">
            Map data © OpenStreetMap contributors. Markers are based on
            community-submitted reports and are not independently verified.
          </p>

        </section>

        {/* Submit Report */}
        <section className="bg-white rounded-3xl p-7 sm:p-10 shadow-sm border border-purple-50">

          <div className="flex items-center gap-5 mb-9">
            <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600 text-2xl">
              <FaPlusCircle />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">
                Submit a Safety Report
              </h2>

              <p className="text-sm text-gray-500">
                Help your community by reporting a safe or unsafe location.
              </p>
            </div>
          </div>

          <form onSubmit={addReport} className="space-y-7">

            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">
                Select Report Type
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={inputStyle}
              >
                <option value="unsafe">Report an unsafe area</option>
                <option value="safe">Report a safe area</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the area or safety concern..."
                required
                maxLength={1000}
                rows={5}
                className={`${inputStyle} resize-none leading-7`}
              />

              <p className="text-xs text-gray-400 text-right">
                {description.length}/1000 characters
              </p>
            </div>

            {!position && (
              <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5 flex items-start gap-4">
                <FaMapMarkerAlt className="text-purple-500 text-xl mt-1" />
                <p className="text-sm text-gray-600 leading-6">
                  First click on <strong>Find My Location</strong> above.
                  Your current coordinates will be attached to this report.
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300"
            >
              <FaPaperPlane />
              Submit Report
            </button>

            {error && (
              <div role="alert" className="bg-red-50 border border-red-100 text-red-600 rounded-2xl p-5 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div role="status" className="bg-green-50 border border-green-100 text-green-700 rounded-2xl p-5 flex items-center gap-3 text-sm font-semibold">
                <FaCheckCircle />
                {success}
              </div>
            )}

          </form>
        </section>

        {/* Recent Reports */}
        <section className="bg-white rounded-3xl p-7 sm:p-10 shadow-sm border border-purple-50">

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 text-xl">
              <FaClipboardList />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-800">
                Recent Reports
              </h2>

              <p className="text-sm text-gray-500">
                Community reports displayed on this map.
              </p>
            </div>
          </div>

          {reports.length === 0 ? (
            <div className="text-center py-14">
              <FaMapMarkerAlt className="text-5xl text-purple-200 mx-auto mb-5" />
              <h3 className="font-bold text-gray-700 text-lg">
                No reports yet
              </h3>
              <p className="text-sm text-gray-500 mt-3">
                Be the first to share a community safety report.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {[...reports].reverse().map((report) => (
                <article
                  key={report.id}
                  className="p-6 rounded-2xl border border-purple-100 hover:shadow-md transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                    <div className="space-y-3">
                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold ${
                          report.type === "unsafe"
                            ? "bg-red-50 text-red-600"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {report.type === "unsafe" ? (
                          <FaExclamationTriangle />
                        ) : (
                          <FaCheckCircle />
                        )}

                        {report.type === "unsafe" ? "Unsafe Area" : "Safe Area"}
                      </span>

                      <p className="text-gray-700 leading-7">
                        {report.description}
                      </p>

                      {report.date && (
                        <p className="text-xs text-gray-400">
                          Reported on {report.date}
                        </p>
                      )}
                    </div>

                    <span className="text-xs text-purple-500 font-semibold">
                      Community Report
                    </span>

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

export default MapPage;
