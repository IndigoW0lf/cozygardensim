import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { plantSeed, harvestPlant } from '../store/actions/gardenActions';
import { BED_COUNT, getSeed, isReady } from '../game/catalog';
import Plant from './Plant';
import PlantArt from './PlantArt';

function Bed({ number, plant, selectedSeed, coins, dispatch }) {
  const seed = getSeed(selectedSeed);
  const ready = plant && isReady(plant);
  const disabled = plant ? !ready : coins < seed.cost;
  const label = plant ? ready ? `Harvest ${getSeed(plant.speciesId).name} from bed ${number}` : `Bed ${number} is growing`
    : `Plant ${seed.name} in bed ${number}`;
  return (
    <article className={`garden-bed ${ready ? 'garden-bed--ready' : ''}`} aria-labelledby={`bed-${number}`}>
      <h3 id={`bed-${number}`}>BED {String(number).padStart(2, '0')}</h3>
      {plant ? <Plant plant={plant} /> : <>
        <PlantArt />
        <h4>A little room to grow</h4>
        <p className="plant-stage">Empty bed</p>
        <div className="empty-progress" aria-hidden="true" />
        <p className="plant-detail">{seed.name} · {seed.cost} coins</p>
      </>}
      <button className="button bed-action" aria-label={label} disabled={disabled}
        onClick={() => dispatch(plant ? harvestPlant(plant.id) : plantSeed(seed.id, number))}>
        {plant ? ready ? `Harvest · +${getSeed(plant.speciesId).reward} coins` : 'Growing, gently…'
          : coins < seed.cost ? 'More coins needed' : `Plant ${seed.name}`}
      </button>
    </article>
  );
}

export default function Garden({ selectedSeed }) {
  const plants = useSelector(state => state.garden.plants);
  const coins = useSelector(state => state.player.coins);
  const dispatch = useDispatch();
  return (
    <section className="garden-section" aria-labelledby="garden-title">
      <div className="garden-section-heading"><div><p className="eyebrow">02 / GIVE IT A PLACE TO GROW</p>
        <h2 id="garden-title">Your little garden</h2></div><p>{plants.length} of {BED_COUNT} beds planted</p></div>
      <div className="garden-beds">
        {Array.from({ length: BED_COUNT }, (_, index) => <Bed key={index} number={index + 1}
          plant={plants.find(plant => plant.bedId === index + 1)} selectedSeed={selectedSeed} coins={coins} dispatch={dispatch} />)}
      </div>
    </section>
  );
}
