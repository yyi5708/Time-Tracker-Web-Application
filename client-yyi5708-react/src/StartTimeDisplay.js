import React from 'react';
import './style.css';

function StartTimeDisplay({ startTime }) {
  return (
    <div className='small-text'>
      {startTime ? `Start Time: ${startTime.toLocaleTimeString()}` : 'Start Time: -'}
    </div>
  );
}

export default StartTimeDisplay;