import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Main from './Main';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import PlaceHolder from './PlaceHolder';
import ProjSignin from './ProjSignIn';
import './App.css';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element = {<Main/>}></Route>
        <Route path="signup" element = {<SignUp/>}></Route>
        <Route path="projsignin" element = {<ProjSignin/>}></Route>
        <Route path="dashboard" element = {<Dashboard/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
