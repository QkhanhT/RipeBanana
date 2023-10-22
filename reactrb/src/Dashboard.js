import React, { useState } from 'react';
import { useEffect } from 'react';
import Projects from './Projects';
import Hardware from './Hardware';
import './Dashboard.css'; // Import your application-specific CSS here
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Main from './Main';
import MyButton from './Button';
import {useParams} from "react-router-dom"
import { projects } from './Main.js';
import { sets } from './Main.js';

function Dashboard() {

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
                projects={projects}
                sets={sets}
              />
            </Grid>
          </Grid>
        </center>
      </Container>
    </div>
  );
}

export default Dashboard;