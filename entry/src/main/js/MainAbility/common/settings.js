export const Defaults = {
  rounds: 8,
  workTime: 20,
  restTime: 10
};

export const Limits = {
  rounds: { min: 2, max: 99 },
  workTime: { min: 10, max: 999 },
  restTime: { min: 5, max: 999 }
};

export function clamp(key, value) {
  const limit = Limits[key];
  return Math.min(limit.max, Math.max(limit.min, value));
}
