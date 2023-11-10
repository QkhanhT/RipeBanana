// Projects.js
import React, { useEffect, useState, useCallback } from 'react';
import { useRef } from 'react';
import MyButton from './Button';
import './Projects.css'; // Import the CSS file
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
                // setSets(data.sets)
                setError(false)
                setSets(data.sets)
                // setSets(data.setss)
            }
            //Partial success
            else if(data.code === 300){
              setProjects(data.project)
              setSets(data.sets)
              setErrMessage("Checkin complete. Can't check in full amount for HW1")
              setError(true)
            }
            //Fail
            else if(data.code === 400){
              setErrMessage("Checkin failed for HW1")
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
              // setSets(data.sets)
              setError(false)
            }
            else if(data.code === 300){
              setErrMessage("Checkout complete. Can't give full amount for HW1")
              setError(true)
              setProjects(data.project)
              setSets(data.sets)
            }
            else if(data.code === 400){
              setErrMessage("Checkout failed for HW1")
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
              // setSets(data.sets)
              setError(false)
            }
            else if(data.code === 300){
              setProjects(data.project)
              setSets(data.sets)
              setErrMessage("Checkin complete. Can't check in full amount for HW2")
              setError(true)
            }
            else if(data.code === 400){
              setErrMessage("Checkin failed for HW2")
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
              // setSets(data.setss)
            }
            else if(data.code === 300){
              setProjects(data.project)
              setSets(data.sets)
              setErrMessage("Checkout complete. Can't give full amount for HW2")
              setError(true)
            }
            else if(data.code === 400){
              setErrMessage("Checkout failed for HW2")
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
    <div>
            <h2>Project</h2>
            <h3>{project['name']}</h3>
                      <div>
                        <p>Hardware Set 1</p>
                        <p>Availability: {sets[0]['availability']}/{sets[0]['capacity']}  Checked Out: {project['hardware1']}</p>
                        {/* <div > */}
                          <input
                              type="text"
                              id="valueHW1"
                              placeholder="Enter quantity"
                              value={valueHW1}
                              onChange={handleValueHW1}
                          />
                          <MyButton label="Check In" onClick={() => handleCheckInHW1(project['name'])} />
                          <MyButton label="Check Out" onClick={() => handleCheckOutHW1(project['name'])} />
                        {/* </div> */}
                      </div>
                      <div>
                      <p>Hardware Set 2</p>
                        <p>Availability: {sets[1]['availability']}/{sets[1]['capacity']}  Checked Out: {project['hardware2']}</p>
                          <input
                              type="text"
                              id="valueHW2"
                              placeholder="Enter quantity"
                              value={valueHW2}
                              onChange={handleValueHW2}
                          />
                          <MyButton label="Check In" onClick={() => handleCheckInHW2(project['name'])} />
                          <MyButton label="Check Out" onClick={() => handleCheckOutHW2(project['name'])} />
                      </div>
                      <div>
                        <MyButton label="<--" onClick={() => navigate('/projsignin')}></MyButton>
                      </div>
                      <div>
                        <MyButton label="Log Off" onClick={() => navigate('/')}></MyButton>
                      </div>
                      <div>
                {errorMessage()}
            </div>
                      
    </div>
  );
}

export default Projects;
