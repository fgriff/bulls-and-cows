import { evaluateGuess } from './evaluateGuess.js';
import { generateSecret } from './generateSecret.js';
import { appendAttempt, findAttempt, isWin } from './history.js';
import { isValidGuess } from './isValidGuess.js';
import type { Clock, GameConfig, GameState, Random, SubmitResult } from './types.js';

export function startGame(config: GameConfig, random: Random, clock: Clock): GameState {
  const secret = generateSecret(config.length, config.base, random);

  return {
    phase: 'playing',
    config,
    secret,
    history: [],
    startedAt: clock(),
  };
}

export function submitGuess(state: GameState, guess: string, clock: Clock): SubmitResult {
  if (state.phase !== 'playing') {
    return { kind: 'invalid' };
  }

  if (!isValidGuess(guess, state.config.length, state.config.base)) {
    return { kind: 'invalid' };
  }

  const existing = findAttempt(state.history, guess);
  if (existing) {
    return {
      kind: 'duplicate',
      state,
    };
  }

  const evaluation = evaluateGuess(state.secret, guess);
  const history = appendAttempt(state.history, {
    guess: guess.toLowerCase(),
    bulls: evaluation.bulls,
    cows: evaluation.cows,
  });

  if (isWin(evaluation, state.config.length)) {
    return {
      kind: 'attempt',
      state: {
        ...state,
        phase: 'finished',
        history,
        finishedAt: clock(),
        won: true,
      },
    };
  }

  return {
    kind: 'attempt',
    state: { ...state, history },
  };
}

export function resetGame(): GameState {
  return { phase: 'settings' };
}
