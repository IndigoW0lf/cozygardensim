import { BED_COUNT, getSeed, isReady, levelForXp } from '../../game/catalog';
import { advanceSimulation, moonAt } from '../../game/simulation';
import { PLANT_SEED, HARVEST_PLANT, ADVANCE_GARDEN, TOGGLE_PAUSE } from '../actions/gardenActions';

export function createInitialState() {
  return {
    garden: { plants: [], elapsedMs: 0, paused: false, magicConditions: moonAt(0),
      notice: 'Choose a seed packet, then an empty bed. Your first little garden is waiting.' },
    player: { coins: 100, xp: 0, level: 1, totalHarvests: 0 },
  };
}
function notice(state, message) {
  return state.garden.notice === message ? state : {
    ...state, garden: { ...state.garden, notice: message },
  };
}

// Cross-slice transactions belong here: planting cannot debit a wallet without
// occupying its bed, and harvesting cannot pay twice for the same specimen.
export default function rootReducer(state = createInitialState(), action = {}) {
  switch (action.type) {
    case PLANT_SEED: {
      const { speciesId, bedId, id } = action.payload ?? {};
      const seed = getSeed(speciesId);
      if (!seed || !Number.isInteger(bedId) || bedId < 1 || bedId > BED_COUNT ||
          typeof id !== 'string' || !/^[\w-]{1,80}$/.test(id)) {
        return notice(state, 'That seed or bed could not be planted. Please choose again.');
      }
      if (state.garden.plants.some(plant => plant.bedId === bedId || plant.id === id)) {
        return notice(state, 'That bed or plant is already in use. Choose an empty bed.');
      }
      if (state.player.coins < seed.cost) return notice(state, 'Not enough coins for that seed. Try another packet or harvest a ready plant.');
      return {
        ...state,
        garden: { ...state.garden,
          plants: [...state.garden.plants, { id, speciesId, bedId, grownMs: 0 }],
          notice: `Planted ${seed.name} in bed ${bedId} for ${seed.cost} coins.` },
        player: { ...state.player, coins: state.player.coins - seed.cost },
      };
    }
    case HARVEST_PLANT: {
      const plant = state.garden.plants.find(item => item.id === action.payload?.id);
      if (!plant || !isReady(plant)) return notice(state, 'Only a fully grown plant can be harvested.');
      const seed = getSeed(plant.speciesId);
      const xp = state.player.xp + seed.xp;
      return {
        ...state,
        garden: { ...state.garden, plants: state.garden.plants.filter(item => item.id !== plant.id),
          notice: `Harvested ${seed.name}: +${seed.reward} coins and +${seed.xp} XP. Bed ${plant.bedId} is ready for another seed.` },
        player: { ...state.player, coins: state.player.coins + seed.reward, xp,
          level: levelForXp(xp), totalHarvests: state.player.totalHarvests + 1 },
      };
    }
    case ADVANCE_GARDEN: {
      const ms = action.payload?.elapsedMs;
      if (state.garden.paused || !Number.isSafeInteger(ms) || ms <= 0 || ms > 3_600_000 ||
          !Number.isSafeInteger(state.garden.elapsedMs + ms)) return state;
      const garden = advanceSimulation(state.garden, ms);
      const newlyReady = garden.plants.filter((plant, index) => isReady(plant) && !isReady(state.garden.plants[index]));
      if (newlyReady.length) garden.notice = newlyReady.length === 1
        ? `Bed ${newlyReady[0].bedId} is ready: ${getSeed(newlyReady[0].speciesId).name} can be harvested.`
        : `${newlyReady.length} beds are ready to harvest.`;
      return { ...state, garden };
    }
    case TOGGLE_PAUSE:
      return { ...state, garden: { ...state.garden, paused: !state.garden.paused,
        notice: state.garden.paused ? 'The garden is growing again.' : 'The garden is resting. Take your time.' } };
    default:
      return state;
  }
}
