import test from 'node:test';
import assert from 'node:assert/strict';
import { Phase, Signal, createWorkout, tick } from '../entry/src/main/js/MainAbility/common/workout.js';

const settings = { rounds: 2, workTime: 3, restTime: 2 };

function run(workout, seconds) {
  const signals = [];
  for (let i = 0; i < seconds; i++) {
    const result = tick(workout, settings);
    workout = result.workout;
    if (result.signal) signals.push(result.signal);
  }
  return { workout, signals };
}

test('starts in preparation with the rest duration', () => {
  assert.deepEqual(createWorkout(settings), { phase: Phase.PREPARE, round: 0, remaining: 2 });
});

test('counts down inside a phase without signals', () => {
  const { workout, signals } = run(createWorkout(settings), 1);
  assert.deepEqual(workout, { phase: Phase.PREPARE, round: 0, remaining: 1 });
  assert.deepEqual(signals, []);
});

test('preparation turns into the first work round', () => {
  const { workout, signals } = run(createWorkout(settings), 2);
  assert.deepEqual(workout, { phase: Phase.WORK, round: 1, remaining: 3 });
  assert.deepEqual(signals, [Signal.WORK]);
});

test('work turns into rest and keeps the round', () => {
  const { workout, signals } = run(createWorkout(settings), 5);
  assert.deepEqual(workout, { phase: Phase.REST, round: 1, remaining: 2 });
  assert.deepEqual(signals, [Signal.WORK, Signal.REST]);
});

test('rest turns into the next work round', () => {
  const { workout } = run(createWorkout(settings), 7);
  assert.deepEqual(workout, { phase: Phase.WORK, round: 2, remaining: 3 });
});

test('last work round finishes and resets, with no trailing rest', () => {
  const { workout, signals } = run(createWorkout(settings), 10);
  assert.deepEqual(workout, createWorkout(settings));
  assert.deepEqual(signals, [Signal.WORK, Signal.REST, Signal.WORK, Signal.FINISH]);
});

test('finishes when rounds were lowered below the current round', () => {
  const result = tick({ phase: Phase.WORK, round: 5, remaining: 1 }, settings);
  assert.equal(result.signal, Signal.FINISH);
});

test('does not mutate the workout it is given', () => {
  const workout = createWorkout(settings);
  tick(workout, settings);
  assert.deepEqual(workout, createWorkout(settings));
});
