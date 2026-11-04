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
import {
  FaArrowLeft,
  FaMapMarkedAlt,
  FaLocationArrow,
  FaSearchLocation,
  FaRoute,
  FaClock,
  FaRoad,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
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
  const [locationLoading, setLocationLoading] = useState(false);
  const [error, setError] = useState("");

  function getCurrentLocation() {
    setError("");
    setLocationLoading(true);

    if (!navigator.geolocation) {
      setError("Your browser does not support location access.");
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStart([
          position.coords.latitude,
          position.coords.longitude,
        ]);
        setRoute([]);
        setDestination(null);
        setDistance(null);
        setDuration(null);
        setLocationLoading(false);
      },
      () => {
        setError("Please allow location access to find your starting point.");
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  async function findRoute(e) {
    e.preventDefault();
    setError("");
    setRoute([]);
    setDestination(null);
    setDistance(null);
    setDuration(null);

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

      if (!searchResponse.ok) {
        throw new Error("Could not search for this destination. Try again.");
      }

      const searchResults = await searchResponse.json();

      if (!searchResults.length) {
        throw new Error("Destination not found. Try a more specific address.");
      }

      const place = searchResults[0];
      const destinationPosition = [
        Number(place.lat),
        Number(place.lon),
      ];

      const routeUrl =
        `https://router.project-osrm.org/route/v1/driving/` +
        `${start[1]},${start[0]};${destinationPosition[1]},${destinationPosition[0]}` +
        "?overview=full&geometries=geojson";

      const routeResponse = await fetch(routeUrl);

      if (!routeResponse.ok) {
        throw new Error("Could not connect to the route service. Try again.");
      }

      const routeData = await routeResponse.json();

      if (routeData.code !== "Ok" || !routeData.routes?.length) {
        throw new Error("No route could be found for this destination.");
      }

      const selectedRoute = routeData.routes[0];

      const coordinates = selectedRoute.geometry.coordinates.map(
        ([longitude, latitude]) => [latitude, longitude]
      );

      setDestination(destinationPosition);
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-5 py-8 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-pink-700 hover:text-purple-700 font-semibold transition mb-8"
        >
          <FaArrowLeft />
          Back to Dashboard
        </Link>

        {/* Page Heading */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-pink-100 flex items-center justify-center shadow-sm">
            <FaMapMarkedAlt className="text-4xl text-pink-600" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Safe Route
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto leading-7">
            Plan your journey from your current location to your
            destination with an easy-to-follow driving route.
          </p>
        </div>

        {/* Safety Information */}
        <div className="bg-white/80 border border-pink-100 rounded-3xl p-6 sm:p-8 mb-10 flex items-start gap-4 shadow-sm">
          <div className="bg-purple-100 p-3 rounded-2xl shrink-0">
            <FaShieldAlt className="text-purple-600 text-xl" />
          </div>

          <div>
            <h2 className="font-bold text-gray-800 text-lg mb-2">
              Plan your journey
            </h2>
            <p className="text-gray-600 leading-7">
              Enter your destination to view a driving route, estimated
              distance and travel time.
            </p>
          </div>
        </div>

        {/* Route Search Card */}
        <div className="bg-white rounded-3xl shadow-md border border-pink-100 p-6 sm:p-10 mb-10">

          <div className="flex items-center gap-4 mb-8">
            <div className="bg-pink-100 p-4 rounded-2xl">
              <FaRoute className="text-pink-600 text-2xl" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Plan Your Route
              </h2>
              <p className="text-gray-500 mt-1">
                First detect your location, then enter your destination.
              </p>
            </div>
          </div>

          {/* Current Location */}
          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FaLocationArrow className="text-purple-600 text-xl" />
              <h3 className="font-bold text-gray-800">
                Starting Location
              </h3>
            </div>

            <button
              type="button"
              onClick={getCurrentLocation}
              disabled={locationLoading}
              className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition flex items-center justify-center gap-3"
            >
              <FaLocationArrow />
              {locationLoading ? "Detecting Location..." : "Use My Current Location"}
            </button>

            {start && (
              <p className="text-green-700 mt-5 flex items-center gap-2">
                <FaCheckCircle />
                Starting location detected successfully.
              </p>
            )}
          </div>

          {/* Destination */}
          <form onSubmit={findRoute} className="space-y-7">
            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Destination
              </label>

              <div className="relative">
                <FaSearchLocation className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500" />

                <input
                  value={destinationName}
                  onChange={(e) => setDestinationName(e.target.value)}
                  placeholder="Enter a place, area or address"
                  required
                  className="w-full border border-pink-200 bg-pink-50/40 rounded-xl pl-12 pr-5 py-4 outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || locationLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 text-white font-semibold py-4 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-3"
            >
              <FaRoute />
              {loading ? "Finding Your Route..." : "Find Safe Route"}
            </button>
          </form>

          {/* Error */}
          {error && (
            <div className="mt-7 bg-red-50 border border-red-100 rounded-xl p-4 text-red-700 flex items-start gap-3">
              <FaExclamationCircle className="mt-1 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Route Details */}
          {distance !== null && (
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-6">
                <FaCheckCircle className="text-green-600 text-xl" />
                <h3 className="text-xl font-bold text-gray-800">
                  Route Found!
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-pink-50 border border-pink-100 rounded-2xl p-6">
                  <FaRoad className="text-pink-600 text-2xl mb-4" />
                  <p className="text-gray-500 mb-2">Total Distance</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {distance} km
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
                  <FaClock className="text-purple-600 text-2xl mb-4" />
                  <p className="text-gray-500 mb-2">
                    Estimated Driving Time
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {duration} min
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Map */}
        <div className="bg-white rounded-3xl shadow-md border border-pink-100 p-4 sm:p-7 mb-8">
          <div className="flex items-center gap-3 mb-6 px-2">
            <FaMapMarkedAlt className="text-pink-600 text-2xl" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Your Route on Map
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                View your starting point, destination and route.
              </p>
            </div>
          </div>

          <div className="h-[400px] sm:h-[500px] rounded-2xl overflow-hidden border border-pink-100">
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

          {/* Map Legend */}
          <div className="flex flex-wrap gap-6 mt-6 px-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              Starting Point
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              Destination
            </div>

            <div className="flex items-center gap-2">
              <span className="w-5 h-1 rounded-full bg-purple-600"></span>
              Driving Route
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 flex items-start gap-4">
          <FaShieldAlt className="text-purple-600 text-2xl shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-gray-800 mb-2">
              Important Safety Note
            </h3>
            <p className="text-gray-600 text-sm leading-7">
              This prototype uses OpenStreetMap and OSRM to display
              driving routes and estimated travel times. It does not
              check real-time crime reports, road conditions or safety
              levels. Always use your judgment while travelling.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SafeRoute;