# Working on Cozy Garden Simulator

## Start a development session

Use Node 22.12+ and npm; the repository records Node 22 in `.nvmrc`.

```sh
git switch main
git pull --ff-only
git switch -c feature/describe-the-change
npm ci --ignore-scripts
npm run dev
```

No credentials or external service accounts are needed. Start with the README, then choose a small piece of `docs/ROADMAP.md`. Define observable acceptance criteria before writing the change.

## Verify the change

```sh
npm run check
```

This verifies committed license metadata, runs the Vitest suites and builds static output in `dist/`. It does not make network advisory queries or install browsers.

For UI, entry-point, timer or build changes, also run:

```sh
npx playwright install --with-deps chromium
npm run test:e2e
```

The browser suite serves the production build, so rebuild after changing source. It tests desktop/mobile Chromium, not every browser or accessibility technology. Use real-browser/manual checks when the feature needs them.

Run `npm audit` for dependency changes. If dependencies change, run `npm run audit:licenses`, review every changed license and notice, and commit `package-lock.json` plus the generated inventory/notices. Do not conceal findings with forced upgrades or broad scanner exclusions.

## Make commits useful

Check your local Git identity before committing; use an email actually linked to your GitHub account. Do not guess a no-reply address. Keep each commit about a real, reviewable change and describe the behavior and validation honestly.

Preserve the original history. Use a normal merge commit for reviewed branches; do not squash/rebase original or submitted development history. Keep generated `dist/`, dependency installations, traces and raw scan output out of Git.

## Boundaries and remaining work

Use fictional plants and fixture data. The current game requires no real player information, accounts, external APIs or AI services. Do not add these merely to increase scope. Keep imported art, fonts, sounds and datasets documented in the provenance ledger before distributing them.

The first playable loop and pure simulation now exist. Further work includes versioned local saves/recovery, a meaningful tending system and validated breeding. Startup repairs, tooling migration, audits and the current tests are completed preparation, not tasks to count again.
