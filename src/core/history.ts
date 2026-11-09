import { Evaluation } from './evaluateGuess';

export type Attempt = { guess: string; bulls: number; cows: number };

export function appendAttempt(_history: readonly Attempt[], _attempt: Attempt): readonly Attempt[] {
  throw new Error('not implemented');
}

export function findAttempt(_history: readonly Attempt[], _guess: string): Attempt | undefined {
  throw new Error('not implemented');
}

export function isWin(_evaluation: Evaluation, _length: number): boolean {
  throw new Error('not implemented');
}
