import { test, expect, vi } from 'vitest';
import gardenReducer from './gardenReducer';
import { addPlant, updateGrowthStage } from '../actions/gardenActions';
import { getNextStageTime } from '../../functions/plantFunctions';

vi.mock('nanoid', () => ({ nanoid: () => 'test-id' }));

test('a new plant spends its seed interval before advancing to sprouting', () => {
  const initial = gardenReducer(undefined, addPlant({
    id: 'seed-1', name: 'Sunflower', type: 'Flower',
    growthStage: 'seed', timeUntilNextStage: getNextStageTime('seed'),
  }));
  const ticked = gardenReducer(initial, updateGrowthStage('seed-1', {
    decrement: true, modifier: 1,
  }));
  expect(ticked.plants[0]).toMatchObject({ growthStage: 'seed', timeUntilNextStage: 4 });
  expect(initial.plants[0].timeUntilNextStage).toBe(5);
  let state = initial;
  for (let tick = 0; tick < 5; tick += 1) {
    state = gardenReducer(state, updateGrowthStage('seed-1', { decrement: true, modifier: 1 }));
  }
  expect(state.plants[0]).toMatchObject({ growthStage: 'sprouting', timeUntilNextStage: 10 });
});

test('a larger growth modifier advances the timer faster', () => {
  const initial = gardenReducer(undefined, addPlant({
    id: 'seed-1', name: 'Moonflower', growthStage: 'seed', timeUntilNextStage: 5,
  }));
  const next = gardenReducer(initial, updateGrowthStage('seed-1', {
    decrement: true, modifier: 2,
  }));
  expect(next.plants[0].timeUntilNextStage).toBe(3);
});
