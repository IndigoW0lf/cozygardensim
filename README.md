# Cozy Garden Simulator

A small browser game about tending a magical garden: plant a seed, watch it change, and gradually discover plants that respond to the world around them.

**Status:** early prototype being revived. The original React/Redux project began in February 2024. The revival keeps that repository and its original commits. This is not yet a complete game.

## The direction

Build a calm, local-first gardening game for people who enjoy cozy simulations and small discoveries. The first goal is one satisfying loop: choose a seed, plant it, tend it, harvest it, and use the reward to grow the garden. Magic should create interesting choices without making missed days feel like failure.

No accounts, payments, advertising, analytics, or AI generation are planned for the first playable release. The game should work without sending player information to a server.

## What is here now

| Area | Current implementation | Still needed |
| --- | --- | --- |
| Garden | Add a sunflower with its own ID and initial growth timer; list planted specimens | Seed selection, spatial garden beds, tending interactions |
| Growth | Redux stage transitions driven by a one-minute interval | Reliable elapsed-time simulation, pause rules, balancing |
| Magic | A demonstration condition changes periodically; the displayed moon phase follows it | A coherent rule set and plants that actually respond to it |
| Plant catalog | Display the names in the legacy plant catalog | Curated game species, seed prices and unlock rules |
| Economy | Coin/XP reducers exist as groundwork | A connected purchase/harvest/reward loop |
| Breeding | Experimental action/reducer code exists | Valid parent selection, trait rules, middleware/state design and UI |
| Saving | Session memory only | Versioned local saves, recovery, export/reset |
| Tests | Rendering/planting and growth-transition regression tests | Clock, economy, persistence and browser interaction coverage |

The catalog is legacy prototype material, not a verified botanical or health reference. Real-world medicinal claims in its unused metadata should not become gameplay guidance. Future magical effects should be explicitly fictional.

## Run locally

The project currently retains its original **Create React App** toolchain, **React 18**, and **Redux 5**. Migration to a maintained build tool is the next tooling milestone; see [the roadmap](docs/ROADMAP.md).

Prerequisites:

- Node.js 22 is the target for the proposed CI workflow; this revival has not yet been verified in a local runtime.
- Yarn Classic 1.22.22. If needed: `npm install --global yarn@1.22.22`.

```sh
git clone https://github.com/IndigoW0lf/cozygardensim.git
cd cozygardensim
yarn install --frozen-lockfile
yarn start
```

Open the address printed by the development server, normally <http://localhost:3000>.

No environment variables, API keys, database, or external service accounts are required.

### Check and build

```sh
# One test run, without watch mode
CI=true yarn test --watchAll=false --runInBand

# Static production output in build/
yarn build
```

On Windows PowerShell, set `$env:CI='true'` before running the test command.

The proposed GitHub Actions workflow runs tests and a production build. A workflow file is not evidence of passing checks: inspect the PR's actual run. This preparation pass could not execute locally because its workspace became unavailable.

## Code map

```text
src/index.js                 React root and Redux provider
src/App.js                   Prototype screen composition
src/components/              Garden, plant display, catalog and timer driver
src/data/herbalPlants.js     Legacy plant catalog
src/functions/               Growth-stage timing and experimental magic helpers
src/store/actions/           Garden/player events and experimental breeding
src/store/reducers/          Garden and player state transitions
docs/ROADMAP.md              Milestones, acceptance criteria and rough effort
docs/AUDIT.md                Findings, changes and verification limits
docs/PROVENANCE.md           Project history and third-party boundaries
docs/BYOP_READINESS.md       Submission preparation facts and unresolved gates
```

## Play-test the baseline

1. Open a fresh session: the garden should show an empty state.
2. Choose **Plant a sunflower**: a seed-stage sunflower should appear.
3. Leave the page open. A new seed starts with five one-minute ticks before sprouting.
4. Confirm the plant catalog renders without a missing-state error.
5. Refresh: the garden currently resets. Persistence is future work.

The catalog intentionally does not offer purchases yet. The old shop expected prices, level requirements, and a Redux catalog slice that the original project did not provide.

## Longer-term plan

1. **Reliable foundation:** verify the revival, migrate tooling, introduce a controllable game clock, and agree on a small playable scope.
2. **One complete loop:** seed selection, planting, tending, harvesting, spending rewards and visible progression.
3. **A garden worth returning to:** local saves, recovery and a gentle return-after-absence policy.
4. **Magical discovery:** a few distinct species, readable environmental effects and deterministic breeding rules.
5. **Comfort and polish:** accessible controls, responsive layout, original visual assets, sound controls and performance checks.

[The detailed roadmap](docs/ROADMAP.md) separates concrete next work from exploratory ideas. Hours are planning ranges, not work already completed or a promise of program eligibility.

## Contributing and development history

Use focused changes with a clear purpose and a corresponding verification step. Preserve the existing Git ancestry. Do not re-upload this project into a new repository or rewrite old commits to make its development appear more recent.

Use fictional game state and assets you have permission to distribute. Never commit credentials, real player records, employer/client code or proprietary resources.

## License and credits

Original project code is provided under the [MIT License](LICENSE), credited to Kai Indigo Wolf. This revival normalizes the existing copyright line; it does not introduce a new license or claim ownership of dependencies.

The repository began with Create React App scaffolding and then added custom garden, growth, magic and progression code. Dependencies and inherited assets retain their own terms; see [provenance and third-party boundaries](docs/PROVENANCE.md). A root MIT license does not establish rights to every future illustration, font or sound.
