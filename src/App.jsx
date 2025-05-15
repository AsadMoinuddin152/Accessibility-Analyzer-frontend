import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import DashboardPage from "./Pages/DashboardPage/DashboardPage.jsx";
import ReportPage from "./Pages/ReportPage/ReportPage.jsx";
import SettingsPage from "./Pages/SettingsPage/SettingsPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowGuest={true}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report/:scanId"
            element={
              <ProtectedRoute allowGuest={true}>
                <ReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute allowGuest={false}>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
