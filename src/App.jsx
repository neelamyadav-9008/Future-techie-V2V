import { Routes, Route } from "react-router-dom";

import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Dashboard from "./pages/dashboard.jsx";
import MapPage from "./pages/MapPage.jsx";
import Reports from "./pages/Reports.jsx";
import Emergency from "./pages/Emergency.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import NotFound from "./pages/NotFound.jsx";
import SafeRoute from "./pages/saferoute.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/emergency" element={<Emergency />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/safe-route" element={<SafeRoute />} />
    </Routes>
  );
}

export default App;