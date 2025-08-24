import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './design/RegistrationPage.css';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const url = `http://localhost:9090/api/v1/customer/get?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
      const response = await axios.get(url);
      const userData = response.data;
      onLogin(userData);

    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="auth-page">
      <div className="gradient-bg">
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
        </div>
      </div>
      
      <div className="auth-container">
        <h2>Welcome Back</h2>
        <p>Sign in to your MoodMate account</p>
        
        <div className="auth-form">
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          
          <button className="auth-button primary" onClick={handleLogin}>
            Sign In
          </button>
          
          <div className="auth-link">
            <p>Don't have an account? <Link to="/register">Create one here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;