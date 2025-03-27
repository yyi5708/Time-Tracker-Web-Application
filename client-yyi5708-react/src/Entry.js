import React from 'react';
import './style.css';

function Entry({ entry }) {
  return (
    <div className='entry'>
      <p>Client: John Doe, Inc.</p>
      <p>Start Time: {entry.startTime.toLocaleTimeString()}</p>
      <p>Stop Time: {entry.stopTime.toLocaleTimeString()}</p>
      <p>Time Elapsed: {entry.elapsedTime.toISOString().substr(11, 8)}</p>
    </div>
  );
}

export default Entry;