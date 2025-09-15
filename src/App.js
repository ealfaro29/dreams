import React, { useState, useEffect } from 'react';
import DreamEntryForm from './components/DreamEntryForm';
import DreamLog from './components/DreamLog';
import './App.css';

function App() {
  const [dreams, setDreams] = useState([]);

  // Load dreams from localStorage when the app starts
  useEffect(() => {
    const savedDreams = JSON.parse(localStorage.getItem('dreams')) || [];
    setDreams(savedDreams);
  }, []);

  // Save a new dream
  const addDream = (dream) => {
    const newDreams = [dream, ...dreams];
    setDreams(newDreams);
    localStorage.setItem('dreams', JSON.stringify(newDreams));
  };

  return (
    <main className="container">
      <header>
        <h1>DreamScribe</h1>
        <p>What did you dream about last night?</p>
      </header>
      <DreamEntryForm onSave={addDream} />
      <DreamLog dreams={dreams} />
    </main>
  );
}

export default App;