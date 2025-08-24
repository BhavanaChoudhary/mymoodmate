import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';

import LoginPage from './component/LoginPage';
import HomePage from './component/HomePage';
import RegistrationPage from './component/RegistrationPage';
import Dashboard from './component/Dashboard';

function App() {
  const [user, setUser] = useState('');

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser('');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/login"
            element={
              !user ? (
                <LoginPage onLogin={handleLogin} />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/home"
            element={
              user ? (
                <HomePage user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
