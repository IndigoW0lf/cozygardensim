import {
  ADD_PLANT,
  UPDATE_MAGIC_CONDITIONS,
  UPDATE_PLANT_GROWTH,
  REMOVE_PLANT,
  HARVEST_PLANT,
} from '../../actions/gardenActions';

const initialState = {
  plants: [],
  magicConditions: {
    currentMoonPhase: 'new moon',
    gardenLocation: 'forest edge',
    recentSupernaturalEvents: false,
  },
};

const gardenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLANT:
      return {
        ...state,
        plants: [...state.plants, action.payload],
      };
    case HARVEST_PLANT:
      return {
        ...state,
        plants: state.plants.map((plant) =>
          plant.id === action.payload ? { ...plant, isHarvested: true } : plant
        ),
      };
    case UPDATE_MAGIC_CONDITIONS:
      return {
        ...state,
        magicConditions: { ...state.magicConditions, ...action.payload },
      };
    case UPDATE_PLANT_GROWTH:
      return {
        ...state,
        plants: state.plants.map((plant) =>
          plant.id === action.payload.plantId
            ? { ...plant, growthStage: action.payload.newGrowthStage }
            : plant
        ),
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