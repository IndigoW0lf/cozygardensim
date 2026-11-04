import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { updateGrowthStage, updateMagicConditions } from '../store/actions/gardenActions';

const GameLogicManager = () => {
  const store = useStore();

  useEffect(() => {
    // Read current state at each tick. Subscribing this interval to plants or
    // moon changes would restart it and delay growth whenever they change.
    const growthInterval = setInterval(() => {
      const { plants, magicConditions } = store.getState().garden;
      plants.forEach((plant) => {
        const modifier = magicConditions.fullMoon && plant.type === 'Moonflower' ? 2 : 1;
        if (plant.timeUntilNextStage > 0) {
          store.dispatch(updateGrowthStage(plant.id, { decrement: true, modifier }));
        } else {
          store.dispatch(updateGrowthStage(plant.id, { nextStage: true }));
        }
      });
    }, 60000);
    return () => clearInterval(growthInterval);
  }, [store]);

  useEffect(() => {
    const magicInterval = setInterval(() => {
      const fullMoon = Math.random() > 0.5;
      store.dispatch(updateMagicConditions({
        fullMoon,
        currentMoonPhase: fullMoon ? 'full moon' : 'new moon',
      }));
    }, 100000);
    return () => clearInterval(magicInterval);
  }, [store]);

  return null;
};

export default GameLogicManager;
