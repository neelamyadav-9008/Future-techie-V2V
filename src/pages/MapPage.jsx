
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
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
      return JSON.parse(
        localStorage.getItem("safetyReports") || "[]"
      );
    } catch {
      return [];
    }
  });

  const [description, setDescription] = useState("");
  const [type, setType] = useState("unsafe");
  const [error, setError] = useState("");

  function locateMe() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (result) => {
        setPosition([
          result.coords.latitude,
          result.coords.longitude,
        ]);
        setError("");
      },
      () => {
        setError("Location access denied. Please allow location access.");
      }
    );
  }

  function addReport(e) {
    e.preventDefault();

    if (!position) {
      setError("Please locate yourself before submitting a report.");
      return;
    }

    const report = {
      id: Date.now(),
      type,
      description,
      position,
    };

    const updated = [...reports, report];

    setReports(updated);
    localStorage.setItem("safetyReports", JSON.stringify(updated));
    setDescription("");
    setError("");
  }

  return (
    <div className="min-h-screen bg-pink-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/dashboard"
          className="text-pink-700 font-semibold"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-pink-700 mt-5 mb-2">
          Community Safety Map
        </h1>

        <p className="text-gray-600 mb-5">
          View your location and community safety reports.
        </p>

        <button
          onClick={locateMe}
          className="bg-pink-600 text-white px-5 py-3 rounded-lg mb-4"
        >
          Find My Location
        </button>

        {error && (
          <p className="text-red-600 mb-4">{error}</p>
        )}

        <div className="h-[450px] rounded-xl overflow-hidden shadow-lg mb-8">
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
                  color: report.type === "unsafe" ? "#dc2626" : "#16a34a",
                  fillColor: report.type === "unsafe" ? "#ef4444" : "#22c55e",
                  fillOpacity: 0.8,
                }}
              >
                <Popup>
                  <strong>
                    {report.type === "unsafe" ? "Unsafe Area" : "Safe Area"}
                  </strong>
                  <p>{report.description}</p>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">
            Submit a Safety Report
          </h2>

          <form onSubmit={addReport} className="space-y-4">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option value="unsafe">Report an unsafe area</option>
              <option value="safe">Report a safe area</option>
            </select>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the area or concern..."
              required
              className="w-full border rounded-lg p-3"
              rows={3}
            />

            <button
              type="submit"
              className="bg-pink-600 text-white px-5 py-3 rounded-lg"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MapPage;
