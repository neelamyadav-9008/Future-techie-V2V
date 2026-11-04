



import { Routes, Route } from "react-router-dom";

import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Dashboard from "./pages/dashboard.jsx";
import MapPage from "./pages/MapPage.jsx";
import Reports from "./pages/Reports.jsx";
import Emergency from "./pages/Emergency.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import SafeRoute from "./pages/saferoute.jsx";
import NotFound from "./pages/NotFound.jsx";

import MainLayout from "./layouts/mainlayout.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />

      <Route
        path="/map"
        element={
          <MainLayout>
            <MapPage />
          </MainLayout>
        }
      />

      <Route
        path="/safe-route"
        element={
          <MainLayout>
            <SafeRoute />
          </MainLayout>
        }
      />

      <Route
        path="/reports"
        element={
          <MainLayout>
            <Reports />
          </MainLayout>
        }
      />

      <Route
        path="/emergency"
        element={
          <MainLayout>
            <Emergency />
          </MainLayout>
        }
      />

      <Route
        path="/profile"
        element={
          <MainLayout>
            <Profile />
          </MainLayout>
        }
      />

      <Route
        path="/settings"
        element={
          <MainLayout>
            <Settings />
          </MainLayout>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
