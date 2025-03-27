import React from 'react';
import './style.css';

function TimerButton({ isRunning, onClick }) {
  return (
    <button
      className='button'
      style={{ backgroundColor: isRunning ? '#FF0000' : '#00FF00' }}
      onClick={onClick}
    >
      {isRunning ? 'Stop' : 'Start'}
    </button>
  );
}

export default TimerButton;