import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route, can be used to redirect to login page */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Login page route */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Dashboard page route */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
