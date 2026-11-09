import { Clock, Random } from '../core/types.js';

export const browserRandom: Random = () => Math.random();
export const browserClock: Clock = () => Date.now();
