import { nanoid } from 'nanoid';

export const PLANT_SEED = 'garden/plantSeed';
export const HARVEST_PLANT = 'garden/harvestPlant';
export const ADVANCE_GARDEN = 'garden/advance';
export const TOGGLE_PAUSE = 'garden/togglePause';

export const plantSeed = (speciesId, bedId) => ({
  type: PLANT_SEED, payload: { speciesId, bedId, id: nanoid() },
});
export const harvestPlant = id => ({ type: HARVEST_PLANT, payload: { id } });
export const advanceGarden = elapsedMs => ({ type: ADVANCE_GARDEN, payload: { elapsedMs } });
export const togglePause = () => ({ type: TOGGLE_PAUSE });
