# Development roadmap

This is genuine proposed work for the existing personal project, with estimates rather than guaranteed hours or program approval. Completed features must not be counted as future tasks.

## Implemented and excluded from remaining estimates

- Original history preserved; runtime/tooling, dependency/license and secret-scan preparation complete.
- Three seed types, six beds, atomic purchases and one-time harvest payouts, XP/levels.
- Pure elapsed-time simulation with deterministic moon boundaries and pause/visible-tab behavior.
- Responsive keyboard-operable first loop and meaningful regression/browser coverage.
- Twelve transparent growth/bed illustrations, a cottage backdrop, art provenance and reduced-motion-aware harvest sway.

## 1. Local saves and recovery — 6–10 hours

Add a versioned save schema, strict runtime validation, migration, import preview, export/reset and storage-failure recovery. Preserve the current garden when an import is malformed. Design a capped, forgiving absence policy explicitly instead of relying on background timers.

**Acceptance:** refresh can preserve a garden; corrupt/unsupported saves do not overwrite recoverable data; failed imports leave the current visit intact; version, timestamp and quota cases are tested. No real personal information or account is required.

## 2. Meaningful tending rules — 6–10 hours

Add a small care/resource system where watering or another deliberate action changes a clear growth or yield rule. Explain needs without punishment for missed days. Define resource regeneration, constraints and feedback; balance the existing three species through repeatable playtests before expanding the catalog.

**Acceptance:** a player can predict why a care action matters; resources and rewards obey their invariants; repeated/invalid care cannot duplicate rewards; accessible status updates match the actual rules. Include tests and observed balancing notes, not just decorative controls.

## 3. Magical discovery and validated breeding — 8–14 hours

Define valid parent pairs and bounded inherited traits, reproducible randomness, offspring identity and costs. Add parent selection, a clear preview of possible outcomes and saved-result compatibility. The old unvalidated thunk/reducer experiments were retired; this is a coherent new rule system, not a claim they were complete.

**Acceptance:** missing/ineligible parents never crash or spend resources; identical seeds/parents reproduce outcomes; offspring obey trait limits; UI explanations match the rules; duplicate actions cannot clone paid rewards. Use a few species with distinct choices before adding more.

## Review and polish track — 4–6 hours, after illustrated assets

Review keyboard order/focus, a screen reader, reduced motion, real touch devices, narrow/landscape layouts and long sessions. Refine stage transitions without relying on color or motion; evaluate image delivery sizes while retaining source artwork. Review actual player observations and fix reproducible issues. Automated Chromium checks do not complete this track.

## Later possibilities — unestimated

A larger species collection, a spatial garden scene, seasonal decorations, optional original ambient audio with mute/volume, and an offline edition if use warrants it. Accounts, multiplayer, cloud saves, telemetry and payments are separate product/data-flow decisions.

## Next work block

Saves, tending and breeding total roughly **20–34 hours**; review/polish is a separate track. Tests and documentation for each feature are included in its estimate. Select work Kai actually wants to build. Do not add work to meet a threshold, inflate history or count completed preparation/the first playable loop again.
