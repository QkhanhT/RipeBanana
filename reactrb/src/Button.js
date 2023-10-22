// Button.js
import React from 'react';
import Button from '@mui/material/Button';
import Dashboard from './Dashboard';
import Projects from './Projects';

function MyButton(props) {
  return (
    <Button variant="contained" color="primary" onClick={props.onClick}>
      {props.label}
    </Button>
  );
}

export default MyButton;
