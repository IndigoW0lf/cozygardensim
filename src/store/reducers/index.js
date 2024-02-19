import { combineReducers } from 'redux';
import gardenReducer from './gardenReducer';
import playerReducer from './playerReducer';

const rootReducer = combineReducers({
  garden: gardenReducer,
  player: playerReducer,
});

export default rootReducer;