import React, { useState } from 'react';
import Projects from './Projects';
import Hardware from './Hardware';
import './Dashboard.css'; // Import your application-specific CSS here
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function Dashboard() {
  const [joinedProject, setJoinedProject] = useState(null);

  // Example state for projects with joined status
  const projects = [
    { id: 1, name: 'Project 1', joined: false, hardwareSet: 5 },
    { id: 2, name: 'Project 2', joined: false, hardwareSet: 10 },
    { id: 3, name: 'Project 3', joined: false, hardwareSet: 7 },
    // Add more projects here
  ];

  const joinProject = (projectId) => {
    // Check if the user is already in a project
    if (joinedProject !== null) {
      alert('You are already in a project. Leave the current project to join another.');
      return;
    }

    // Update the joined status of the selected project
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        return { ...project, joined: true };
      }
      return project;
    });

    setJoinedProject(projectId);
  };

  const leaveProject = (projectId) => {
    // Update the joined status of the selected project to false
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        return { ...project, joined: false };
      }
      return project;
    });

    setJoinedProject(null);
  };

  return (
    <div className="Dashboard">
      <Container>
        <Typography variant="h4" gutterBottom>
          Project and Hardware Manager
        </Typography>
        <center>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Projects
                projects={projects}
                joinedProject={joinedProject}
                joinProject={joinProject}
                leaveProject={leaveProject}
              />
            </Grid>
          </Grid>
        </center>
      </Container>
    </div>
  );
}

export default Dashboard;