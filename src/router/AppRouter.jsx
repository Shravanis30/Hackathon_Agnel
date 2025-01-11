import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../components/Home";
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import SOSPage from "../components/SOSPage";
import SpyCameraPage from "../components/SpyCameraPage";
import ShareLocationPage from "../components/ShareLocationPage";
import FeaturesCard from "../components/FeaturesCard";

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<HomePage />} />

        {/* Login and Register Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Feature-Specific Pages */}
        <Route path="/sos" element={<SOSPage />} />
        <Route path="/spy-camera" element={<SpyCameraPage />} />
        <Route path="/share-location" element={<ShareLocationPage />} />

        {/* Features Card Example */}
        <Route path="/features" element={<FeaturesCard />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
