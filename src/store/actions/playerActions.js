// Action types
const ADD_XP = 'ADD_XP';
const ADD_COINS = 'ADD_COINS';
const SPEND_COINS = 'SPEND_COINS';

// Action creators
export const addXp = (xp) => ({
  type: ADD_XP,
  payload: xp,
});

export const addCoins = (coins) => ({
  type: ADD_COINS,
  payload: coins,
});

export const spendCoins = (coins) => ({
  type: SPEND_COINS,
  payload: coins,
});