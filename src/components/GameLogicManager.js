import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updatePlantGrowth } from '../actions/gardenActions';

const GameLogicManager = ({ plants }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      // Example logic to update each plant's growth
      plants.forEach((plant) => {
        // Simplified: just incrementing growth stage as an example
        const newGrowthStage = plant.growthStage + 1;
        dispatch(updatePlantGrowth(plant.id, newGrowthStage));
      });
    }, 60000); // Update every 60 seconds

    return () => clearInterval(timer);
  }, [plants, dispatch]);

  return null; // This component does not render anything
};

export default GameLogicManager;