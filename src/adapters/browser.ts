import { Clock, Random } from '../core/types';

export const browserRandom: Random = () => Math.random();
export const browserClock: Clock = () => Date.now();
