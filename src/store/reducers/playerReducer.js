const initialState = {
  level: 1,
  xp: 0,
  coins: 100, // Starting currency, adjust as needed
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    // Define actions like adding XP, leveling up, and changing coins here
    default:
      return state;
  }
};

export default playerReducer;