import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Redirect;
} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OnboardPage from './pages/OnboardPage';
import Redirect from './pages/LandingPage/Redirect';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RequestDashboardPage from './pages/RequestDashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/redirect" element={<Redirect />} />
        <Route path="/onboard" element={<OnboardPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/request' element={<RequestDashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
