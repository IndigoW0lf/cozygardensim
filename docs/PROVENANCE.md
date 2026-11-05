# Provenance and license boundaries

## Ownership and history

On November 4, 2026, Kai confirmed that Cozy Garden Simulator is personally owned. GitHub reports the existing public repository as a non-fork and non-template. Personal ownership is recorded as an owner attestation; the account name itself is not proof of ownership. No ownership transfer, company attribution change or history rewrite is part of preparation.

The original history contains 14 commits from February 17–19, 2024 (UTC), starting with Create React App initialization and then adding garden state, growth/magic logic, breeding experiments and player progression. GitHub linked those commits to IndigoW0lf. The revival adds new, naturally scoped commits with current dates. Assistant collaboration is not represented as human-only historical work.

Anchors:

- [Scaffold initialization](https://github.com/IndigoW0lf/cozygardensim/commit/ebaa35f50ee69ba8a065c58d7abb20cc841320f3)
- [Growth/magic work](https://github.com/IndigoW0lf/cozygardensim/commit/27af88f885e1d29f197234bcf94a32055300b4f3)
- [Original progression work](https://github.com/IndigoW0lf/cozygardensim/commit/7a746cdbafec8c1a6faf9e435e5319c76a0d7da5)

Standard framework scaffolding is disclosed. The program's reviewers decide whether this custom implementation and preserved history satisfy their originality requirement.

## Current material

| Material | Source and license boundary |
| --- | --- |
| Original application code | Existing root MIT grant, credited to Kai Indigo Wolf; original 2024 attribution retained |
| Current SVG favicon | Source-authored during the preparation pass; included under the project MIT license |
| Plant catalog | Three common flower names and original illustrative game rules; earlier unverified descriptive/medical text removed. The unused 31-name legacy file remains as source material, not the active shop. |
| Runtime packages | React, React DOM, React Redux, Redux, Nano ID and transitives; actual versions, MIT metadata and LICENSE texts recorded in THIRD_PARTY_NOTICES.txt |
| Development tools | Versions/licenses recorded in DEPENDENCY_LICENSES.json; retain their own terms; not relicensed by the root grant |
| Garden illustrations | 12 transparent PNGs and one opaque cottage backdrop generated with ChatGPT image generation on 2026-11-05, at the owner’s request. Root MIT terms apply to project material to the extent rights are held; no separate art reservation or claim of exclusive copyright/human painting. Prompts and reference relationships: [generation record](art/generation-record.json). |
| Fonts and audio | System fonts only; no font or audio files bundled |
| Test state | Fictional plants and deterministic fixtures; no real player records |

The build copies LICENSE and THIRD_PARTY_NOTICES.txt into dist. `npm run audit:licenses` regenerates the inventory/notices; `-- --check` detects stale committed output. License metadata is not an assertion that every package is exclusively original project material.

## Historical scaffold assets

The removed `public/favicon.ico`, `public/logo192.png` and `public/logo512.png` exactly matched the corresponding files in the published `cra-template@1.2.0` tarball. Its package metadata declares MIT and includes a license. A copy is preserved at `docs/legacy-cra-template-LICENSE.txt`; upstream source is [Create React App's template package](https://github.com/facebook/create-react-app/tree/main/packages/cra-template).

The old assets remain in preserved Git history. Removing them from the current app does not rewrite that history or claim rights to React trademarks. No trademark endorsement is implied.

## Generated-art process

The sunflower bloom established the soft gouache/watercolor appearance. The other blooms and wooden bed used it as a style reference; each species’ leafy and bud stages used its own bloom. Shared seed/sprout and the cottage backdrop used the sunflower reference. No third-party artist/game image or named-artist style was supplied. Outputs were copied unchanged into `public/assets/garden/`; all 12 sprite files are 1254 × 1254 RGBA with transparent alpha, and the backdrop is 1536 × 1024 RGB. Generated imagery is not evidence of botanical accuracy. The game’s model-free runtime does not call an image or AI service.

[Desktop](screenshots/garden-desktop.png) and [mobile](screenshots/garden-mobile.png) screenshots show the actual built interface, using fictional state reached through normal controls and accelerated test time. They are captured UI evidence, not generated mockups.

## Future assets

For each new illustration, font, sound or dataset, record its path, creator/source, version/date, exact license/permission, attribution requirement and redistribution limits. Generated art should have its process recorded without unsupported exclusivity claims. Do not import employer/client work or proprietary resources.

## Git identity

The sampled original and preparation commits link to the owner's GitHub account. New local commits must use a verified account-linked email or the owner's actual GitHub no-reply address. Do not guess an address, fabricate authorship or rewrite old history for appearance.
