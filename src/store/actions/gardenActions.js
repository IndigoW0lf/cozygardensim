import { nanoid } from 'nanoid';
import { determineOffspringName } from '../../functions/plantFunctions';

// Action Types
export const ADD_PLANT = 'ADD_PLANT';
export const BREED_PLANTS = 'BREED_PLANTS';
export const HARVEST_PLANT = 'HARVEST_PLANT';
export const UPDATE_GROWTH_STAGE = 'UPDATE_GROWTH_STAGE';
export const UPDATE_MAGIC_CONDITIONS = 'UPDATE_MAGIC_CONDITIONS';
export const UPDATE_PLANT_GROWTH = 'UPDATE_PLANT_GROWTH';
export const REMOVE_PLANT = 'REMOVE_PLANT';

// Action Creators
export const addPlant = (plant) => ({
  type: ADD_PLANT,
  payload: plant,
});

export const breedPlants =
  (parentPlantId1, parentPlantId2) => (dispatch, getState) => {
    const { plants } = getState().garden;
    const parent1 = plants.find((plant) => plant.id === parentPlantId1);
    const parent2 = plants.find((plant) => plant.id === parentPlantId2);

    // Basic trait inheritance (e.g., average growth rate of parents)
    const offspringGrowthRate = (parent1.growthRate + parent2.growthRate) / 2;

    // Simple mutation chance
    const mutationChance = 0.05; // 5% chance
    const doesMutate = Math.random() < mutationChance;
    const mutatedGrowthRate = doesMutate
      ? offspringGrowthRate * 1.2
      : offspringGrowthRate;

    const offspring = {
      id: nanoid(),
      name: determineOffspringName(parent1, parent2),
      growthStage: 'seed',
      growthRate: mutatedGrowthRate,
      // Add other traits here
    };

    dispatch({
      type: ADD_PLANT,
      payload: offspring,
    });
  };

export const harvestPlant = (plantId) => ({
  type: HARVEST_PLANT,
  payload: plantId,
});

export const updateGrowthStage = (plantId, update) => ({
  type: UPDATE_GROWTH_STAGE,
  payload: { plantId, ...update },
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
