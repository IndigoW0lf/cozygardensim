import React from 'react';
import { ARTWORK, plantArtwork, artworkUrl } from '../art/manifest';

// Shared square canvases align the root collar with the soil, at every age.
export default function PlantArt({ speciesId = 'sunflower', stage = 'empty' }) {
  const plant = plantArtwork(speciesId, stage);
  const hasArt = ARTWORK.bed || plant;
  return (
    <div className={`plant-art art-slot art-slot--${stage}`} aria-hidden="true">
      {ARTWORK.bed && <img className="bed-illustration" src={artworkUrl(ARTWORK.bed)} alt="" />}
      {plant && <img className="plant-illustration" src={artworkUrl(plant)} alt="" />}
      {!hasArt && <span className="art-placeholder">{stage === 'empty' ? 'Garden bed' : 'Plant illustration'}<small>artwork to come</small></span>}
    </div>
  );
}
