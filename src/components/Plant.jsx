import React from 'react';
import { getSeed, growthDetails } from '../game/catalog';
import PlantArt from './PlantArt';

export default function Plant({ plant }) {
  const seed = getSeed(plant.speciesId);
  const growth = growthDetails(plant);
  return (
    <>
      <PlantArt speciesId={seed.id} stage={growth.stage} />
      <h4>{seed.name}</h4>
      <p className="plant-stage">{growth.stage === 'harvestable' ? 'Ready to harvest' : growth.stage}</p>
      <progress className="growth-progress" aria-label={`${seed.name} growth in bed ${plant.bedId}`} max="100" value={growth.percent} />
      <p className="plant-detail">{growth.percent}% grown · harvest for {seed.reward} coins</p>
    </>
  );
}
