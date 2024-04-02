import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Redirect;
} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import OnboardPage from './pages/OnboardPage';
import Redirect from './pages/LandingPage/Redirect';
import RequestBatchSelectionPage from "./pages/RequestBatchSelectionPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/auth/redirect" element={<Redirect />} />
        <Route path="/request-batch" element={<RequestBatchSelectionPage />} />
        <Route path="/onboard" element={<OnboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
