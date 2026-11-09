import { createDigitValidator } from './createDigitValidator.js';
export function isValidGuess(guess, length, base) {
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
