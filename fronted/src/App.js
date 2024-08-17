 

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CheckEligibility from './components/CheckEligibility';
import Register from './components/Register';
import HODLogin from './components/HODLogin';
import HODDashboard from './components/HODDashboard';
import DownloadHallTicket from './components/DownloadHallTicket';
// import StudentDashboard from './components/StudentDashboard';
import Admin from './components/AdminLogin.js';
import Admin1 from './components/AdminDashboard.js';

function App() {
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
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin1" element={<Admin1 />} />

          {/* <Route path="/student-dashboard" element={<StudentDashboard />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
