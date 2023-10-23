import React, { useState } from 'react';
import { BrowserRouter, Router, Routes, Route , Link} from "react-router-dom";
import './SignUp.css'
import logo from './ripebanana-removebg.png';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shouldDisplay, setDisplay] = useState(false);
  const [dispMessage, setMessage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    console.log(e.target.value)
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send a request to Flask backend with the username and password.
    const requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      //Fields to send to backend
      body: JSON.stringify({username, password, confirmPassword}),
    }
    fetch('/signup', requestData)
    .then((response) => response.text())
    .then(function(data){
      //Return message from backend after sign in
      data = JSON.parse(data)
      if(data.code == 200){
        setMessage("Account created. Please go to login page.")
      }
      else if(data.code == 300){
        setMessage("Passwords don't match")
      }
      else{
        setMessage(data.message + " is already taken. Please try again.")
      }
      setDisplay(true)
    })
  };

  const signUpMessage = () => {
    return(
      <div style={{
        display: shouldDisplay ? '' : 'none',
      }}>
        <p>{dispMessage}</p>
      </div>
    )
  } 

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
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="••••••••"
            />
          </div>
          <div className="signup-button-container">
            <button className="signup-button" type="submit" >Sign Up</button>
          </div>
          <div>
            {signUpMessage()}
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
