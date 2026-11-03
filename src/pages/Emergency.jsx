
import { useState } from "react";
import { Link } from "react-router-dom";

function Emergency() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sosActivated, setSosActivated] = useState(false);

  const contacts = JSON.parse(
    localStorage.getItem("emergencyContacts") || "[]"
  );

  function handleSOS() {
    setError("");
    setLocation(null);
    setLoading(true);
    setSosActivated(true);

    if (!navigator.geolocation) {
      setError("Your browser does not support location access.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      () => {
        setError("Location access denied. Please allow location access.");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }

  function getMessage() {
    let message = "EMERGENCY! I need help. Please contact me immediately.";

    if (location) {
      const mapLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
      message += ` My current location: ${mapLink}`;
    }

    return message;
  }

  function resetSOS() {
    setSosActivated(false);
    setLocation(null);
    setError("");
  }

  return (
    <div className="min-h-screen bg-red-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Link to="/dashboard" className="text-red-700 font-semibold">
          ← Back to Dashboard
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-6 text-center">
          <h1 className="text-3xl font-bold text-red-700 mb-3">
            Emergency SOS
          </h1>

          <p className="text-gray-600 mb-8">
            Activate SOS to retrieve your location and contact trusted people.
          </p>

          {!sosActivated ? (
            <button
              onClick={handleSOS}
              className="w-48 h-48 rounded-full bg-red-600 hover:bg-red-700 text-white text-3xl font-bold shadow-xl"
            >
              SOS
              <span className="block text-sm font-normal mt-2">
                Tap for help
              </span>
            </button>
          ) : (
            <div className="space-y-5">
              <div className="text-5xl">🚨</div>

              <h2 className="text-2xl font-bold text-red-700">
                SOS Activated
              </h2>

              {loading && (
                <p className="text-gray-600">Getting your location...</p>
              )}

              {location && (
                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="font-semibold text-green-800">
                    Location retrieved
                  </p>

                  <a
                    href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-3 text-blue-700 underline"
                  >
                    View location on Google Maps
                  </a>
                </div>
              )}

              {error && <p className="text-red-600">{error}</p>}

              <a
                href="tel:112"
                className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold p-4 rounded-xl"
              >
                Call Emergency Services (112)
              </a>

              <div className="text-left">
                <h3 className="text-xl font-bold mb-3">
                  Notify Emergency Contacts
                </h3>

                {contacts.length === 0 ? (
                  <p className="text-gray-600">
                    No contacts saved. Add them from the Dashboard.
                  </p>
                ) : (
                  contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="border rounded-xl p-4 mb-3 flex justify-between items-center gap-3"
                    >
                      <div>
                        <p className="font-semibold">{contact.name}</p>
                        <p className="text-gray-600">{contact.phone}</p>
                      </div>

                      <a
                        href={`sms:${contact.phone}?body=${encodeURIComponent(getMessage())}`}
                        className="bg-pink-600 text-white px-4 py-2 rounded-lg"
                      >
                        Send SOS
                      </a>
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={resetSOS}
                className="w-full bg-gray-200 hover:bg-gray-300 p-3 rounded-xl"
              >
                Reset SOS
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-gray-500 text-sm mt-5">
          This prototype does not automatically send messages or alert authorities.
        </p>
      </div>
    </div>
  );
}

export default Emergency;
