import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './design/RegistrationPage.css';

function RegistrationPage() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegistration = async () => {
    try {
      const userData = {
        firstname,
        lastname,
        email,
        dob,
        password
      };

      const response = await axios.post('http://localhost:9090/api/v1/customer/add', userData);
      console.log('User registered:', response.data);

    } catch (error) {
      console.error('Registration error:', error);
    }
    setRegistrationSuccess(true);
  };

  if (registrationSuccess) {
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
        
        <div className="auth-container success-container">
          <h1>Registration Successful!</h1>
          <p>Your account has been created successfully</p>
          <Link to="/login" className="auth-button primary">
            Login to your account
          </Link>
        </div>
      </div>
    );
  }

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
        <h2>Create Account</h2>
        <p>Join MoodMate to start your wellness journey</p>
        
        <div className="auth-form">
          <div className="input-row">
            <div className="input-group">
              <input 
                type="text" 
                placeholder="First Name" 
                value={firstname} 
                onChange={(e) => setFirstName(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Last Name" 
                value={lastname} 
                onChange={(e) => setLastName(e.target.value)} 
              />
            </div>
          </div>
          
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
          
          <div className="input-group">
            <input 
              type="date" 
              placeholder="Date of Birth" 
              value={dob} 
              onChange={(e) => setBirthDate(e.target.value)} 
            />
          </div>
          
          <button className="auth-button primary" onClick={handleRegistration}>
            Create Account
          </button>
          
          <div className="auth-link">
            <p>Already have an account? <Link to="/login">Sign in here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;