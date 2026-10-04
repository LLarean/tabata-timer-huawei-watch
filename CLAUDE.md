# Tabata Timer for Huawei Watch

Tabata interval timer for Huawei lite wearables (target device: Watch Fit 3, 408×480). A JS rewrite of the Unity app at https://github.com/LLarean/tabata-timer; no code is shared with it.

## Commands

- `npm test` — unit tests (`node --test`, zero dependencies)

Build and install commands are not established yet: the DevEco Studio project has not been added.

## Layout

- `entry/src/main/js/MainAbility/common/` — pure logic. The path follows the DevEco Lite Wearable template so pages can import it; it has not been checked against a generated template yet and may move.
  - `workout.js` — the state machine: `createWorkout(settings)`, `tick(workout, settings)` → `{ workout, signal }`
  - `settings.js` — defaults, limits, `clamp(key, value)`
- `tests/` — `*.test.js`, one file per logic module

## Rules

- Files in `common/` never import watch APIs (`@system.*`). Pages own timers, storage, vibration and i18n and call into `common/`.
- Logic functions are pure: return new objects, never mutate arguments. Every behaviour change comes with a test.
- Keep syntax conservative (ES2015: `const`, plain functions, plain objects). The watch runs a small JS engine behind a transpiler; avoid `Map`, `Set`, generators, async/await, object spread.
- Phase and signal values (`prepare`, `work`, `rest`, `finish`) double as i18n keys; keep them in sync.
- Signing files (`.p12`, `.cer`, `.p7b`) and passwords stay outside the repository. Check `build-profile.json5` for signing data before every commit.
- No comments unless the logic is non-obvious. Comments and docs in English.

## Behaviour carried over from the original

- Preparation lasts as long as a rest period.
- The round counter increments when a work phase starts.
- After the last work phase the workout finishes and resets; there is no trailing rest.
- A phase never displays 0: the tick that would reach 0 switches to the next phase and shows its full duration.

## Open questions

- Whether a self-signed app installs on a Watch Fit 3 at all (unverified).
- Whether the app keeps running with the screen off. If not, the timer page must keep the screen on and derive elapsed seconds from the system clock instead of counting interval callbacks.
- Root `package.json` sets `"type": "module"` for the tests. If hvigor trips over it, move the tests' module config elsewhere.
