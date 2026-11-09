import { Random } from '../core/types.js';

export function mockRandom(values: number[]): Random {
  let i = 0;

  return () => {
    const v = values[i % values.length];
    i++;

    return v;
  };
}
