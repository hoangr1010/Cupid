import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  // Redirect;
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import OnboardPage from "./pages/OnboardPage";
import Redirect from "./pages/LandingPage/Redirect";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RequestDashboardPage from "./pages/RequestDashboardPage";
import OpeningDashboardPage from "./pages/OpeningDashboardPage";
import CreateOpeningPage from "./pages/OpeningDashboardPage/CreateOpeningPage";
import CreateRequestPage from "./pages/RequestDashboardPage/CreateRequestPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import SideBarContainer from "./components/Sidebar/RouteContainer";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = Boolean(user);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            // user is already login can not access to Login page
            isAuthenticated ? <Navigate to="/profile" /> : <LandingPage />
          }
        />
        <Route
          path="/auth/redirect"
          element={
            // user is already login can not access to Redirect page
            isAuthenticated ? <Navigate to="/profile" /> : <Redirect />
          }
        />

        {/* only authenticated user can access to these routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/onboard" element={<OnboardPage />} />
          <Route path="/opening/create" element={<CreateOpeningPage />} />

          {/* routes including sidebar */}
          <Route element={<SideBarContainer />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/request" element={<RequestDashboardPage />} />
            <Route path="/request/create" element={<CreateRequestPage />} />
            <Route path="/opening" element={<OpeningDashboardPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
