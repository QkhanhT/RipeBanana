import React, { useState } from 'react';

function Form() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    //setInputValue(event.target.value);
  }

  return(
    <div>
      <center>
      <form>
        <label>
          Username: 
          <input type="text" value={inputValue} onChange={handleInputChange}/>
          
        </label>
        <label>
          Password: 
          <input type="text" value={inputValue} onChange={handleInputChange}/>
          
        </label>
      </form>
      </center>
      
    </div>
  )
}

export default Form;