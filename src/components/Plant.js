import React from 'react';

const Plant = ({ plant }) => {
  return (
    <div>
      <h3>{plant.name}</h3>
      <p>Stage: {plant.growthStage}</p>
    </div>
  );
};

export default Plant;