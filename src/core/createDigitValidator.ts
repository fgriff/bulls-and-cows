import type { Base } from './types.js';

export type DigitValidator = (char: string) => boolean;

export function createDigitValidator(_base: Base): DigitValidator {
  throw new Error('not implemented');
}
