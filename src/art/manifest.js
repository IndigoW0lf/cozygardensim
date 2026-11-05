// Replace null with an actual bundled path after the corresponding art exists,
// e.g. 'assets/garden/sunflower-bloom.png'. No missing-file requests are made.
export const ARTWORK = {
  bed: null,
  backdrop: null,
  seed: null,
  sprout: null,
  sunflower: { leafy: null, budding: null, bloom: null },
  calendula: { leafy: null, budding: null, bloom: null },
  moonflower: { leafy: null, budding: null, bloom: null },
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
