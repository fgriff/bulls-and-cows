import { DIGITS_BY_BASE } from './types.js';
export function generateSecret(length, base, random = Math.random) {
    const alphabet = DIGITS_BY_BASE[base];
    const pickUnique = (acc) => {
        if (acc.length === length) {
            return [...acc];
        }
        const idx = Math.floor(random() * alphabet.length);
        const char = alphabet[idx];
        if (acc.includes(char)) {
            return pickUnique(acc);
        }
        return pickUnique([...acc, char]);
    };
    return pickUnique([]).join('');
}
