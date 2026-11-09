import { Base, DIGITS_BY_BASE, Random } from './types.js';

export function generateSecret(length: number, base: Base, random: Random = Math.random): string {
  const alphabet = DIGITS_BY_BASE[base];

  const pickUnique = (acc: readonly string[]): string[] => {
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
