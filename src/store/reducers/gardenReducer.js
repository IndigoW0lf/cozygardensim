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
      return {
        ...state,
        plants: state.plants.map((plant) => {
          if (plant.id === action.payload.plantId) {
            if (action.payload.nextStage) {
              const currentStageIndex = growthStages.indexOf(plant.growthStage);
              const nextStage =
                growthStages[currentStageIndex + 1] || plant.growthStage; // Prevent advancing beyond the last stage
              return {
                ...plant,
                growthStage: nextStage,
                timeUntilNextStage: getNextStageTime(nextStage),
              };
            } else if (
              action.payload.decrement &&
              plant.timeUntilNextStage > 0
            ) {
              return {
                ...plant,
                timeUntilNextStage: plant.timeUntilNextStage - 1,
              };
            }
          }
          return plant;
        }),
      };
    case UPDATE_MAGIC_CONDITIONS:
      return {
        ...state,
        magicConditions: { ...state.magicConditions, ...action.payload },
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