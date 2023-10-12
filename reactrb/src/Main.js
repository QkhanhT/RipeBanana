import React, { useState } from 'react';
//import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Router, Routes, Route , Link} from "react-router-dom";
import './Main.css'
import { useParams, useNavigate } from "react-router-dom";
import logo from './ripebanana-removebg.png';

function Main() {
    const [inputUsername, setUsername] = useState('');
    const [inputPassword, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUserChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePassChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send a request to Flask backend with the username and password.
        const response = await fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputUsername, inputPassword }),
        });
        navigate('/Dashboard')
    };
    return (
        <div className="login-background">
            <div className="logo">
                <img src={logo} alt="RipeBanana" width="220" height="200" style={{ marginRight: -20, marginBottom: 20 }}/>
            </div>
            <div className="login-container">
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="login-title">
                        <h2 className="header">Log In</h2>
                    </div>
                    <div className="user-input">
                        <label htmlFor="username">Username</label>
                        <input 
                        type="text" 
                        id="inputUsername" 
                        value={inputUsername} 
                        onChange={handleUserChange}
                        placeholder="Username"
                        />
                    </div>
                    <div className="user-input">
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password" 
                        id="inputPassword" 
                        value={inputPassword} 
                        onChange={handlePassChange}
                        placeholder="••••••••"
                        />
                    </div>
                    <div className="login-button-container">
                        <button className="login-button" type="submit">Log In</button>
                    </div> 
                    <div className="account-signup">
                        Don't have an account?&nbsp;
                        <Link to="signup" className="signup-here">Sign up here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Main;