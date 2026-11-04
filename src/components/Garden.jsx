import React from 'react';
import { connect } from 'react-redux';
import { addPlant } from '../store/actions/gardenActions';
import { getNextStageTime } from '../functions/plantFunctions';
import Plant from './Plant';
import { nanoid } from 'nanoid';

const Garden = ({ plants, addPlant }) => {
  const handleAddPlant = () => {
    addPlant({
      id: nanoid(),
      name: 'Sunflower',
      type: 'Flower',
      growthStage: 'seed',
      timeUntilNextStage: getNextStageTime('seed'),
    });
  };

  return (
    <section aria-labelledby="garden-title">
      <h2 id="garden-title">Your garden</h2>
      <button onClick={handleAddPlant}>Plant a sunflower</button>
      {plants.length === 0 && <p>Your garden is waiting for its first seed.</p>}
      <div aria-live="polite">
        {plants.map((plant) => <Plant key={plant.id} plant={plant} />)}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({ plants: state.garden.plants });
export default connect(mapStateToProps, { addPlant })(Garden);
