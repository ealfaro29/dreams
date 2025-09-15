import React, { useState } from 'react';
import EmojiPicker from './EmojiPicker';

function DreamEntryForm({ onSave }) {
  const [text, setText] = useState('');
  const [selectedEmojis, setSelectedEmojis] = useState(new Set());

  const handleSave = () => {
    if (text.trim() === '') {
      alert('Please write something about your dream.');
      return;
    }

    const dream = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      text: text.trim(),
      emojis: Array.from(selectedEmojis),
    };

    onSave(dream);

    // Clear the form
    setText('');
    setSelectedEmojis(new Set());
  };
  
  const toggleEmoji = (emoji) => {
    const newSelected = new Set(selectedEmojis);
    if (newSelected.has(emoji)) {
        newSelected.delete(emoji);
    } else {
        newSelected.add(emoji);
    }
    setSelectedEmojis(newSelected);
  }

  return (
    <section className="dream-entry-form">
      <textarea
        id="dream-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter keywords or a description... e.g., flying over a blue ocean with a dog..."
      ></textarea>
      
      <EmojiPicker 
        dreamText={text}
        selectedEmojis={selectedEmojis}
        onEmojiSelect={toggleEmoji}
      />

      <button id="save-dream-btn" onClick={handleSave}>
        Save Dream
      </button>
    </section>
  );
}

export default DreamEntryForm;