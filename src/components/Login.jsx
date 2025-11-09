import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [userType, setUserType] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Map user types to their phone numbers
  const userTypeToPhone = {
    'seller': '9876543210',
    'buyer': '9876543220',
    'ngo': '9876543230'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!userType) {
      setError('Please select a user type');
      return;
    }
    
    const phone = userTypeToPhone[userType];
    const success = onLogin(phone, password);
    if (!success) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="icon-wrapper">
            <svg className="pad-icon" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 20 C30 10, 40 5, 50 5 C60 5, 70 10, 70 20 L70 100 C70 110, 60 115, 50 115 C40 115, 30 110, 30 100 Z" 
                    stroke="#FF7B5F" strokeWidth="3" fill="#FFE5E0"/>
              <ellipse cx="50" cy="35" rx="15" ry="8" fill="#FF9A7B"/>
            </svg>
          </div>
          <h1>Menstrual<br/>Health & Hygiene</h1>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
              className="form-input form-select"
            >
              <option value="">Select User Type</option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
              <option value="ngo">NGO</option>
            </select>
          </div>

          <div className="form-group">
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            LOGIN
          </button>

          <div className="demo-credentials">
            <p className="demo-title">Demo Credentials</p>
            <p className="demo-text">Select user type and use password: <span className="demo-password">password123</span></p>
          </div>

          <a href="#" className="forgot-password">Forgot password?</a>
        </form>
      </div>
    </div>
  );
};

export default Login;

