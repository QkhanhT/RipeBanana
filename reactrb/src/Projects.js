// Projects.js
import React, { useState } from 'react';
import MyButton from './Button';
import './Projects.css'; // Import the CSS file
import Hardware from './Hardware';

function Projects(props) {
  const { projects, joinedProject, joinProject, leaveProject } = props;

  const [checkInValue, setCheckInValue] = useState('');

  const handleCheckIn = (projectId) => {
    // Implement check-in logic here
    console.log(`Checking in ${checkInValue} items for Project ${projectId}`);
  };

  const handleCheckOut = (projectId) => {
    // Implement check-out logic here
    console.log(`Checking out ${checkInValue} items for Project ${projectId}`);
  };

  return (
    <div>
        <center>
            <h2>Projects</h2>
            {projects.map((project) => (
                <div key={project.id} className="project-container">
                <div className="project-details">
                    <div>
                    <strong>{project.name}</strong>
                    <p>
                        <Hardware></Hardware>
                    </p>
                    </div>
                    <div className="project-actions">
                    <input
                        type="number"
                        placeholder="Enter quantity"
                        value={checkInValue}
                        onChange={(e) => setCheckInValue(e.target.value)}
                    />
                    <MyButton label="Check In" onClick={() => handleCheckIn(project.id)} />
                    <MyButton label="Check Out" onClick={() => handleCheckOut(project.id)} />
                    </div>
                </div>
                <div>
                    {project.joined ? (
                    <MyButton label="Leave" onClick={() => leaveProject(project.id)} />
                    ) : (
                    <MyButton label="Join" onClick={() => joinProject(project.id)} />
                    )}
                </div>
                </div>
            ))}
        </center>
    </div>
  );
}

export default Projects;
