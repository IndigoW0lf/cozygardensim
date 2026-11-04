# Prototype revival audit — 2026-11-04

## Scope and limits

Read-only inspection began at main commit `7a746cdbafec8c1a6faf9e435e5319c76a0d7da5`. Reviewed repository metadata, the complete recursive current tree, README/LICENSE/package manifest, the current application JavaScript, the 14 returned default-branch commit summaries, branch inventory, issue inventory, and the latest implementation commit diff. Only main was listed; no issues were returned at inspection time.

This is a **limited source and history review**, not a full secret, dependency, asset-rights or security audit. Historical blobs, all refs/tags, binary assets and the dependency graph have not been comprehensively scanned. Pattern checks on the selected current source files found no obvious provider-token/private-key pattern; that does not establish a secret-free repository.

The execution workspace became unavailable during preparation. No local install, test, production build, browser session or vulnerability scan completed. Added regression tests and CI must be run before treating the baseline as verified.

## Findings and preparation changes

| Finding at the inspected commit | Impact | Preparation response |
| --- | --- | --- |
| Entry point used createRoot without Redux Provider and then called removed ReactDOM.render through react-dom/client | Broken boot/provider access | Use one root with Provider inside StrictMode |
| App imported/rendered an empty Sidebar module and rendered Plant with no plant prop | Invalid component / property access | Remove those invalid mounts |
| Store read state.herbalPlants, but root state had only garden and player | Missing-state crash | Render a read-only catalog from the existing data module |
| Shop expected cost and requiredLevel fields absent from the catalog | No valid purchase contract | Mark purchasing as planned; do not invent an economy during preparation |
| New garden plants had no growth timer | Seed interval could be skipped | Initialize seed duration explicitly and add a regression test |
| Full-moon modifier subtracted 0.5 while claiming twice-fast growth | Slower rather than faster timer | Subtract 2; add growth-modifier regression coverage |
| Demonstration updated fullMoon without updating the displayed phase | State/display disagreement | Update the phase alongside the demonstration flag |
| Header occupied a full viewport and retained scaffold presentation | Prototype controls pushed down the page | Compact semantic header and basic keyboard focus styling |
| README described unfinished mechanics as features | Misleading project assessment | Separate implemented groundwork, missing behavior and the longer-term plan |
| Existing MIT copyright line contained brackets | Unfinished license formatting | Normalize the line while retaining the 2024 attribution and MIT terms |
| Plain .env files were not excluded | Avoidable future credential risk | Ignore local environment files; this does not remove any historical file |

## Remaining engineering findings

- Create React App is deprecated. Migration is planned, not completed. See React's [deprecation notice](https://react.dev/blog/2025/02/14/sunsetting-create-react-app).
- Breeding is split between a thunk action and reducer handling; the current store does not install thunk middleware. No breeding interface is exposed in the revived screen.
- Growth relies on setInterval and restarts effects as state changes. Background tabs and time away need explicit simulation rules.
- The demonstration checks for Moonflower, while the current add-plant action creates Sunflower; the catalog does not yet supply a coherent magical species model.
- Harvest only marks a plant; it is not connected to reward accounting or one-time harvesting rules.
- The Redux reducers exist without persistence, save migrations or recovery.
- The legacy catalog contains unverified medicinal claims and no game prices/unlock thresholds. Those descriptions are not displayed by the revived catalog and should be replaced with fictional game content before expanding it.
- No application accounts, databases, analytics, uploads, external API clients or model calls were found in the inspected current application code. Browser hosting still involves ordinary web requests; dependency supply-chain behavior was not audited.
- No production deployment configuration was found in the inspected tree. Build output is static; no live-playability claim has been verified.
- The old React logo/favicon assets and all dependencies need their own provenance/license accounting. Do not treat the MIT header as relicensing them.

## Verification to complete

1. Inspect the PR CI result and repair failures without relaxing checks.
2. Complete the README's manual play-test steps.
3. Review installed dependency advisories and toolchain migration.
4. Run a redacting secret scanner across all intended submission refs/history, including binary/compiled files; review findings without exposing values.
5. Confirm ownership/resources and the actual next development block with Kai.

No employer/client code or private user records should be introduced for tests. Use generated game state.
