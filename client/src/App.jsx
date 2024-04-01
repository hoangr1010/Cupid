import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Redirect;
} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Redirect from './pages/LandingPage/Redirect';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/redirect" element={<Redirect />} />
      </Routes>
    </Router>
  );
}

export default App;
