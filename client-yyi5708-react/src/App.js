// import React, { useState, useEffect } from 'react';
// import TimerButton from './TimerButton';
// import ClockDisplay from './ClockDisplay';
// import StartTimeDisplay from './StartTimeDisplay';
// import EntryList from './EntryList';
// import './style.css';

// function App() {
//   const [isRunning, setIsRunning] = useState(false);
//   const [startTime, setStartTime] = useState(null);
//   const [entries, setEntries] = useState([]);

//   useEffect(() => {
//     let intervalId;
//     if (isRunning) {
//       setStartTime(startTime || new Date());
//       intervalId = setInterval(() => {
//         setEntries(prevEntries => [...prevEntries]);
//       }, 1000);
//     } else {
//       if (startTime) {
//         const currentTime = new Date();
//         const elapsedTime = new Date(currentTime - startTime);
//         setEntries(prevEntries => [...prevEntries, {
//           startTime,
//           stopTime: currentTime,
//           elapsedTime,
//         }]);
//         setStartTime(null);
//       }
//       clearInterval(intervalId);
//     }
//     return () => clearInterval(intervalId);
//   }, [isRunning, startTime]);

//   const handleToggleClick = () => {
//     setIsRunning(!isRunning);
//   };

//   const handleAddFiveMinutes = () => {
//     if (startTime) {
//       setStartTime(new Date(startTime.getTime() + 5 * 60 * 1000));
//     }
//   };

//   const handleSubtractFiveMinutes = () => {
//     if (startTime) {
//       setStartTime(new Date(startTime.getTime() - 5 * 60 * 1000));
//     }
//   };

//   return (
//     <div className='container'>
//       <div className='header'>Time Tracker</div>
//       <TimerButton isRunning={isRunning} onClick={handleToggleClick} />
//       <ClockDisplay elapsedTime={isRunning ? new Date(Date.now() - startTime) : null} />
//       <StartTimeDisplay startTime={startTime} />
//       <div className='time-adjust'>
//         <button onClick={handleAddFiveMinutes}>Add 5 Minutes</button>
//         <button onClick={handleSubtractFiveMinutes}>Subtract 5 Minutes</button>
//       </div>
//       <EntryList entries={entries} />
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import TimerButton from './TimerButton';
import ClockDisplay from './ClockDisplay';
import StartTimeDisplay from './StartTimeDisplay';
import EntryList from './EntryList';
import './style.css';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchStartTime = async () => {
      try {
        const response = await fetch('http://localhost:5000/', { mode: 'no-cors' });
        const data = await response.json();
        setStartTime(data.start_time);
      } catch (error) {
        console.error('Error with getting start time:', error);
      }
    };
    fetchStartTime();
  }, []);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      setStartTime(startTime || new Date());
      intervalId = setInterval(() => {
        setEntries(prevEntries => [...prevEntries]);
      }, 1000);
    } else {
      if (startTime) {
        const currentTime = new Date();
        const elapsedTime = new Date(currentTime - startTime);
        setEntries(prevEntries => [...prevEntries, {
          startTime,
          stopTime: currentTime,
          elapsedTime,
        }]);
        setStartTime(null);
      }
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, startTime]);

  const handleToggleClick = () => {
    setIsRunning(!isRunning);
    if (isRunning) {
      updateStartTimeOnServer(new Date());
    }
  };

  const handleAddFiveMinutes = () => {
    if (startTime) {
      setStartTime(new Date(startTime.getTime() + 5 * 60 * 1000));
    }
  };

  const handleSubtractFiveMinutes = () => {
    if (startTime) {
      setStartTime(new Date(startTime.getTime() - 5 * 60 * 1000));
    }
  };

  const updateStartTimeOnServer = async (newStartTime) => {
    try {
      const response = await fetch('http://localhost:5000/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start_time: newStartTime })
      });
      if (!response.ok) {
        throw new Error('Error with updating start time');
      }
      console.log('Success with updating start time');
    } catch (error) {
      console.error('Error with updating start time:', error);
    }
  };

  return (
    <div className='container'>
      <div className='header'>Time Tracker</div>
      <TimerButton isRunning={isRunning} onClick={handleToggleClick} />
      <ClockDisplay elapsedTime={isRunning ? new Date(Date.now() - startTime) : null} />
      <StartTimeDisplay startTime={startTime} />
      <div className='time-adjust'>
        <button onClick={handleAddFiveMinutes}>Add 5 Minutes</button>
        <button onClick={handleSubtractFiveMinutes}>Subtract 5 Minutes</button>
      </div>
      <EntryList entries={entries} />
    </div>
  );
}

export default App;