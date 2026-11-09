import { createDigitValidator } from './createDigitValidator.js';
import { Base } from './types.js';

export function isValidGuess(guess: string, length: number, base: Base): boolean {
  const isDigit = createDigitValidator(base);

  if (guess.length !== length) {
    return false;
  }

  const chars = [...guess];

  if (!chars.every(isDigit)) {
    return false;
  }

  const normalized = chars.map((char) => char.toLowerCase());
  const unique = new Set(normalized);

  return unique.size === normalized.length;
}
