import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { spendCoins } from '../store/actions/playerActions';
import { addPlant } from '../store/actions/gardenActions';

const Store = () => {
  const dispatch = useDispatch();
  const { coins, level } = useSelector((state) => state.player);
  const herbalPlants = useSelector((state) =>
    state.herbalPlants.filter((plant) => plant.requiredLevel <= level)
  );

  const handlePurchase = (plant) => {
    if (coins >= plant.cost) {
      dispatch(spendCoins(plant.cost));
      dispatch(addPlant(plant));
      // Implement additional logic as needed (e.g., adding the plant to the player's inventory or garden)
    } else {
      alert('Not enough coins.');
    }
  };

  return (
    <div>
      {herbalPlants.map((plant) => (
        <div key={plant.name}>
          <h3>{plant.name}</h3>
          <p>Cost: {plant.cost} coins</p>
          <button onClick={() => handlePurchase(plant)}>Purchase</button>
        </div>
      ))}
    </div>
  );
};

export default Store;