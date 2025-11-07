 

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CheckEligibility from './components/CheckEligibility';
import Register from './components/Register';
import HODLogin from './components/HODLogin';
import HODDashboard from './components/HODDashboard';
import DownloadHallTicket from './components/DownloadHallTicket';
import AdminLogin from './components/AdminLogin.js';
import AdminDashboard from './components/AdminDashboard.js';

function App() {
  const [adminToken, setAdminToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setAdminToken(token);
    }
  }, []);

  const handleAdminLogin = (token) => {
    setAdminToken(token);
  };

  const handleAdminLogout = () => {
    setAdminToken(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/check-eligibility" element={<CheckEligibility />} />
          <Route path="/register/:rollNumber" element={<Register />} />
          <Route path="/hod-dashboard" element={<HODDashboard />} />
          <Route path="/hod-login" element={<HODLogin />} />
          <Route path="/DownloadHallTicket" element={<DownloadHallTicket />} />
          <Route 
            path="/admin" 
            element={
              adminToken ? 
                <AdminDashboard token={adminToken} onLogout={handleAdminLogout} /> : 
                <AdminLogin setToken={handleAdminLogin} />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
