import React, { useState } from 'react';
import { BrowserRouter, Router, Routes, Route , Link} from "react-router-dom";

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
    <form onSubmit={handleSubmit}>
      <section>
        <h2>
          Sign Up
        </h2>
      </section>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
      <Link to="/">Login Page</Link>
    </form>
  );
}

export default SignUp;
