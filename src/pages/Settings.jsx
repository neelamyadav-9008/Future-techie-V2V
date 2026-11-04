
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaBell,
  FaShieldAlt,
  FaLock,
  FaPalette,
  FaMapMarkerAlt,
  FaEnvelope,
  FaSave,
  FaCheckCircle,
  FaCog,
} from "react-icons/fa";

const defaultSettings = {
  safetyAlerts: true,
  communityUpdates: true,
  emailNotifications: false,
  locationPreference: true,
  profilePrivacy: false,
  soundEffects: true,
  reduceMotion: false,
};

function Settings() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("sheShieldSettings");
      return saved
        ? { ...defaultSettings, ...JSON.parse(saved) }
        : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    if (!savedMessage) return;

    const timer = setTimeout(() => setSavedMessage(""), 2500);
    return () => clearTimeout(timer);
  }, [savedMessage]);

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    localStorage.setItem("sheShieldSettings", JSON.stringify(settings));
    setSavedMessage("Your settings have been saved successfully!");
  };

  const SettingToggle = ({ title, description, settingKey }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 border-b border-purple-100 last:border-none">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={settings[settingKey]}
        aria-label={title}
        onClick={() => handleToggle(settingKey)}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 shrink-0 ${
          settings[settingKey] ? "bg-pink-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
            settings[settingKey] ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );

  const Section = ({ icon: Icon, title, subtitle, children }) => (
    <section className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-sm border border-white">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-pink-600 text-xl">
          <Icon />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            {title}
          </h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>

      {children}
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4 sm:px-8 py-8">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">
          <div>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-pink-600 font-semibold text-sm mb-4 transition"
            >
              <FaArrowLeft />
              Back to Dashboard
            </Link>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white text-xl shadow-md">
                <FaCog />
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                  Settings
                </h1>
                <p className="text-gray-500 mt-1">
                  Manage your She Shield experience
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/profile"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-purple-600 font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <FaUser />
            View Profile
          </Link>
        </div>

        {/* Welcome Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 p-7 sm:p-9 text-white shadow-lg mb-8">
          <div className="relative z-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
              Your preferences
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">
              Make She Shield yours!
            </h2>
            <p className="text-white/90 mt-3 leading-relaxed">
              Customize notifications, safety preferences and app settings
              to make your experience comfortable and convenient.
            </p>
          </div>

          <div className="absolute -right-8 -bottom-16 text-white/15 text-9xl">
            ♡
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">

          {/* Account */}
          <Section
            icon={FaUser}
            title="Account"
            subtitle="Manage your personal account"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-pink-50 p-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center text-white text-2xl">
                  <FaUser />
                </div>

                <div>
                  <h3 className="font-bold text-gray-800">
                    Your She Shield Account
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage your profile information and emergency contacts.
                  </p>
                </div>
              </div>

              <Link
                to="/profile"
                className="text-center bg-white text-pink-600 px-5 py-3 rounded-xl font-semibold hover:bg-pink-100 transition"
              >
                Edit Profile
              </Link>
            </div>
          </Section>

          {/* Notifications */}
          <Section
            icon={FaBell}
            title="Notifications"
            subtitle="Choose which updates you want to receive"
          >
            <SettingToggle
              title="Safety Alerts"
              description="Receive important safety-related alerts."
              settingKey="safetyAlerts"
            />

            <SettingToggle
              title="Community Updates"
              description="Stay updated about community safety activities."
              settingKey="communityUpdates"
            />

            <SettingToggle
              title="Email Notifications"
              description="Enable email notification preferences."
              settingKey="emailNotifications"
            />
          </Section>

          {/* Safety and Privacy */}
          <Section
            icon={FaShieldAlt}
            title="Safety & Privacy"
            subtitle="Manage your safety and privacy preferences"
          >
            <SettingToggle
              title="Location Preference"
              description="Allow the app to use location features when needed. Browser permission is also required."
              settingKey="locationPreference"
            />

            <SettingToggle
              title="Private Profile Preference"
              description="Save your preference for keeping your profile private."
              settingKey="profilePrivacy"
            />

            <div className="mt-5 rounded-2xl bg-purple-50 p-5">
              <div className="flex items-center gap-3 text-purple-700 font-semibold">
                <FaLock />
                Your Privacy Matters
              </div>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Never share your passwords or sensitive personal information.
                Review your browser's location permissions before using
                location-based safety features.
              </p>
            </div>
          </Section>

          {/* App Preferences */}
          <Section
            icon={FaPalette}
            title="App Preferences"
            subtitle="Customize how the application feels"
          >
            <div className="flex items-center justify-between py-4 border-b border-purple-100">
              <div>
                <h3 className="font-semibold text-gray-800">
                  App Theme
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Current application theme
                </p>
              </div>

              <span className="px-4 py-2 rounded-full bg-pink-100 text-pink-600 text-sm font-semibold">
                Pastel Theme
              </span>
            </div>

            <SettingToggle
              title="Sound Effects Preference"
              description="Save your preference for application sounds."
              settingKey="soundEffects"
            />

            <SettingToggle
              title="Reduce Motion"
              description="Save a preference for reduced animations."
              settingKey="reduceMotion"
            />
          </Section>

          {/* Help */}
          <Section
            icon={FaEnvelope}
            title="Help & Support"
            subtitle="Need assistance using She Shield?"
          >
            <div className="rounded-2xl bg-blue-50 p-5">
              <h3 className="font-semibold text-gray-800">
                We're here to help!
              </h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                If you experience any issues while using the application,
                please contact your project support team.
              </p>

              <Link
                to="/dashboard"
                className="inline-block mt-4 text-blue-600 font-semibold hover:text-purple-600 transition"
              >
                Return to Dashboard →
              </Link>
            </div>
          </Section>
        </div>

        {/* Save Button */}
        <div className="mt-8 bg-white/90 rounded-3xl p-6 shadow-sm border border-white flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-gray-800">
              Save your preferences
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Your selected settings will be saved on this device.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition duration-300"
          >
            <FaSave />
            Save Settings
          </button>
        </div>

        {savedMessage && (
          <div
            role="status"
            className="mt-5 flex items-center justify-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-xl p-4 font-semibold"
          >
            <FaCheckCircle />
            {savedMessage}
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-gray-400 text-sm mt-10 pb-4">
          She Shield • Your safety, our priority ♡
        </footer>

      </div>
    </div>
  );
}

export default Settings;
