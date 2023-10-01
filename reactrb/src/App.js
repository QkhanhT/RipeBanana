import logo from './logo.svg';
<<<<<<< HEAD
import React, {useState, useEffect} from 'react';
import './App.css';
=======
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
>>>>>>> 90d3da448de28e0e05220ff9b6251d476731c6d4

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element = {<Login/>}></Route>
        <Route path="signup" element = {<SignUp/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
