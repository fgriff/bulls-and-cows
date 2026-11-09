import { Evaluation } from './evaluateGuess.js';

export type Attempt = { guess: string; bulls: number; cows: number };

export function appendAttempt(history: readonly Attempt[], attempt: Attempt): readonly Attempt[] {
  const normalized = attempt.guess.toLowerCase();
  const isExists = history.some((a) => a.guess.toLowerCase() === normalized);

  if (isExists) {
    return history;
  }

  return [...history, attempt];
}

export function findAttempt(history: readonly Attempt[], guess: string): Attempt | undefined {
  const normalized = guess.toLowerCase();

  return history.find((a) => a.guess.toLowerCase() === normalized);
}

export function isWin(evaluation: Evaluation, length: number): boolean {
  return evaluation.bulls === length;
}
