import React from 'react';
import './style.css';

function ClockDisplay({ elapsedTime }) {
  if (!elapsedTime) {
    return (
      <div className='clock'>
        00:00:00
      </div>
    );
  }
  return (
    <div className='clock'>
      {elapsedTime.toISOString().substr(11, 8)}
    </div>
  );
}

export default ClockDisplay;