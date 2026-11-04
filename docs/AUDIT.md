# Preparation audit — 2026-11-04

## Evidence boundary

The original main head was `7a746cdbafec8c1a6faf9e435e5319c76a0d7da5`. The first preparation head was `0452c9dbbb24547283d66f42a9d0976255c175e2`. This pass uses a full clone and extends the same PR branch; it does not rewrite history.

Kai confirmed personal ownership on November 4, 2026. That is an owner attestation, not an independent legal determination. No employer/client/university implementation or records were identified in the inspected source. The repository cannot independently prove which resources were used historically.

## Checks completed locally

| Check | Evidence / result |
| --- | --- |
| Ref inventory | Fetched all advertised branches/tags plus exposed PR heads; main, revival branch and PR #1 were present; no advertised tags |
| Reachable history | 16 unique commits before this follow-up, including the 14 original commits and two preparation commits |
| Secret scan | Checksum-verified Gitleaks 8.30.1, default rules, `git --redact=100 --log-opts='--all --full-history'`; scanned about 1.20 MB, no findings |
| Historical paths | 56 unique paths; no environment files, database dumps, compiled Python configs or similar sensitive path names found |
| Historical binary assets | Only the inherited favicon and two React PNG logos; byte-for-byte matches to `cra-template@1.2.0` package assets |
| Asset source | Upstream template package declares MIT and includes its license; archived license retained in `legacy-cra-template-LICENSE.txt`; assets removed from current tree |
| Dependency advisories | `npm audit` returned zero known vulnerabilities at preparation time; advisory state can change |
| License inventory | All lockfile package records declare a license; runtime dependencies are MIT. Development/optional-platform dependencies use MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC or MPL-2.0 |
| Unit/integration checks | Two Vitest suites, four tests passed after migration; planting and simulated stage transitions covered |
| Production build | Vite build passed; application license and runtime dependency notices copied to dist |
| Reproducible installation | `npm ci --ignore-scripts` followed by license verification, tests and build |
| Browser tests | Desktop/mobile Chromium scenarios committed for the built application; actual CI results must be checked on the PR |

Local browser binaries could not be installed: downloads returned invalid/truncated archives in this workspace. This is not an app test failure and is not presented as a passing local browser test. CI performs the actual Chromium installation and tests. See [PR #1](https://github.com/IndigoW0lf/cozygardensim/pull/1) for the browser result on the current head.

## Findings repaired

- A single React root now wraps App in the Redux provider. The invalid second render call and unsupported standalone Plant/empty Sidebar mounts were removed.
- Garden seeds have unique specimen IDs and initialized stage timers.
- The catalog reads the actual data module and does not pretend purchases work without prices/state/rules.
- Moon flag/display and the demonstration growth modifier agree.
- CRA/Jest and the old Yarn lockfile were replaced in place with Vite/Vitest and package-lock.json. React stays on its compatible 18.x line; no unnecessary runtime major migration.
- Unused web-vitals/styled-components/testing dependencies and the empty Sidebar were removed.
- The catalog retains plant names only; unverified health/care metadata is absent from the current source.
- React branding/scaffold assets were replaced with a source-authored SVG favicon. No external image, font, sound or network asset is needed by the current app.
- Heading order and section labels are coherent; keyboard focus remains visible.
- Root MIT terms and 2024 attribution remain intact.

## Data flow

Player input → in-memory Redux garden/player state → local React UI. Random specimen identifiers and demonstration phases are generated in the browser. Refresh currently resets the session. The inspected app has no accounts, database, cloud storage, telemetry, uploads, external API calls or AI/model integration. Vite/Playwright/npm/Gitleaks are development tools, not application data destinations.

The browser checks reject page errors and unexpected network origins during the tested scenarios. They do not establish every possible environmental behavior, browser-extension behavior or future code path.

## Limits of the history and dependency review

Gitleaks is a pattern-based scan, not proof that no secret has ever existed. The scan covers reachable fetched history, not remote deleted/unreachable objects, hidden provider refs, inaccessible branches, ignored local files, logs, hosting configuration or deployed environments. Binary data is not comprehensively decoded; the three historical image assets were separately matched to their upstream package. No credentials were tested against a service and none are reproduced in this report.

License metadata plus runtime LICENSE files were reviewed and recorded, not every dependency's complete source. Platform-optional dependency records are included even when not installed locally. No currently locked license is unlisted against the supplied accepted-license list. This does not turn the dependency review into program approval.

The original repository used standard CRA scaffolding, disclosed in provenance. Custom implementation exists beyond it; the program's reviewers decide whether that history meets their originality requirement.

## Still-real development work

Elapsed-time simulation, the purchase/harvest/reward loop, save/recovery, breeding invariants, original visual scenes and broader accessibility testing remain. None is represented as complete. Preparation already performed is excluded from the future hour estimate. See ROADMAP.md.
