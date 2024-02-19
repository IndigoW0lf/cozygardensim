import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGrowthStage } from '../store/actions/gardenActions';


const GameLogicManager = () => {
  const dispatch = useDispatch();
  const plants = useSelector((state) => state.garden.plants);
  const magicConditions = useSelector((state) => state.garden.magicConditions);

  useEffect(() => {
    const growthInterval = setInterval(() => {
      plants.forEach((plant) => {
        let growthModifier = 1; // Default growth speed
        if (magicConditions.fullMoon && plant.type === 'Moonflower') {
          growthModifier = 0.5; // Grows twice as fast
        }
        if (plant.timeUntilNextStage > 0) {
          dispatch(
            updateGrowthStage(plant.id, {
              decrement: true,
              modifier: growthModifier,
            })
          );
        } else {
          // Logic to update to next growth stage and reset timer
          dispatch(updateGrowthStage(plant.id, { nextStage: true }));
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(growthInterval);
  }, [dispatch, plants, magicConditions]); // Ensure magicConditions is part of useEffect dependency array

  return null; // This component does not render anything
};

export default GameLogicManager;