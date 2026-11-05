import { MOON_PHASE_MS, getSeed, totalGrowthMs } from './catalog';

export function moonAt(elapsedMs) {
  const fullMoon = Math.floor(elapsedMs / MOON_PHASE_MS) % 2 === 1;
  return { fullMoon, currentMoonPhase: fullMoon ? 'full moon' : 'new moon' };
}

// Integrate through phase boundaries: one large update and many small ones
// must give the same growth. Browser visibility/pause is handled by the caller.
export function advanceSimulation(garden, elapsedMs) {
  let time = garden.elapsedMs;
  const end = time + elapsedMs;
  let plants = garden.plants;
  while (time < end) {
    const boundary = (Math.floor(time / MOON_PHASE_MS) + 1) * MOON_PHASE_MS;
    const segment = Math.min(end, boundary) - time;
    const { fullMoon } = moonAt(time);
    plants = plants.map(plant => {
      const seed = getSeed(plant.speciesId);
      const rate = fullMoon && seed.id === 'moonflower' ? 1.5 : 1;
      return { ...plant, grownMs: Math.min(totalGrowthMs(seed), plant.grownMs + segment * rate) };
    });
    time += segment;
  }
  return { ...garden, plants, elapsedMs: end, magicConditions: moonAt(end) };
}
