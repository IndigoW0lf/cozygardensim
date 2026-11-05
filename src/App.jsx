import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Garden from './components/Garden';
import MagicIndicator from './components/MagicIndicator';
import GameLogicManager from './components/GameLogicManager';
import Store from './components/Store';
import { togglePause } from './store/actions/gardenActions';

function App() {
  const [selectedSeed, setSelectedSeed] = useState('sunflower');
  const player = useSelector(state => state.player);
  const paused = useSelector(state => state.garden.paused);
  const message = useSelector(state => state.garden.notice);
  const dispatch = useDispatch();
  return (
    <main className="App">
      <header className="App-header">
        <div><p className="eyebrow">A SMALL PATCH OF POSSIBILITY</p>
          <h1>Cozy Garden Simulator</h1>
          <p className="intro">A seed, a little patience, and something lovely to return to.</p>
        </div>
        <div className="wallet" aria-label="Garden progress">
          <span><strong data-testid="coin-balance">{player.coins}</strong> coins</span>
          <span>Level {player.level} <small>{player.xp} XP · {player.totalHarvests} harvested</small></span>
        </div>
      </header>
      <div className="garden-weather">
        <MagicIndicator />
        <button className="button button--quiet" onClick={() => dispatch(togglePause())}>
          {paused ? 'Resume garden' : 'Pause garden'}
        </button>
      </div>
      <p className="garden-notice" role="status">{message}</p>
      <div className="garden-layout">
        <Store selectedSeed={selectedSeed} onSelect={setSelectedSeed} />
        <Garden selectedSeed={selectedSeed} />
      </div>
      <footer className="garden-footer">
        <p>A small, early playable garden. Growth times and moon effects are fictional game rules.</p>
        <p>Your garden grows while this tab is visible. It rests when paused or hidden. This visit is not saved yet; refreshing starts a fresh patch.</p>
      </footer>
      <GameLogicManager />
    </main>
  );
}

export default App;
