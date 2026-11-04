import React from 'react';
import './App.css';
import Garden from './components/Garden';
import MagicIndicator from './components/MagicIndicator';
import GameLogicManager from './components/GameLogicManager';
import Store from './components/Store';

function App() {
  return (
    <main className="App">
      <header className="App-header">
        <h1>Cozy Garden Simulator</h1>
        <p>A small magical garden, one seed at a time.</p>
      </header>
      <MagicIndicator />
      <Garden />
      <Store />
      <GameLogicManager />
    </main>
  );
}

export default App;
