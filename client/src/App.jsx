import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Redirect;
} from 'react-router-dom';

import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      
    </Router>
  );
}

export default App;
