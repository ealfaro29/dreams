import React from 'react';

function DreamLog({ dreams }) {
  return (
    <section className="dream-log">
      <h2>My Dream Log</h2>
      <div id="dream-list">
        {dreams.map((dream) => (
          <div key={dream.id} className="dream-item">
            <div className="date">{dream.date}</div>
            <div className="emojis">{dream.emojis.join(' ')}</div>
            <div className="text">{dream.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DreamLog;