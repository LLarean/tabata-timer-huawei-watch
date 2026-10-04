import test from 'node:test';
import assert from 'node:assert/strict';
import { Defaults, Limits, clamp } from '../entry/src/main/js/MainAbility/common/settings.js';

test('defaults are the classic tabata protocol', () => {
  assert.deepEqual(Defaults, { rounds: 8, workTime: 20, restTime: 10 });
});

test('defaults are within limits', () => {
  for (const key of Object.keys(Defaults)) {
    assert.equal(clamp(key, Defaults[key]), Defaults[key]);
  }
});

test('clamp raises values below the minimum', () => {
  assert.equal(clamp('rounds', 0), Limits.rounds.min);
  assert.equal(clamp('workTime', -5), Limits.workTime.min);
});

test('clamp lowers values above the maximum', () => {
  assert.equal(clamp('rounds', 100), Limits.rounds.max);
  assert.equal(clamp('restTime', 1000), Limits.restTime.max);
});

test('clamp keeps values inside the range', () => {
  assert.equal(clamp('restTime', 45), 45);
});
