import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("http://localhost:5000/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

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
