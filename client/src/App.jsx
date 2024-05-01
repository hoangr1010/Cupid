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
import CreateRequestPage from "./pages/RequestDashboardPage/CreateRequestPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import SideBarContainer from "./components/Sidebar/RouteContainer";
import { useSelector } from "react-redux";
import { setUserId } from "./utils/api";

function App() {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = Boolean(user);

  if (user) {
    // Set global headers include userId
    setUserId(user._id);
  } else {
    // delete userId in global header if logout
    setUserId(null);
  }

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
          element={<Redirect isAuthenticated={isAuthenticated} />}
        />

        {/* only authenticated user can access to these routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/onboard" element={<OnboardPage />} />

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
