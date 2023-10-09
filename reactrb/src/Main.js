import React from "react";
//import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Router, Routes, Route , Link} from "react-router-dom";

import { useParams } from "react-router-dom";

import Login from './Login'

function Main() {

    return (
        <div>
            <section>
                <center>
                    <h1>RipeBanana</h1>
                    <h2>Log in</h2>
                </center>
            </section>
            <section>
                <Login></Login>
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