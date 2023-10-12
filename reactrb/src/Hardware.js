// Hardware.js
import React from 'react';

function Hardware(props) {
  const hardwareSets = [
    { id: 1, name: 'Hardware Set 1', available: 50, capacity: 100 },
    { id: 2, name: 'Hardware Set 2', available: 50, capacity: 100 },
  ];

  return (
    <div>
      <ul>
        {hardwareSets.map((hardware) => (
          <li key={hardware.id}>
            {hardware.name} -{' '}
            {hardware.available}/{hardware.capacity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Hardware;
