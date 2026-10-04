# Tabata Timer for Huawei Watch

Tabata interval timer for Huawei lite wearables (target device: Watch Fit 3, 408×480). A JS rewrite of the Unity app at https://github.com/LLarean/tabata-timer; no code is shared with it.

## Commands

- `npm test` — unit tests (`node --test`, zero dependencies)

Build and install commands are not established yet; see "Install path" below.

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

## Install path: findings so far (October 2026, nothing verified on the device)

- Blocked on the owner's Huawei developer account. The watch only installs apps signed with a Huawei-issued debug profile containing its UDID (AppGallery Connect). Publishing is not a goal; debug install on the owner's watch is.
- Current DevEco Studio 6.x builds lite wearable apps for API 10+. Huawei support confirms watches limited to API 6 reject them with `Installation failed: 40. Invalid configuration file format`: https://forums.developer.huawei.com/forumPortal/en/topic/0201202047517553128
- A forum user reports the Watch Fit 3 is API 6 (single unconfirmed source): https://forums.developer.huawei.com/forumPortal/en/topic/0204158676462718053
- Likely build route: the legacy console toolchain from the OpenHarmony SDK API 9 (ace-loader → restool → haptobin_tool → hap-sign-tool, Node 16, Java 11+), as done for an API 6 watch in https://github.com/Burak4Arslan/huawei-watch-sideload-ios. Not tried on Windows yet; SDK download source not found yet.
- Install goes through the DevEco Assistant Android app (APKs: https://github.com/megaacheyounes/harmony-os-tools). One 2026 report says it fails to connect to the newest Huawei Health.
- First check once the account exists: does DevEco Assistant see the watch and show its UDID.

## Open questions

- Whether a debug-signed app installs on a Watch Fit 3 at all.
- Whether the app keeps running with the screen off. If not, the timer page must keep the screen on and derive elapsed seconds from the system clock instead of counting interval callbacks.
- Root `package.json` sets `"type": "module"` for the tests. If hvigor trips over it, move the tests' module config elsewhere.
