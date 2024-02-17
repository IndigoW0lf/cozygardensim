import React, { useState, useEffect } from 'react';
import './App.css';
import Garden from './components/Garden';
import Sidebar from './components/Sidebar';
import Plant from './components/Plant';
import MagicIndicator from './components/MagicIndicator';
import GameLogicManager from './components/GameLogicManager';
import { ambientMagicAssessment } from './functions/magicFunctions';

function App() {
  const [magicReport, setMagicReport] = useState('');

  useEffect(() => {
    const report = ambientMagicAssessment('full moon', 'forest edge', true);
    setMagicReport(report);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* Display the result */}
        <p>{magicReport}</p>
      </header>
      <Sidebar />
      <Garden />
      <Plant />
      <MagicIndicator />
      <GameLogicManager />
    </div>
  );
}

export default App;
