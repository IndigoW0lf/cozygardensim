// Action Types
export const ADD_PLANT = 'ADD_PLANT';
export const HARVEST_PLANT = 'HARVEST_PLANT';
export const UPDATE_MAGIC_CONDITIONS = 'UPDATE_MAGIC_CONDITIONS';
export const UPDATE_PLANT_GROWTH = 'UPDATE_PLANT_GROWTH';
export const REMOVE_PLANT = 'REMOVE_PLANT';

// Action Creators
export const addPlant = (plant) => ({
  type: ADD_PLANT,
  payload: plant,
});

export const harvestPlant = (plantId) => ({
  type: HARVEST_PLANT,
  payload: plantId,
});

export const updateMagicConditions = (conditions) => ({
  type: UPDATE_MAGIC_CONDITIONS,
  payload: conditions,
});

export const updatePlantGrowth = (plantId, newGrowthStage) => ({
  type: UPDATE_PLANT_GROWTH,
  payload: { plantId, newGrowthStage },
});

export const removePlant = (plantId) => ({
  type: REMOVE_PLANT,
  payload: plantId,
});
