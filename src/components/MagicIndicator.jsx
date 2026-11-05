import React from 'react';
import { useSelector } from 'react-redux';

export default function MagicIndicator() {
  const phase = useSelector(state => state.garden.magicConditions.currentMoonPhase);
  const paused = useSelector(state => state.garden.paused);
  return <div className="moon-note"><span className="moon-symbol" aria-hidden="true">{phase === 'full moon' ? '○' : '☾'}</span>
    <div><h2>{paused ? 'A moment of rest' : 'A gentle growing day'}</h2>
      <p>{phase === 'full moon' ? 'Full moon · a little magic for Moonflower' : 'New moon · quiet roots, fresh beginnings'}</p></div>
  </div>;
}
