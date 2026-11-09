import { DIGITS_BY_BASE } from './types.js';
export function createDigitValidator(base) {
    const alphabet = DIGITS_BY_BASE[base];
    return (char) => char.length === 1 && alphabet.includes(char.toLowerCase());
}
