import React, { useState } from 'react';
import './Form.css'; // Import CSS file for styles

const Form = () => {
  const [activeForm, setActiveForm] = useState('login');

  return (
    <div className="auth-container">
      <div className="forms-container">
        {/* Login Form */}
        <div 
          className={`form login-form ${activeForm === 'login' ? 'active' : ''}`} 
          onClick={() => setActiveForm('login')}
        >
          <h2>Login</h2>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="btn login-btn">Login</button>
        </div>

        {/* Register Form */}
        <div 
          className={`form register-form ${activeForm === 'register' ? 'active' : ''}`} 
          onClick={() => setActiveForm('register')}
        >
          <h2>Register</h2>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <button className="btn register-btn">Register</button>
        </div>
      </div>
    </div>
  );
};

export default Form;