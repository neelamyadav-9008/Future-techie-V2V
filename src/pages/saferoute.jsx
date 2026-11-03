
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const defaultCenter = [20.5937, 78.9629];

function MapUpdater({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);

  return null;
}

function SafeRoute() {
  const [start, setStart] = useState(null);
  const [destination, setDestination] = useState(null);
  const [destinationName, setDestinationName] = useState("");
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function getCurrentLocation() {
    setError("");

    if (!navigator.geolocation) {
      setError("Your browser does not support location access.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStart([
          position.coords.latitude,
          position.coords.longitude,
        ]);
        setRoute([]);
      },
      () => {
        setError("Please allow location access to find your starting point.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  async function findRoute(e) {
    e.preventDefault();
    setError("");
    setRoute([]);
    setDestination(null);

    if (!start) {
      setError("Please get your current location first.");
      return;
    }

    if (!destinationName.trim()) {
      setError("Please enter a destination.");
      return;
    }

    setLoading(true);

    try {
      const searchUrl =
        "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" +
        encodeURIComponent(destinationName);

      const searchResponse = await fetch(searchUrl);
      const searchResults = await searchResponse.json();

      if (!searchResults.length) {
        throw new Error("Destination not found. Try a more specific address.");
      }

      const place = searchResults[0];
      const destinationPosition = [
        Number(place.lat),
        Number(place.lon),
      ];

      setDestination(destinationPosition);

      const routeUrl =
        `https://router.project-osrm.org/route/v1/driving/` +
        `${start[1]},${start[0]};${destinationPosition[1]},${destinationPosition[0]}` +
        "?overview=full&geometries=geojson";

      const routeResponse = await fetch(routeUrl);
      const routeData = await routeResponse.json();

      if (routeData.code !== "Ok" || !routeData.routes?.length) {
        throw new Error("No route could be found for this destination.");
      }

      const selectedRoute = routeData.routes[0];

      const coordinates = selectedRoute.geometry.coordinates.map(
        ([longitude, latitude]) => [latitude, longitude]
      );

      setRoute(coordinates);
      setDistance((selectedRoute.distance / 1000).toFixed(1));
      setDuration(Math.round(selectedRoute.duration / 60));
    } catch (err) {
      setError(err.message || "Could not calculate the route.");
    } finally {
      setLoading(false);
    }
  }

  const mapCenter = destination || start || defaultCenter;

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
          Safe Route
        </h1>

        <p className="text-gray-600 mb-5">
          Find a route from your current location to your destination.
        </p>

        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <button
            type="button"
            onClick={getCurrentLocation}
            className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-3 rounded-lg mb-5"
          >
            Use My Current Location
          </button>

          {start && (
            <p className="text-green-700 mb-4">
              Starting location detected.
            </p>
          )}

          <form onSubmit={findRoute} className="space-y-4">
            <label className="block font-semibold">
              Destination
            </label>

            <input
              value={destinationName}
              onChange={(e) => setDestinationName(e.target.value)}
              placeholder="Enter a place or address"
              className="w-full border rounded-lg p-3"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-5 py-3 rounded-lg"
            >
              {loading ? "Finding Route..." : "Find Route"}
            </button>
          </form>

          {error && (
            <p className="text-red-600 mt-4">{error}</p>
          )}

          {distance !== null && (
            <div className="bg-green-50 rounded-xl p-4 mt-5">
              <h2 className="font-bold text-green-800">
                Route found
              </h2>
              <p>Distance: {distance} km</p>
              <p>Estimated driving time: {duration} minutes</p>
            </div>
          )}
        </div>

        <div className="h-[450px] rounded-xl overflow-hidden shadow-lg">
          <MapContainer
            center={mapCenter}
            zoom={start ? 13 : 5}
            className="h-full w-full"
          >
            <MapUpdater center={mapCenter} />

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {start && (
              <CircleMarker
                center={start}
                radius={9}
                pathOptions={{
                  color: "#2563eb",
                  fillColor: "#3b82f6",
                  fillOpacity: 1,
                }}
              >
                <Popup>Your starting location</Popup>
              </CircleMarker>
            )}

            {destination && (
              <CircleMarker
                center={destination}
                radius={9}
                pathOptions={{
                  color: "#16a34a",
                  fillColor: "#22c55e",
                  fillOpacity: 1,
                }}
              >
                <Popup>Your destination</Popup>
              </CircleMarker>
            )}

            {route.length > 0 && (
              <Polyline
                positions={route}
                pathOptions={{
                  color: "#9333ea",
                  weight: 5,
                }}
              />
            )}
          </MapContainer>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          This prototype displays driving routes using OpenStreetMap
          and OSRM. It does not yet assess real-time safety conditions.
        </p>
      </div>
    </div>
  );
}

export default SafeRoute;
