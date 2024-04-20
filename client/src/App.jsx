import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Redirect;
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import OnboardPage from "./pages/OnboardPage";
import Redirect from "./pages/LandingPage/Redirect";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RequestDashboardPage from "./pages/RequestDashboardPage";
import OpeningDashboardPage from "./pages/OpeningDashboardPage/OpeningDashboardPage";
import CreateOpeningPage from "./pages/OpeningDashboardPage/CreateOpeningPage";
import RequestCreatePage from "./pages/RequestCreatePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/redirect" element={<Redirect />} />
        <Route path="/onboard" element={<OnboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/request" element={<RequestDashboardPage />} />
        <Route path="/opening" element={<OpeningDashboardPage />} />
        <Route path="/opening/create" element={<CreateOpeningPage />} />
        <Route path="/request/create" element={<RequestCreatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
