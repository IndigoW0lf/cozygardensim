# First playable garden — November 5, 2026

## What this slice demonstrates

The earlier prototype could plant a free Sunflower and show timed stages. This revision adds three defined seed types, six beds, atomic paid planting and one-time harvest rewards, XP/levels, pause/resume and a pure elapsed-time simulation. It replaces the disconnected/unsafe action paths rather than preserving multiple ways to change the same wallet.

The root reducer coordinates plant and wallet changes together. Occupied beds, duplicate specimen IDs, invalid inputs, insufficient funds, immature harvests and repeated harvests cannot change balances or create extra plants. Stage timing and the 90-second moon cycle are deterministic; Moonflower's 1.5× full-moon growth is integrated across phase boundaries. The React timer feeds active visible time into that model and cleans up its interval/listener.

Sunflower takes 60 growth seconds, Calendula 90 and Moonflower 120 before a full-moon boost. These are short illustrative playtest times. All plants and records are fictional game state. No account, analytics, network service, database, model API or new dependency is added.

## Visual status

The build bundles twelve transparent generated illustrations for seed, sprout, three species’ leafy/bud/bloom stages and a wooden bed, plus one opaque cottage/greenhouse banner. The manifest maps actual local files. Stage text and progress remain independent of art. Harvest sway respects reduced motion. The [asset inventory](art/ASSET_BRIEF.md) links exact prompts and provenance; no exclusive human painting is claimed. [Desktop](screenshots/garden-desktop.png) and [mobile](screenshots/garden-mobile.png) captures show the real built app after normal planting controls and accelerated active time. The scenery is decorative; the greenhouse is not an implemented destination.

## Reviewer route

Use the README's five-minute walkthrough. Selection is separate from spending; the paid action is the bed's Plant button. Growing beds show status and progress; ready beds offer Harvest. The action button stays mounted across harvest, keeping keyboard focus on the newly empty bed. The footer states session/visibility limits.

## Verification

- Domain tests cover transactional failure cases, growth boundaries, partition-independent moon integration, pause, unique IDs, balance bounds, one-time harvests and levels.
- Component tests cover the visible loop, selection without spending, pause/resume and unaffordable planting.
- Built-app desktop/mobile Chromium checks cover keyboard operation, focus after harvest, error/network boundaries, independent plant ages, moon boundaries, empty-wallet handling and pause.
- Actual pass/failure evidence is the current PR/CI run. Local unit/build results alone do not establish browser results, manual usability or screen-reader acceptance.

The mechanics checkpoint [CI run 42058955681](https://github.com/IndigoW0lf/cozygardensim/actions/runs/42058955681) passed all checks. After illustration integration, local `npm run check` passed 30 tests, license verification and build; six built-app desktop/mobile checks passed using isolated Chromium 153 (no project dependency added). A capture pass decoded every sprite, confirmed no horizontal overflow/page or HTTP errors and checked reduced-motion disables sway. Use the final PR checks for the published head.

## Remaining work

This slice implements planned work. It is excluded from future estimates. Saves/recovery, meaningful tending, breeding, further art refinement and a manual accessibility/learner-player review remain separate. See ROADMAP.md; do not list the old unimplemented economy/clock as unfinished work now.
