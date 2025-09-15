document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DEFINE OUR EMOJI KEYWORD MAP ---
    // You can expand this list infinitely!
    const emojiMap = {
        'fly': '✈️', 'flying': '🕊️', 'sky': '🌌',
        'ocean': '🌊', 'water': '💧', 'sea': '🌊',
        'dog': '🐶', 'cat': '🐱', 'animal': '🐾',
        'car': '🚗', 'driving': '🛣️',
        'school': '🏫', 'test': '📝', 'exam': '📝',
        'love': '❤️', 'heart': '❤️', 'kiss': '😘',
        'sad': '😢', 'cry': '😭', 'upset': '😠',
        'happy': '😊', 'joy': '😄', 'laugh': '😂',
        'scared': '😨', 'monster': '👹', 'ghost': '👻',
        'running': '🏃', 'chase': '🏃‍♀️',
        'fall': '🍂', 'falling': '🤸',
        'teeth': '🦷', 'tooth': '🦷',
        'money': '💰', 'gold': '🪙', 'rich': '🤑',
        'friend': '🧑‍🤝‍🧑', 'family': '👨‍👩‍👧‍👦',
        'house': '🏠', 'home': '🏡',
        'fire': '🔥', 'burn': '🔥',
        'food': '🍔', 'eat': '🍕',
        'time': '⏳', 'clock': '⏰',
        'space': '🚀', 'star': '⭐', 'moon': '🌕',
    };

    // --- 2. GET REFERENCES TO HTML ELEMENTS ---
    const dreamInput = document.getElementById('dream-input');
    const suggestedEmojisContainer = document.getElementById('suggested-emojis');
    const selectedEmojisContainer = document.getElementById('selected-emojis');
    const saveDreamBtn = document.getElementById('save-dream-btn');
    const dreamList = document.getElementById('dream-list');

    let currentSelectedEmojis = new Set();

    // --- 3. FUNCTION TO FIND AND DISPLAY EMOJIS ---
    const updateSuggestedEmojis = () => {
        suggestedEmojisContainer.innerHTML = '';
        const text = dreamInput.value.toLowerCase();
        const words = text.split(/[\s,.\-!?"']+/); // Split by spaces and punctuation
        
        const foundEmojis = new Set();
        words.forEach(word => {
            if (emojiMap[word]) {
                foundEmojis.add(emojiMap[word]);
            }
        });

        foundEmojis.forEach(emoji => {
            const emojiSpan = document.createElement('span');
            emojiSpan.className = 'emoji';
            emojiSpan.textContent = emoji;
            // Add to selected list when clicked
            emojiSpan.addEventListener('click', () => {
                if (!currentSelectedEmojis.has(emoji)) {
                    currentSelectedEmojis.add(emoji);
                    updateSelectedEmojis();
                }
            });
            suggestedEmojisContainer.appendChild(emojiSpan);
        });
    };
    
    // --- 4. FUNCTION TO UPDATE THE 'SELECTED' EMOJI AREA ---
    const updateSelectedEmojis = () => {
        selectedEmojisContainer.innerHTML = '';
        currentSelectedEmojis.forEach(emoji => {
            const emojiSpan = document.createElement('span');
            emojiSpan.className = 'emoji';
            emojiSpan.textContent = emoji;
            // Remove from selected list when clicked
            emojiSpan.addEventListener('click', () => {
                currentSelectedEmojis.delete(emoji);
                updateSelectedEmojis();
            });
            selectedEmojisContainer.appendChild(emojiSpan);
        });
    }

    // --- 5. FUNCTION TO SAVE A DREAM ---
    const saveDream = () => {
        const text = dreamInput.value.trim();
        const emojis = Array.from(currentSelectedEmojis);

        if (text === '') {
            alert('Please write something about your dream.');
            return;
        }

        const dream = {
            id: Date.now(), // Unique ID based on timestamp
            date: new Date().toLocaleString(),
            text: text,
            emojis: emojis
        };

        // Get existing dreams from localStorage, or initialize an empty array
        const dreams = JSON.parse(localStorage.getItem('dreams')) || [];
        dreams.unshift(dream); // Add the new dream to the beginning
        localStorage.setItem('dreams', JSON.stringify(dreams));

        // Clear the form and display the new dream
        dreamInput.value = '';
        currentSelectedEmojis.clear();
        updateSuggestedEmojis();
        updateSelectedEmojis();
        displayDreams();
    };

    // --- 6. FUNCTION TO DISPLAY ALL SAVED DREAMS ---
    const displayDreams = () => {
        dreamList.innerHTML = '';
        const dreams = JSON.parse(localStorage.getItem('dreams')) || [];

        dreams.forEach(dream => {
            const dreamItem = document.createElement('div');
            dreamItem.className = 'dream-item';

            dreamItem.innerHTML = `
                <div class="date">${dream.date}</div>
                <div class="emojis">${dream.emojis.join(' ')}</div>
                <div class="text">${dream.text}</div>
            `;
            dreamList.appendChild(dreamItem);
        });
    };

    // --- 7. ATTACH EVENT LISTENERS ---
    dreamInput.addEventListener('input', updateSuggestedEmojis);
    saveDreamBtn.addEventListener('click', saveDream);

    // --- 8. INITIAL LOAD ---
    // Display any dreams that are already saved when the page loads
    displayDreams();
});