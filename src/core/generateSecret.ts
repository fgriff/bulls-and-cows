import type { Base, Random } from './types.js';

export function generateSecret(
  _length: number,
  _base: Base,
  _random: Random = Math.random,
): string {
  throw new Error('not implemented');
}
