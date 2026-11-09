import { Base, DIGITS_BY_BASE } from './types.js';

export type DigitValidator = (char: string) => boolean;

export function createDigitValidator(base: Base): DigitValidator {
  const alphabet = DIGITS_BY_BASE[base];

  return (char: string): boolean => char.length === 1 && alphabet.includes(char.toLowerCase());
}
