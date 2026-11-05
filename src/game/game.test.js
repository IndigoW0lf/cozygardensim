import { test, expect } from 'vitest';
import reducer, { createInitialState } from '../store/reducers';
import { PLANT_SEED, harvestPlant, advanceGarden, togglePause } from '../store/actions/gardenActions';
import { growthDetails, getSeed, isReady, totalGrowthMs } from './catalog';

const plant = (state, speciesId = 'sunflower', bedId = 1, id = 'plant-1') => reducer(state, {
  type: PLANT_SEED, payload: { speciesId, bedId, id },
});

test('planting debits once and creates an independent specimen in its selected bed', () => {
  const before = createInitialState();
  const after = plant(before);
  expect(after.player.coins).toBe(90);
  expect(after.garden.plants).toEqual([{ id: 'plant-1', speciesId: 'sunflower', bedId: 1, grownMs: 0 }]);
  expect(before.player.coins).toBe(100);
  expect(before.garden.plants).toEqual([]);
});

test.each([
  ['unknown', 1, 'a'], ['__proto__', 1, 'a'], ['sunflower', 0, 'a'],
  ['sunflower', 7, 'a'], ['sunflower', 1.5, 'a'], ['sunflower', '1', 'a'],
  ['sunflower', 1, ''], ['sunflower', 1, null],
])('invalid planting inputs do not change plants or money (%s, %s, %s)', (species, bed, id) => {
  const before = createInitialState();
  const after = plant(before, species, bed, id);
  expect(after.player).toEqual(before.player);
  expect(after.garden.plants).toEqual([]);
});

test('occupied beds and duplicate specimen IDs cannot debit coins again', () => {
  const before = plant(createInitialState());
  for (const after of [plant(before, 'calendula', 1, 'other'), plant(before, 'calendula', 2, 'plant-1')]) {
    expect(after.player).toEqual(before.player);
    expect(after.garden.plants).toEqual(before.garden.plants);
  }
});

test('an unaffordable seed cannot be added even to an empty bed', () => {
  let state = createInitialState();
  for (let bed = 1; bed <= 5; bed += 1) state = plant(state, 'moonflower', bed, `p-${bed}`);
  expect(state.player.coins).toBe(0);
  const rejected = plant(state, 'moonflower', 6, 'p-6');
  expect(rejected.player.coins).toBe(0);
  expect(rejected.garden.plants).toHaveLength(5);
});

test('harvest rejects unknown and immature specimens without paying', () => {
  const state = plant(createInitialState());
  for (const id of ['missing', 'plant-1']) {
    const next = reducer(state, harvestPlant(id));
    expect(next.player).toEqual(state.player);
    expect(next.garden.plants).toEqual(state.garden.plants);
  }
});

test('a full sunflower cycle pays exactly once and frees its bed', () => {
  let state = plant(createInitialState());
  state = reducer(state, advanceGarden(totalGrowthMs(getSeed('sunflower'))));
  expect(isReady(state.garden.plants[0])).toBe(true);
  state = reducer(state, harvestPlant('plant-1'));
  expect(state.player).toEqual({ coins: 106, xp: 4, level: 1, totalHarvests: 1 });
  expect(state.garden.plants).toEqual([]);
  expect(reducer(state, harvestPlant('plant-1')).player).toEqual(state.player);
  expect(plant(state, 'calendula', 1, 'new').player.coins).toBe(92);
});

test('growth crosses stage boundaries and caps at maturity without mutating its input', () => {
  const initial = plant(createInitialState());
  const sprout = reducer(initial, advanceGarden(10_000));
  expect(growthDetails(sprout.garden.plants[0]).stage).toBe('sprouting');
  expect(initial.garden.plants[0].grownMs).toBe(0);
  const ready = reducer(sprout, advanceGarden(1_000_000));
  expect(ready.garden.plants[0].grownMs).toBe(60_000);
  expect(growthDetails(ready.garden.plants[0]).percent).toBe(100);
});

test('adding a new plant does not reset an existing specimen', () => {
  let state = reducer(plant(createInitialState()), advanceGarden(30_000));
  state = plant(state, 'calendula', 2, 'second');
  state = reducer(state, advanceGarden(10_000));
  expect(state.garden.plants.map(p => p.grownMs)).toEqual([40_000, 10_000]);
});

test('Moonflower phase integration is independent of update partitioning', () => {
  const initial = plant(createInitialState(), 'moonflower');
  const whole = reducer(initial, advanceGarden(110_000));
  let chunks = initial;
  for (let i = 0; i < 11; i += 1) chunks = reducer(chunks, advanceGarden(10_000));
  expect(chunks.garden.plants).toEqual(whole.garden.plants);
  expect(isReady(whole.garden.plants[0])).toBe(true);
  expect(whole.garden.magicConditions.fullMoon).toBe(true);
});

test('the full moon boosts Moonflower but not Sunflower', () => {
  let state = reducer(createInitialState(), advanceGarden(90_000));
  state = plant(state, 'moonflower', 1, 'moon');
  state = plant(state, 'sunflower', 2, 'sun');
  state = reducer(state, advanceGarden(20_000));
  expect(state.garden.plants.map(p => p.grownMs)).toEqual([30_000, 20_000]);
});

test.each([0, -1, NaN, Infinity, 1.5, 3_600_001, '1000'])('invalid elapsed time is ignored (%s)', ms => {
  const state = plant(createInitialState());
  expect(reducer(state, advanceGarden(ms))).toBe(state);
});

test('pausing stops both plant growth and the moon clock', () => {
  const paused = reducer(plant(createInitialState()), togglePause());
  expect(reducer(paused, advanceGarden(60_000))).toBe(paused);
  const resumed = reducer(paused, togglePause());
  expect(reducer(resumed, advanceGarden(10_000)).garden.plants[0].grownMs).toBe(10_000);
});

test('harvest XP advances the level at the defined boundary', () => {
  let state = createInitialState();
  for (let i = 0; i < 3; i += 1) {
    state = plant(state, 'moonflower', 1, `moon-${i}`);
    state = reducer(state, advanceGarden(120_000));
    state = reducer(state, harvestPlant(`moon-${i}`));
  }
  expect(state.player.xp).toBe(24);
  expect(state.player.level).toBe(2);
  expect(state.player.totalHarvests).toBe(3);
});
