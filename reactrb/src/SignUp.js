import React, { Component } from 'react';
import Login from './Login';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function SignUp() {
    return (
        <div>
          <h2>SignUp</h2>
          <form>
            <div>
              <label>Email:</label>
              <input
                type="email"
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
              />
            </div>
            <button type="submit">Login</button>
            <div>
                <nav>
                    <Link to="/">Login</Link>
                </nav>
            </div>
          </form>
        </div>
    );
}

  export default SignUp;