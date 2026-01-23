import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import ForgotPasswordPage from './ForgotPassword';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route is Login */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Route for your Forgot Password design */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Route for your Dashboard (Figma design in progress) */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;