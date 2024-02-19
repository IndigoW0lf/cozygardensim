export function determineOffspringName(parent1, parent2) {
  // Simple example: concatenate the first half of parent1's name with the second half of parent2's name
  const half1 = parent1.name.substring(0, Math.floor(parent1.name.length / 2));
  const half2 = parent2.name.substring(Math.floor(parent2.name.length / 2));
  return half1 + half2;
}

export function getNextStageTime(nextStage) {
  const stageDurations = {
    seed: 5,
    sprouting: 10,
    growing: 15,
    flowering: 20,
    mature: 25,
    harvestable: Infinity,
  };
  return stageDurations[nextStage] || 0;
}