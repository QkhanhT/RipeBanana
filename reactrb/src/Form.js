import React, { useState } from 'react';

function Form() {
  const [inputUsername, setUsername] = useState('');
  const [inputPassword, setPassword] = useState('');

  const handleUserChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePassChange = (event) => {
    setPassword(event.target.value);
  }

  return(
    <div>
      <center>
      <form>
        <label>
          Username: 
          <input type="text" value={inputUsername} onChange={handleUserChange}/>
        </label>
        <label>
          Password: 
          <input type="password" value={inputPassword} onChange={handlePassChange}/>
        </label>
        <div>
          <input type="submit" value = "Login"/>
        </div>
      </form>
      </center>
      
    </div>
  )
}

export default Form;