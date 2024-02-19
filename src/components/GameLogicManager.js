import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGrowthStage } from '../store/actions/gardenActions';


const GameLogicManager = () => {
  const dispatch = useDispatch();
  const plants = useSelector((state) => state.garden.plants);

  useEffect(() => {
    const growthInterval = setInterval(() => {
      plants.forEach((plant) => {
        if (plant.timeUntilNextStage > 0) {
          dispatch(updateGrowthStage(plant.id, { decrement: true }));
        } else {
          // Logic to update to next growth stage and reset timer
          dispatch(updateGrowthStage(plant.id, { nextStage: true }));
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(growthInterval);
  }, [dispatch, plants]);

  return null; // This component does not render anything
};

export default GameLogicManager;