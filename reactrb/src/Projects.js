// Projects.js
import React, { useEffect, useState, useCallback } from 'react';
import { useRef } from 'react';
import MyButton from './Button';
import './Projects.css'; // Import the CSS file
import {useNavigate } from "react-router-dom";

function Projects(props) {
  const { initialProjects, initialSets } = props;
  const [projects, setProjects] = useState(initialProjects);
  const [sets, setSets] = useState(initialSets);
  const [valueHW1, setValueHW1] = useState('');
  const [valueHW2, setValueHW2] = useState('');
  const [joined, setjoined] = useState(false);

  const handleValueHW1 = (event) => {
    setValueHW1(event.target.value);
  };
  const handleValueHW2 = (event) => {
    setValueHW2(event.target.value);
  };

  const handleCheckInHW1 = async(projectId, e) => {
    //if (joined == true){;
      const requestData = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ valueHW1, projectId}),
      }
      fetch('/dashboard/checkin/hw1', requestData)

      .then((response) => response.text())
        .then(function(data){
            data = JSON.parse(data);
            if(data.code === 200){
                setProjects(data.projects)
                // setSets(data.sets)
            }
        });
        console.log(`Checking in ${valueHW1} HW1 items for Project ${projectId}`);
    //}
  };

  const handleCheckOutHW1 = async(projectId, e) => {
    //if (joined == true){
      const requestData = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ valueHW1, projectId}),
      }
      fetch('/dashboard/checkout/hw1', requestData)
      
      .then((response) => response.text())
        .then(function(data){
            data = JSON.parse(data);
            if(data.code === 200){
              setProjects(data.projects)
              // setSets(data.sets)
            }
        });
        console.log(`Checking out ${valueHW1} HW1 items for Project ${projectId}`);
    //}
  };

  const handleCheckInHW2 = async(projectId, e) => {
    //if (joined == true){
      const requestData = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ valueHW2, projectId}),
      }
      fetch('/dashboard/checkin/hw2', requestData)
      
      .then((response) => response.text())
        .then(function(data){
            data = JSON.parse(data);
            if(data.code === 200){
              setProjects(data.projects)
              // setSets(data.sets)
            }
        });
        console.log(`Checking in ${valueHW2} HW2 items for Project ${projectId}`);
    //}
  };

  const handleCheckOutHW2 = async(projectId, e) => {
    //if (joined == true){
      const requestData = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ valueHW2, projectId}),
      }
      fetch('/dashboard/checkout/hw2', requestData)
      
      .then((response) => response.text())
        .then(function(data){
            data = JSON.parse(data);
            if(data.code === 200){
              setProjects(data.projects)
              // setSets(data.sets)
            }
        });
        console.log(`Checking out ${valueHW2} HW2 items for Project ${projectId}`);
    //}
  };

  useEffect(() => {
    // Update projectsData when the 'projects' prop changes
    setProjects(projects);
    setSets(sets);
  }, [projects, sets]);  

  //Code for polling, update project info every x seconds
  useEffect(() => {
    const updateInterval = setInterval(() => {
      //Fetch from frontend
      fetch("dashboard/projects")
      //Parse JSON response
      .then((response) => response.json())
      .then((data) => {
        //Update projects state
        setProjects(data.projects); 
        //Update sets state
        setSets(data.sets); 
      })
      //Error handling
      .catch((error) => { 
        console.error("Failed to fetch projects and sets:", error); 
      });
    }, 5000);

    return () => clearInterval(updateInterval); 
    }, []);
    //End of polling

  return (
    <div>
            <h2>Projects</h2>
            {projects.map((project) => (
                <div key={project['name']} className="project-container"> 
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
                </div>
            ))}
    </div>
  );
}

// () => handleCheckOutHW2(project['name'])}

export default Projects;
