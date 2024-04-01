import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Redirect;
} from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import RequestBatchSelectionPage from "./pages/RequestBatchSelectionPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      <Routes>
        <Route path="/request-batch" element={<RequestBatchSelectionPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
