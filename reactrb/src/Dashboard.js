import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Projects from './Projects';
import './Dashboard.css'; // Import your application-specific CSS here
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function Dashboard() {
  const location = useLocation();
  const passedProjects = location.state.projectList;
  const passedSets = location.state.setsList;

  return (
    <div className='Dashboard'>
      <Container>
        <Typography variant="h4" className='App-header'>
          Project and Hardware Manager
        </Typography>
        <center>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
            <Projects
                initialProjects={passedProjects}
                initialSets={passedSets}
              />
            </Grid>
          </Grid>
        </center>
      </Container>
    </div>
  );
}

export default Dashboard;