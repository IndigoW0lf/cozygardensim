import React from 'react';
import { connect } from 'react-redux';
import { addPlant } from '../store/actions/gardenActions';
import Plant from './Plant';
import { nanoid } from 'nanoid'; // Import nanoid

const Garden = ({ plants, addPlant }) => {
  // Function to add a new plant with a unique ID generated by nanoid
  const handleAddPlant = () => {
    const newPlant = {
      id: nanoid(), // Generate a unique ID for each new plant
      name: 'Sunflower',
      growthStage: 'seed',
    };
    addPlant(newPlant);
  };

  return (
    <div>
      <button onClick={handleAddPlant}>Add Plant</button>
      {plants.map((plant) => (
        <Plant key={plant.id} plant={plant} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  plants: state.garden.plants,
});

const mapDispatchToProps = {
  addPlant,
};

export default connect(mapStateToProps, mapDispatchToProps)(Garden);