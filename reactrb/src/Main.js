import React, { useState } from 'react';
//import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Router, Routes, Route , Link} from "react-router-dom";

import { useParams } from "react-router-dom";

function Main() {
    //React Hook for Username, Password, and Login message
    const [inputUsername, setUsername] = useState('');
    const [inputPassword, setPassword] = useState('');
    const [resultMessageLogin, setResultMessageLogin] = useState('');

    const handleUserChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePassChange = (event) => {
        setPassword(event.target.value);
    };

    //Login send to backend
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

        //Wait for backend to return result of logging in
        const resultFromBackend = await response.json(); 

        //use "setResultMessageLogin" function defined in hook to update state variable "resultMessageLogin"
        setResultMessageLogin(data.returnMessage); 
    };
    //Login Page UI
    return (
        <div>
            <section>
                <center>
                    <h1>RipeBanana</h1>
                    <h2>Log in</h2>
                </center>
            </section>
            <section>
            <form onSubmit={handleSubmit}>
                <div>
                    <center>
                        <label>
                        Username:
                        <input type="text" id="inputUsername" value={inputUsername} onChange={handleUserChange}/>
                        </label>
                        <label>
                        Password: 
                        <input type="password" id="inputPassword" value={inputPassword} onChange={handlePassChange}/>
                        </label>
                        <div>
                        <button type="submit">Log In</button>
                        </div>
                        <div>
                            <h4>{resultMessageLogin}</h4> 
                        </div>
                    </center>        
                </div>
            </form>
            </section>
            <section>
                <center>
                    <p>New User? </p>
                    <nav>
                    <Link to="signup">Sign Up</Link>
                    </nav>
                </center>   
            </section>
        </div>
    );
}

export default Main;