import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Projects from './Projects';
import './Dashboard.css'; // Import your application-specific CSS here
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ProjSignin from './ProjSignIn';

function Dashboard() {
  const location = useLocation();
  var passedProjects = location.state.project;
  var passedSets = location.state.setsList;

  return (
    <div className='Dashboard'>
      <Projects
          initialProjects={passedProjects}
          initialSets={passedSets}
        />
    </div>
  );
}

export default Dashboard;