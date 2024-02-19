import {
  ADD_PLANT,
  BREED_PLANTS,
  UPDATE_MAGIC_CONDITIONS,
  REMOVE_PLANT,
  HARVEST_PLANT,
  UPDATE_GROWTH_STAGE,
} from '../actions/gardenActions';
import { nanoid } from 'nanoid'; // Import nanoid
import {
  determineOffspringName,
  getNextStageTime,
} from '../../functions/plantFunctions';

const initialState = {
  plants: [],
  magicConditions: {
    currentMoonPhase: 'new moon',
    gardenLocation: 'forest edge',
    recentSupernaturalEvents: false,
  },
};

const growthStages = [
  'seed',
  'sprouting',
  'growing',
  'flowering',
  'mature',
  'harvestable',
];

const gardenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLANT:
      return {
        ...state,
        plants: [...state.plants, action.payload],
      };
    case BREED_PLANTS:
      const parent1 = state.plants.find(
        (plant) => plant.id === action.payload.parentPlantId1
      );
      const parent2 = state.plants.find(
        (plant) => plant.id === action.payload.parentPlantId2
      );
      const offspring = {
        id: nanoid(),
        name: determineOffspringName(parent1, parent2),
        growthStage: 'seed',
        // Other properties based on parents and potentially mutations
      };
      return {
        ...state,
        plants: [...state.plants, offspring],
      };
    case HARVEST_PLANT:
      return {
        ...state,
        plants: state.plants.map((plant) =>
          plant.id === action.payload ? { ...plant, isHarvested: true } : plant
        ),
      };
    case UPDATE_GROWTH_STAGE:
      // In gardenReducer.js, within the case UPDATE_GROWTH_STAGE:
      return {
        ...state,
        plants: state.plants.map((plant) => {
          if (plant.id === action.payload.plantId) {
            let { timeUntilNextStage, growthStage } = plant;
            if (action.payload.decrement) {
              timeUntilNextStage = Math.max(
                0,
                timeUntilNextStage - action.payload.modifier
              );
              // Check if it's time to advance to the next stage
              if (timeUntilNextStage === 0) {
                const currentStageIndex = growthStages.indexOf(growthStage);
                const nextStage =
                  growthStages[currentStageIndex + 1] || growthStage; // Prevent advancing beyond the last stage
                return {
                  ...plant,
                  growthStage: nextStage,
                  timeUntilNextStage: getNextStageTime(nextStage),
                };
              }
            } else if (action.payload.nextStage) {
              // Logic for advancing to the next stage immediately
              const currentStageIndex = growthStages.indexOf(growthStage);
              const nextStage =
                growthStages[currentStageIndex + 1] || growthStage;
              growthStage = nextStage;
              timeUntilNextStage = getNextStageTime(nextStage);
            }
            return { ...plant, timeUntilNextStage, growthStage };
          }
          return plant;
        }),
      };
    case UPDATE_MAGIC_CONDITIONS:
      return {
        ...state,
        magicConditions: {
          ...state.magicConditions,
          ...action.payload, // Merge new conditions into existing ones
        },
      };
    case REMOVE_PLANT:
      return {
        ...state,
        plants: state.plants.filter((plant) => plant.id !== action.payload),
      };
    default:
      return state;
  }
};

export default gardenReducer;