# Tabata Timer for Huawei Watch

[![License](https://img.shields.io/badge/license-Apache_2.0-green.svg)](LICENSE)
![stability-wip](https://img.shields.io/badge/stability-work_in_progress-orange.svg)

A Tabata interval timer for Huawei lite wearables (Watch Fit 3, GT series). A from-scratch rewrite of [Tabata Timer](https://github.com/LLarean/tabata-timer), the Unity app for Android and Web.

> **Status:** early development. The workout logic is written and tested; the watch UI is not there yet, and nothing has run on a real watch so far.

## What is Tabata?

High-intensity interval training in short rounds: **20 seconds** of work, **10 seconds** of rest, **8 rounds**, with a short preparation before the first one. Rounds, work time and rest time are adjustable.

## Roadmap

- [x] Workout logic with unit tests
- [ ] DevEco Studio project (Lite Wearable)
- [ ] Timer screen
- [ ] Settings screen with saved values
- [ ] Vibration cues on phase changes
- [ ] English and Russian
- [ ] Verified on a Watch Fit 3

## Technologies

- **HarmonyOS Lite Wearable** — JS + HML + CSS
- **DevEco Studio** — build and signing
- **Node.js** — unit tests for the workout logic, no dependencies

## Development

```
npm test
```

Runs the logic tests on Node.js 22 or later. No watch, emulator or DevEco Studio needed.

Building and installing on a watch will be documented once the DevEco Studio project lands.

## Project Structure

```
entry/src/main/js/MainAbility/common/   workout logic, free of watch APIs
tests/                                  unit tests
```

## License

Licensed under the Apache License 2.0 — see [LICENSE](LICENSE).
