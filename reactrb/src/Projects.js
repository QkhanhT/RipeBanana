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
  const [valueHW1, setValueHW1] = useState('');
  const [valueHW2, setValueHW2] = useState('');
  const [joined, setjoined] = useState(false);
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
      fetch('/dashboard/checkin/hw1', requestData)

      .then((response) => response.text())
        .then(function(data){
            data = JSON.parse(data);
            if(data.code === 200){
                setProjects(data.project)
                // setSets(data.sets)
            }
            else if(data.code === 300){
              setProjects(data.project)
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
            }
            else if(data.code === 300){
              setProjects(data.project)
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
      fetch('/dashboard/checkin/hw2', requestData)
      
      .then((response) => response.text())
        .then(function(data){
            data = JSON.parse(data);
            if(data.code === 200){
              setProjects(data.project)
              // setSets(data.sets)
            }
            else if(data.code === 300){
              setProjects(data.project)
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
              // setSets(data.sets)
            }
            else if(data.code === 300){
              setProjects(data.project)
            }
        });
        console.log(`Checking out ${valueHW2} HW2 items for Project ${name}`);
    //}
  };

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
                        <p>Hardware Set 1 - {project['hardware1']}/{sets[0]['capacity']}</p>
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
                        <p>Hardware Set 2 - {project['hardware2']}/{sets[1]['capacity']}</p>
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
                      
    </div>
  );
}

export default Projects;
