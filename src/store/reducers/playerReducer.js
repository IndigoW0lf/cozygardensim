// src/store/reducers/playerReducer.js

const initialState = {
  level: 1,
  xp: 0,
  coins: 100, // Adjust starting coins as necessary
};

// Helper function to calculate level based on XP
const calculateLevel = (xp) => {
  // Adjust with testing based on game's leveling curve
  return Math.floor(Math.sqrt(xp) / 10) + 1;
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_XP': {
      const newXP = state.xp + action.payload;
      const newLevel = calculateLevel(newXP);
      return {
        ...state,
        xp: newXP,
        level: newLevel,
      };
    }
    case 'ADD_COINS':
      return {
        ...state,
        coins: state.coins + action.payload,
      };
    case 'SPEND_COINS':
      // Prevent spending more coins than the player has
      if (state.coins >= action.payload) {
        return {
          ...state,
          coins: state.coins - action.payload,
        };
      } else {
        console.warn('You don\'t have that much money!');
        return state; // Return current state if not enough coins
      }
    default:
      return state;
  }
};

export default playerReducer;