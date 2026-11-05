import React from 'react';
import { SEEDS } from '../game/catalog';
import PlantArt from './PlantArt';

export default function Store({ selectedSeed, onSelect }) {
  return (
    <section className="seed-shop" aria-labelledby="seeds-title">
      <p className="eyebrow">01 / CHOOSE A LITTLE BEGINNING</p>
      <h2 id="seeds-title">The seed shelf</h2>
      <p className="section-intro">Choose a packet, then an empty bed. Coins are spent only when you plant.</p>
      <div className="seed-packets">
        {SEEDS.map(seed => (
          <button key={seed.id} className={`seed-packet ${selectedSeed === seed.id ? 'seed-packet--selected' : ''}`}
            aria-label={`Select ${seed.name} seeds`} aria-pressed={selectedSeed === seed.id} onClick={() => onSelect(seed.id)}>
            <PlantArt speciesId={seed.id} stage="mature" />
            <span className="seed-packet-copy"><strong>{seed.name}</strong><span>{seed.cost} coins to plant · {seed.reward} at harvest</span><small>{seed.note}</small></span>
            <span className="selection-mark" aria-hidden="true">{selectedSeed === seed.id ? '✓' : '+'}</span>
          </button>
        ))}
      </div>
      <p className="shelf-note">Moonflower grows 50% faster under this garden’s full moon. All three packets are available from the start.</p>
    </section>
  );
}
