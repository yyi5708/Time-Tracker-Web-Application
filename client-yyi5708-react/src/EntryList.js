import React, { useState } from 'react';
import Entry from './Entry';
import './style.css';

function EntryList({ entries }) {
  const [showEntries, setShowEntries] = useState(5);

  const handleShowMore = () => {
    setShowEntries(entries.length);
  };

  const handleShowLess = () => {
    setShowEntries(5);
  };

  const displayedEntries = entries.slice(0, showEntries);

  return (
    <div className='entries'>
      {displayedEntries.map(entry => (
        <Entry key={entry.startTime.getTime()} entry={entry} />
      ))}
      {entries.length > 5 && (
        showEntries === 5 ? (
          <button onClick={handleShowMore}>Show More</button>
        ) : (
          <button onClick={handleShowLess}>Show Less</button>
        )
      )}
    </div>
  );
}

export default EntryList;