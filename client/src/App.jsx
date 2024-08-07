import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import OnboardPage from "./pages/OnboardPage";
import Redirect from "./pages/LandingPage/Redirect";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import RequestDashboardPage from "./pages/RequestDashboardPage";
import OpeningDashboardPage from "./pages/OpeningDashboardPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import SideBarContainer from "./components/Sidebar/RouteContainer";
import { useSelector } from "react-redux";
import { setUserId, setToken } from "./utils/api";
import SignInSignUp from "./pages/LandingPage/SignInSignUp";

function App() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = Boolean(user);

  if (user) {
    // Set global headers include userId
    setUserId(user._id);
    setToken(token);
  } else {
    // delete userId in global header if logout
    setUserId(null);
    setToken(null);
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            // user is already login can not access to Login page
            isAuthenticated ? <Navigate to="/homepage" /> : <LandingPage />
          }
        />

        <Route
          path="auth/:action"
          element={
            isAuthenticated ? <Navigate to="/homepage" /> : <SignInSignUp />
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
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/request" element={<RequestDashboardPage />} />
            <Route path="/opening" element={<OpeningDashboardPage />} />
            <Route
              path="/opening/:requestId"
              element={<OpeningDashboardPage />}
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
