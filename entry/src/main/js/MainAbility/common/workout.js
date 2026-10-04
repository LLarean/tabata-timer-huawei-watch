export const Phase = {
  PREPARE: 'prepare',
  WORK: 'work',
  REST: 'rest'
};

export const Signal = {
  WORK: 'work',
  REST: 'rest',
  FINISH: 'finish'
};

export function createWorkout(settings) {
  return { phase: Phase.PREPARE, round: 0, remaining: settings.restTime };
}

// Advances the workout by one second. Never mutates its arguments.
export function tick(workout, settings) {
  if (workout.remaining > 1) {
    return {
      workout: { phase: workout.phase, round: workout.round, remaining: workout.remaining - 1 },
      signal: null
    };
  }

  if (workout.phase !== Phase.WORK) {
    return {
      workout: { phase: Phase.WORK, round: workout.round + 1, remaining: settings.workTime },
      signal: Signal.WORK
    };
  }

  if (workout.round >= settings.rounds) {
    return { workout: createWorkout(settings), signal: Signal.FINISH };
  }

  return {
    workout: { phase: Phase.REST, round: workout.round, remaining: settings.restTime },
    signal: Signal.REST
  };
}
