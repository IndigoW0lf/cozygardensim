// Illustrative game balance, not real growing times or botanical guidance.
export const BED_COUNT = 6;
export const MOON_PHASE_MS = 90_000;
export const STAGES = ['seed', 'sprouting', 'growing', 'flowering', 'mature'];
export const SEEDS = [
  { id: 'sunflower', name: 'Sunflower', cost: 10, reward: 16, xp: 4,
    durations: [10_000, 10_000, 15_000, 15_000, 10_000],
    color: '#d5a346', note: 'A sunny first friend. Ready in about one minute.' },
  { id: 'calendula', name: 'Calendula', cost: 14, reward: 24, xp: 6,
    durations: [15_000, 15_000, 20_000, 20_000, 20_000],
    color: '#c67850', note: 'A warm little bloom. Ready in about a minute and a half.' },
  { id: 'moonflower', name: 'Moonflower', cost: 20, reward: 36, xp: 8,
    durations: [20_000, 20_000, 30_000, 30_000, 20_000],
    color: '#a89aba', note: 'About two minutes, with a little extra growth under a full moon.' },
];

export function getSeed(id) { return SEEDS.find(seed => seed.id === id); }
export function totalGrowthMs(seed) { return seed.durations.reduce((sum, ms) => sum + ms, 0); }
export function levelForXp(xp) { return Math.floor(xp / 20) + 1; }
export function isReady(plant) {
  const seed = getSeed(plant.speciesId);
  return !!seed && plant.grownMs >= totalGrowthMs(seed);
}
export function growthDetails(plant) {
  const seed = getSeed(plant.speciesId);
  const total = totalGrowthMs(seed);
  let remaining = plant.grownMs;
  let stage = 'harvestable';
  for (let i = 0; i < seed.durations.length; i += 1) {
    if (remaining < seed.durations[i]) { stage = STAGES[i]; break; }
    remaining -= seed.durations[i];
  }
  return { stage, percent: Math.min(100, Math.floor(100 * plant.grownMs / total)),
    secondsLeft: Math.max(0, Math.ceil((total - plant.grownMs) / 1000)) };
}
