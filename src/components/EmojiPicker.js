import React, { useState, useEffect } from 'react';
import emojis from '../emoji.json'; // Import the new database!

function EmojiPicker({ dreamText, selectedEmojis, onEmojiSelect }) {
    const [suggestedEmojis, setSuggestedEmojis] = useState(new Set());

    useEffect(() => {
        const words = dreamText.toLowerCase().split(/[\s,.\-!?"']+/);
        const found = new Set();
        
        if (dreamText.trim().length > 0) {
            emojis.forEach(emojiData => {
                // Check if any word is in the emoji's tags
                if (words.some(word => emojiData.tags.includes(word))) {
                    found.add(emojiData.emoji);
                }
            });
        }

        setSuggestedEmojis(found);
    }, [dreamText]);

    return (
        <div className="emoji-picker">
            <h3>Suggested Emoji</h3>
            <div id="suggested-emojis" className="emoji-list">
                {Array.from(suggestedEmojis).map(emoji => (
                    <span key={emoji} className="emoji" onClick={() => onEmojiSelect(emoji)}>
                        {emoji}
                    </span>
                ))}
            </div>
            <h3>Selected Emoji</h3>
            <div id="selected-emojis" className="emoji-list">
                 {Array.from(selectedEmojis).map(emoji => (
                    <span key={`selected-${emoji}`} className="emoji" onClick={() => onEmojiSelect(emoji)}>
                        {emoji}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default EmojiPicker;