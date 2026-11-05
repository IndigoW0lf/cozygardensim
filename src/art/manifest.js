// Locally bundled generated illustrations; process and prompts live in docs/art/.
export const ARTWORK = {
  bed: 'assets/garden/bed.png',
  backdrop: 'assets/garden/garden-backdrop.png',
  seed: 'assets/garden/seed.png',
  sprout: 'assets/garden/sprout.png',
  sunflower: { leafy: 'assets/garden/sunflower-leafy.png', budding: 'assets/garden/sunflower-budding.png', bloom: 'assets/garden/sunflower-bloom.png' },
  calendula: { leafy: 'assets/garden/calendula-leafy.png', budding: 'assets/garden/calendula-budding.png', bloom: 'assets/garden/calendula-bloom.png' },
  moonflower: { leafy: 'assets/garden/moonflower-leafy.png', budding: 'assets/garden/moonflower-budding.png', bloom: 'assets/garden/moonflower-bloom.png' },
};

export function plantArtwork(speciesId, stage) {
  if (stage === 'seed') return ARTWORK.seed;
  if (stage === 'sprouting') return ARTWORK.sprout;
  if (stage === 'growing') return ARTWORK[speciesId]?.leafy;
  if (stage === 'flowering') return ARTWORK[speciesId]?.budding;
  if (stage === 'mature' || stage === 'harvestable') return ARTWORK[speciesId]?.bloom;
  return null;
}
export const artworkUrl = path => `${import.meta.env.BASE_URL}${path}`;
