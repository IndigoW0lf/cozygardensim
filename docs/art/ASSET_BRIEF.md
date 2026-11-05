# First playable art direction and inventory

The owner requested proper illustrated plant art. The November 5 build now bundles all twelve transparent pieces below and the cottage backdrop. These are generated raster illustrations with a soft painted appearance; no SVG plants are shipped. [Exact prompts and reference relationships](generation-record.json) and [provenance](../PROVENANCE.md) record the process. This is a cohesive first art pass, open to playtest feedback.

## Direction

Implemented direction: soft gouache/watercolor game art, warm wood and soil, sage foliage, buttery yellow, terracotta and muted lavender. One viewpoint and light direction across the set. No lettering, numbers, borders or UI baked into the art. These are fictional game illustrations, not botanical teaching plates.

## Twelve transparent pieces

The delivered files are separate 1254 × 1254 transparent PNGs, retained at original resolution. Keep a shared ground point at approximately x50%, y84–87%, camera angle and scale. Leave generous transparent room around mature leaves and blossoms. Early stages should be physically small on the same canvas, not enlarged to fill it.

| Filename under public/assets/garden/ | Content |
| --- | --- |
| bed.png | One empty soil bed, pebbles and simple wooden edging; room for plants above |
| seed.png | Shared small striped seed stage, aligned to the ground point |
| sprout.png | Shared two-leaf sprout |
| sunflower-leafy.png | Leafy sunflower, no open flower |
| sunflower-budding.png | Closed flower buds |
| sunflower-bloom.png | Fully blooming sunflower |
| calendula-leafy.png | Leafy calendula |
| calendula-budding.png | Closed flower buds |
| calendula-bloom.png | Fully blooming calendula |
| moonflower-leafy.png | Leafy stylized moonflower |
| moonflower-budding.png | Closed flower buds |
| moonflower-bloom.png | Fully blooming moonflower, muted lavender/ivory palette |

The bed is a separate layer below the plant images; do not paint another complete bed into each plant frame. Bloom images also serve as packet previews. Mature and harvestable stages reuse bloom artwork initially.

## Cottage backdrop

`garden-backdrop.png`, 1536 × 1024 RGB: quiet cottage/greenhouse at golden hour, no baked-in UI or text. The interface crops it into a decorative banner; the real HTML title remains readable over a soft gradient. It is scenery, not a claim that the greenhouse is interactable.

## Animation

Harvest-ready plants use a small five-second CSS sway. Reduced motion disables it; text, progress and the Harvest button convey readiness independently. No animation files are needed for this pass. Later, a 4–6-frame bloom sequence per species could be considered after the static plant set is approved. Do not add animation solely as decoration if it makes controls harder to use.

## Integration

All files above are bundled under `public/assets/garden/` and mapped in `src/art/manifest.js`. `src/components/PlantArt.jsx` layers the bed and stage images at the same canvas size. Shared seed/sprout assets are reused; every other stage is species-specific.

Original output bytes are retained. The twelve sprites are roughly 8 MB combined; the banner is roughly 3.2 MB. No external image host is used. Future delivery-size optimization should retain these source files. Rebuild after changes; inspect stage alignment, check every image loads, and run the browser suite. The integration pass decoded all twelve sprites in Chromium and inspected actual desktop/mobile captures; automated checks do not replace human playtesting.
