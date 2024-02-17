import { combineReducers } from 'redux';
import gardenReducer from './gardenReducer';

const rootReducer = combineReducers({
  garden: gardenReducer,
});

export default rootReducer;