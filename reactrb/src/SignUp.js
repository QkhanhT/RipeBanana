import React, { useState } from 'react';
import { BrowserRouter, Router, Routes, Route , Link} from "react-router-dom";
import './SignUp.css'
import logo from './ripebanana-removebg.png';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    console.log(e.target.value)
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    console.log(e.target.value)
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send a request to Flask backend with the username and password.
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  };

  return (
    <div className="signup-background">
      <div className="logo">
        <img src={logo} alt="RipeBanana" width="220" height="180" style={{ marginRight: -20, marginBottom: 20 }}/>
      </div>
      <div className="signup-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="signup-title">
            <h2 className="header">Create an account</h2>
          </div>
          <div className="user-input">
            <label htmlFor="username">Username</label>
            <input 
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
            />
          </div>
          <div className="user-input">
          <label htmlFor="password">Password</label>
            <input 
              // style={{ backgroundColor: "#C4A484", height: "30px", width: "190px" }}
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="••••••••"
            />
          </div>
          <div className="user-input">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              // id="password"
              // value={password}
              // onChange={handlePasswordChange}
              placeholder="••••••••"
            />
          </div>
          <div className="signup-button-container">
            <button className="signup-button" type="submit" >Sign Up</button>
          </div>
          <div className="account-exists">
            Returning User?&nbsp;
            <Link to="/" className="login-here">Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
