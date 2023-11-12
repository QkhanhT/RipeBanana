// Projects.js
import React, { useEffect, useState, useCallback } from 'react';
import { useRef } from 'react';
import MyButton from './Button';
import './Projects.css';
import {useNavigate } from "react-router-dom";

function Projects(props) {
  const { initialProjects, initialSets } = props;
  const [project, setProjects] = useState(initialProjects);
  const [sets, setSets] = useState(initialSets);
  const [valueHW1, setValueHW1] = useState(''); //TODO: Make sure values are numbers within the handlers
  const [valueHW2, setValueHW2] = useState('');
  const [joined, setjoined] = useState(false);
  const [error, setError] = useState(false); //Handler for error variable
  const [errMessage, setErrMessage] = useState(''); //Handler for error display text
  const navigate = useNavigate();

  const handleValueHW1 = (event) => {
    setValueHW1(event.target.value);
  };
  const handleValueHW2 = (event) => {
    setValueHW2(event.target.value);
  };

  const handleCheckInHW1 = async(name, e) => {
    //if (joined == true){;
      const requestData = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ valueHW1, name}),
      }
      //Fetch from backend using this handle
      fetch('/dashboard/checkin/hw1', requestData)

      .then((response) => response.text())
        .then(function(data){
            //Get message from backend
            data = JSON.parse(data);
            //Success
            if(data.code === 200){
                setProjects(data.project)
                setError(false)
                setSets(data.sets)
            }
            //Partial success
            else if(data.code === 300){
              setProjects(data.project)
              setSets(data.sets)
              setErrMessage("Checkin complete, however you don't have enough HW1 items to check in the full amount.")
              setError(true)
            }
            //Fail
            else if(data.code === 400){
              setErrMessage("Checkin failed for HW1.")
              setError(true)
            }
        });
        console.log(`Checking in ${valueHW1} HW1 items for Project ${name}`);
    //}
  };

  const handleCheckOutHW1 = async(name, e) => {
    //if (joined == true){
      const requestData = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ valueHW1, name}),
      }
      fetch('/dashboard/checkout/hw1', requestData)
      
      .then((response) => response.text())
        .then(function(data){
            data = JSON.parse(data);
            if(data.code === 200){
              setProjects(data.project)
              setSets(data.sets)
              console.log(data.project)
              setError(false)
            }
            else if(data.code === 300){
              setErrMessage("Checkout complete, however there are not enough HW1 items to check out full amount.")
              setError(true)
              setProjects(data.project)
              setSets(data.sets)
            }
            else if(data.code === 400){
              setErrMessage("Checkout failed for HW1.")
              setError(true)
            }
        });
        console.log(`Checking out ${valueHW1} HW1 items for Project ${name}`);
    //}
  };

  const handleCheckInHW2 = async(name, e) => {
    //if (joined == true){
      const requestData = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ valueHW2, name}),
      }
      //Fetch from backend handle
      fetch('/dashboard/checkin/hw2', requestData)
      
      .then((response) => response.text())
        .then(function(data){
            data = JSON.parse(data);
            if(data.code === 200){
              setProjects(data.project)
              setSets(data.sets)
              setError(false)
            }
            else if(data.code === 300){
              setProjects(data.project)
              setSets(data.sets)
              setErrMessage("Checkin complete, however you don't have enough HW2 items to check in the full amount.")
              setError(true)
            }
            else if(data.code === 400){
              setErrMessage("Checkin failed for HW2.")
              setError(true)
            }
        });
        console.log(`Checking in ${valueHW2} HW2 items for Project ${name}`);
    //}
  };

  const handleCheckOutHW2 = async(name, e) => {
    //if (joined == true){
      const requestData = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ valueHW2, name}),
      }
      fetch('/dashboard/checkout/hw2', requestData)
      
      .then((response) => response.text())
        .then(function(data){
            data = JSON.parse(data);
            if(data.code === 200){
              setProjects(data.project)
              setSets(data.sets)
              setError(false)
            }
            else if(data.code === 300){
              setProjects(data.project)
              setSets(data.sets)
              setErrMessage("Checkout complete, however there are not enough HW2 items to check out full amount.")
              setError(true)
            }
            else if(data.code === 400){
              setErrMessage("Checkout failed for HW2.")
              setError(true)
            }
        });
        console.log(`Checking out ${valueHW2} HW2 items for Project ${name}`);
    //}
  };

  //Error message display handler
  const errorMessage = () => {
    return(
        //Displays message if error variable is true
        <div style={{
            display: error ? '' : 'none',
        }}>
            <p>{errMessage}</p>
        </div>
    )
}

  useEffect(() => {
    // Update projectsData when the 'projects' prop changes
    setProjects(project);
    setSets(sets);
  }, [project, sets]);  

  return ( 
    <div className="outer-project">
        <div className="project-hardware-header">
          <h1>Project and Hardware Manager</h1>
        </div>
        <div className="projects-header">
          <h2>Project: {project['name']}</h2>
        </div>
        <div className="hardware-set">
            <div className="set-title">
              <h3>Hardware Set 1</h3>
            </div>
            <div className="set-availability">
              <p>Availability: {sets[0]['availability']}/{sets[0]['capacity']}</p>
              <p>Checked Out: {project['hardware1']}</p>
            </div>
            <div className="set-input">
            <label>Enter Quantity:</label>
              <input
                  type="text"
                  id="valueHW1"
                  placeholder="Ex: 12"
                  value={valueHW1}
                  onChange={handleValueHW1}
              />
            </div>
            <div className="set-buttons">
              <button className="checkin-button" onClick={() => handleCheckInHW1(project['name'])} >Check In</button>
              <button className="checkout-button" onClick={() => handleCheckOutHW1(project['name'])} >Check Out</button>
            </div>
        </div>
        <div className="hardware-set">
            <div className="set-title">
              <h3>Hardware Set 2</h3>
            </div >
            <div className="set-availability">
              <p>Availability: {sets[1]['availability']}/{sets[1]['capacity']}</p>
              <p>Checked Out: {project['hardware2']}</p>
            </div>
            <div className="set-input">
                <label>Enter Quantity:</label>
                <input
                    type="text"
                    id="valueHW2"
                    placeholder="Ex: 12"
                    value={valueHW2}
                    onChange={handleValueHW2}
                />
            </div>
            <div className="set-buttons">
              <button className="checkin-button" onClick={() => handleCheckInHW2(project['name'])} >Check In</button>
              <button className="checkout-button" onClick={() => handleCheckOutHW2(project['name'])} >Check Out</button>
            </div>
        </div>
        <div className="projects-back-button-container">
          <button className="project-back-buttons" onClick={() => navigate('/projsignin')}>Back</button>
        </div>
        <div className="projects-logoff-button-container">
          <button className="project-logoff-buttons" onClick={() => navigate('/')}>Log Off</button>
        </div>
        <div>
            {errorMessage()}
        </div>        
    </div>
  );
}

export default Projects;
