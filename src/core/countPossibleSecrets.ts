import { Base } from './types.js';

const memo = new Map<string, number>();

export function countPossibleSecrets(length: number, base: Base): number {
  return memoize(length, base);
}

function memoize(length: number, base: number): number {
  const key = `${length}:${base}`;
  const cached = memo.get(key);

  if (cached !== undefined) {
    return cached;
  }

  const result = compute(length, base);
  memo.set(key, result);

  return result;
}

function compute(length: number, base: number): number {
  if (length === 0) {
    return 1;
  }

  if (length > base) {
    return 0;
  }

  return base * compute(length - 1, base - 1);
}
