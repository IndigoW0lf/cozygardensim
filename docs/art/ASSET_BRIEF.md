# First playable art brief

The November 5 mechanics build has neutral art slots. The owner requested proper illustrated plant art instead of the temporary SVG experiments; no SVG plants are shipped in this build. Artwork is not claimed to be finished.

## Direction

Suggested direction for owner approval: soft gouache/watercolor game art, warm wood and soil, sage foliage, buttery yellow, terracotta and muted lavender. One viewpoint and light direction across the set. No lettering, numbers, borders or UI baked into the art. These are fictional game illustrations, not botanical teaching plates.

## Twelve transparent pieces

Use separate 1024 × 1024 transparent PNGs. Keep a shared ground point at approximately (512, 860), camera angle and scale. Leave generous transparent room around mature leaves and blossoms. Early stages should be physically small on the same canvas, not enlarged to fill it.

| Filename under public/assets/garden/ | Content |
| --- | --- |
| bed.png | One empty soil bed, pebbles and simple wooden edging; room for plants above |
| seed.png | Shared small planted-seed/mound stage, aligned to the ground point |
| sprout.png | Shared two-leaf sprout |
| sunflower-leafy.png | Leafy sunflower, no open flower |
| sunflower-budding.png | Bud/first opening flower |
| sunflower-bloom.png | Fully blooming sunflower |
| calendula-leafy.png | Leafy calendula |
| calendula-budding.png | Bud/first opening flower |
| calendula-bloom.png | Fully blooming calendula |
| moonflower-leafy.png | Leafy stylized moonflower |
| moonflower-budding.png | Bud/first opening flower |
| moonflower-bloom.png | Fully blooming moonflower, muted lavender/ivory palette |

The bed is a separate layer below the plant images; do not paint another complete bed into each plant frame. Bloom images also serve as packet previews. Mature and harvestable stages reuse bloom artwork initially.

## One optional backdrop

`garden-backdrop.jpg`, approximately 2400 × 1600 or larger: quiet greenhouse/cottage-garden setting, uncluttered center, no UI or text. The current interface does not require a backdrop and does not load one before it is supplied.

## Animation

No separate files are needed for the first gentle movement/transition pass. Future CSS motion must respect reduced motion and never convey information that the text/status omits. Later, a 4–6-frame bloom sequence per species could be considered after the static plant set is approved. Do not add animation solely as decoration if it makes controls harder to use.

## Integration

Put approved files in the directory above, then replace the matching null entries in `src/art/manifest.js` with relative paths such as `assets/garden/sunflower-bloom.png`. Null entries make no missing-file network requests. `src/components/PlantArt.jsx` layers the bed and stage images at the same canvas size. Shared seed/sprout assets are reused; every other stage is species-specific.

Record creator/source, license/permission and generated-art process in PROVENANCE.md before publishing. Keep exact supplied art files; don't substitute altered or mismatched reference pictures. Rebuild, inspect desktop/mobile screenshots at all stages, check that every image loads, and run the browser suite after integration.
