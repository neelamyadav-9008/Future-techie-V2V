
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
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function getMessage() {
    let message = "EMERGENCY! I need help. Please contact me immediately.";

    if (location) {
      message += ` My current location: https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    }

    return message;
  }

  function resetSOS() {
    setSosActivated(false);
    setLocation(null);
    setError("");
  }

  return (
    <div className="emergency-page min-h-screen w-full overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-center text-slate-800">

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(35px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(244, 114, 182, 0.25),
            0 12px 30px rgba(236, 72, 153, 0.2);
          }
          50% {
            box-shadow: 0 0 35px rgba(244, 114, 182, 0.6),
            0 12px 40px rgba(236, 72, 153, 0.35);
          }
        }

        .fade-up {
          animation: fadeUp 0.8s ease both;
        }

        .fade-up-1 { animation-delay: 0.15s; }
        .fade-up-2 { animation-delay: 0.3s; }
        .fade-up-3 { animation-delay: 0.45s; }

        .float-animation {
          animation: float 4s ease-in-out infinite;
        }

        .sos-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .emergency-card {
          transition: transform 0.35s ease,
          box-shadow 0.35s ease,
          border-color 0.35s ease;
        }

        .emergency-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(219, 39, 119, 0.12);
          border-color: #f9a8d4;
        }

        .action-button {
          transition: all 0.3s ease;
        }

        .action-button:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 25px rgba(219, 39, 119, 0.2);
        }

        @media (prefers-reduced-motion: reduce) {
          .fade-up, .float-animation, .sos-glow {
            animation: none;
          }

          .emergency-card, .action-button {
            transition: none;
          }
        }
      `}</style>

      {/* Floating Decorations */}
      <div className="pointer-events-none fixed left-5 top-28 z-0 text-3xl opacity-30 float-animation sm:left-12">
        🌸
      </div>

      <div className="pointer-events-none fixed right-5 top-52 z-0 text-3xl opacity-30 float-animation sm:right-12">
        ✨
      </div>

      <div className="pointer-events-none fixed bottom-20 left-8 z-0 text-3xl opacity-30 float-animation">
        💗
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 py-10 sm:px-8 sm:py-14">

        {/* Back Button */}
        <div className="mb-10 fade-up">
          <Link
            to="/dashboard"
            className="action-button inline-flex items-center justify-center rounded-full border border-pink-200 bg-white/90 px-7 py-3 font-semibold text-pink-600 shadow-sm hover:bg-pink-50"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Hero Section */}
        <section className="fade-up relative mb-12 flex w-full flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border border-pink-100 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 px-6 py-14 text-center shadow-xl shadow-pink-100/60 sm:px-12 sm:py-20">

          <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-white/40 blur-3xl" />

          <div className="absolute -bottom-20 -left-16 h-60 w-60 rounded-full bg-pink-200/40 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col items-center">

            <div className="float-animation mb-7 flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white bg-white/70 text-5xl shadow-lg">
              🆘
            </div>

            <span className="mb-5 rounded-full border border-pink-200 bg-white/70 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-pink-600">
              Emergency Assistance
            </span>

            <h1 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-slate-800 sm:text-5xl">
              Your Safety Matters.
              <span className="mt-3 block text-pink-600">
                Help Is Just a Tap Away.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-slate-600 sm:text-base">
              Your personal emergency assistance space. Get your location,
              reach emergency services and notify people you trust.
            </p>

          </div>
        </section>

        {/* SOS Section */}
        <section className="fade-up fade-up-1 emergency-card mb-12 flex w-full flex-col items-center justify-center rounded-[2.5rem] border border-pink-100 bg-white/90 px-6 py-12 text-center shadow-lg shadow-pink-100/40 sm:px-12 sm:py-16">

          {!sosActivated ? (
            <div className="flex w-full flex-col items-center">

              <div className="float-animation mb-5 text-5xl">💗</div>

              <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">
                Need Immediate Help?
              </h2>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-8 text-slate-500 sm:text-base">
                Activate SOS to retrieve your current location and prepare
                an emergency message for your trusted contacts.
              </p>

              <button
                onClick={handleSOS}
                className="sos-glow action-button mt-10 flex h-48 w-48 flex-col items-center justify-center rounded-full border-[10px] border-pink-100 bg-gradient-to-br from-pink-500 to-rose-400 text-white sm:h-56 sm:w-56"
              >
                <span className="text-5xl font-black tracking-wider">
                  SOS
                </span>

                <span className="mt-2 text-sm font-semibold">
                  Tap for help
                </span>
              </button>

              <p className="mt-8 text-xs text-slate-400">
                Your browser may ask permission to access your location.
              </p>

            </div>
          ) : (
            <div className="fade-up mx-auto flex w-full max-w-2xl flex-col items-center gap-7">

              <div className="float-animation flex h-24 w-24 items-center justify-center rounded-3xl bg-pink-100 text-5xl">
                🚨
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-pink-600">
                  SOS Activated!
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Follow the steps below to get emergency assistance.
                </p>
              </div>

              {loading && (
                <div className="w-full rounded-2xl border border-blue-100 bg-blue-50 p-7">
                  <div className="mb-3 text-3xl">📍</div>

                  <p className="font-bold text-blue-700">
                    Getting your location...
                  </p>

                  <p className="mt-2 text-sm text-blue-600">
                    Please allow location access in your browser.
                  </p>
                </div>
              )}

              {location && (
                <div className="w-full rounded-2xl border border-emerald-100 bg-emerald-50 p-8">
                  <div className="mb-3 text-4xl">📍</div>

                  <h3 className="text-xl font-bold text-emerald-800">
                    Location Retrieved!
                  </h3>

                  <p className="mt-3 text-sm text-emerald-700">
                    Your coordinates are ready to share.
                  </p>

                  <a
                    href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="action-button mt-6 inline-flex rounded-xl bg-white px-7 py-3 font-bold text-emerald-700 shadow-sm"
                  >
                    View on Google Maps →
                  </a>
                </div>
              )}

              {error && (
                <div className="w-full rounded-2xl border border-rose-100 bg-rose-50 p-6 text-sm font-semibold text-rose-700">
                  ⚠️ {error}
                </div>
              )}

              {/* Emergency Call */}
              <div className="emergency-card w-full rounded-3xl border border-pink-100 bg-gradient-to-br from-pink-50 to-rose-50 p-8 text-center sm:p-10">

                <div className="mb-4 text-4xl">📞</div>

                <h3 className="text-xl font-extrabold text-slate-800">
                  Emergency Services
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                  Need immediate assistance? Call India's emergency response
                  number.
                </p>

                <a
                  href="tel:112"
                  className="action-button mt-7 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 px-6 py-4 font-bold text-white shadow-md sm:w-auto sm:min-w-72"
                >
                  📞 Call Emergency Services (112)
                </a>
              </div>

              {/* Emergency Contacts */}
              <div className="w-full rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-7 text-center sm:p-10">

                <div className="mb-4 text-4xl">👥</div>

                <h3 className="text-2xl font-extrabold text-slate-800">
                  Your Emergency Contacts
                </h3>

                <p className="mx-auto mb-8 mt-3 max-w-md text-sm leading-7 text-slate-500">
                  Reach out to your trusted people with a pre-filled
                  emergency message.
                </p>

                {contacts.length === 0 ? (
                  <div className="mx-auto max-w-md rounded-2xl border border-purple-100 bg-white p-8">
                    <div className="mb-3 text-3xl">📱</div>

                    <p className="mb-5 text-sm text-slate-600">
                      You haven't added any emergency contacts yet.
                    </p>

                    <Link
                      to="/profile"
                      className="action-button inline-flex rounded-xl bg-purple-100 px-6 py-3 font-bold text-purple-700 hover:bg-purple-200"
                    >
                      Add Emergency Contacts →
                    </Link>
                  </div>
                ) : (
                  <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
                    {contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="emergency-card flex flex-col items-center rounded-3xl border border-white bg-white p-8 text-center shadow-sm"
                      >
                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-3xl">
                          👤
                        </div>

                        <h4 className="text-lg font-bold text-slate-800">
                          {contact.name}
                        </h4>

                        <p className="mt-2 text-sm text-slate-500">
                          {contact.phone}
                        </p>

                        <a
                          href={`sms:${contact.phone}?body=${encodeURIComponent(getMessage())}`}
                          className="action-button mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 px-5 py-3 font-bold text-white"
                        >
                          💌 Send SOS
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Reset Button */}
              <button
                onClick={resetSOS}
                className="action-button w-full rounded-2xl border border-pink-100 bg-pink-50 px-6 py-4 font-bold text-pink-600 hover:bg-pink-100"
              >
                ↻ Reset SOS
              </button>

            </div>
          )}
        </section>

        {/* Safety Reminder */}
        <section className="fade-up fade-up-2 emergency-card mb-10 flex w-full flex-col items-center rounded-[2rem] border border-blue-100 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-8 text-center shadow-md sm:p-12">

          <div className="float-animation mb-4 text-4xl">💜</div>

          <h3 className="text-xl font-extrabold text-purple-800">
            A Little Safety Reminder
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-slate-600">
            Keep your emergency contacts updated and share your travel
            plans with someone you trust. This prototype does not
            automatically send messages or alert authorities. Call 112
            directly if you need immediate assistance.
          </p>
        </section>

        {/* Footer */}
        <footer className="fade-up fade-up-3 w-full border-t border-pink-100 py-8 text-center">
          <p className="text-sm tracking-wide text-slate-400">
            Made with 💗 for safer tomorrows · She Shield
          </p>
        </footer>

      </main>
    </div>
  );
}

export default Emergency;
