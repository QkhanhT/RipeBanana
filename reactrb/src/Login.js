import React, { useState } from 'react';

function Login() {
  const [inputUsername, setUsername] = useState('');
  const [inputPassword, setPassword] = useState('');

  const handleUserChange = (event) => {
      setUsername(event.target.value);
  };

  const handlePassChange = (event) => {
      setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      // Send a request to Flask backend with the username and password.
      const response = await fetch('http://localhost:5000/', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputUsername, inputPassword }),
      });
  };

  return(
    <form onSubmit={handleSubmit}>
    <div>
      <center>
      <form>
        <label>
          Username:
          <input type="text" id="inputUsername" value={inputUsername} onChange={handleUserChange}/>
        </label>
        <label>
          Password: 
          <input type="password" id="inputPassword" value={inputPassword} onChange={handlePassChange}/>
        </label>
        <div>
          <input type="submit" value = "Login"/>
        </div>
      </form>
      </center>
      
    </div>
    </form>
  );
}

export default Login;