import type { Clock, GameConfig, GameState, Random, SubmitResult } from './types';

export function startGame(_config: GameConfig, _random: Random, _clock: Clock): GameState {
  throw new Error('not implemented');
}

export function submitGuess(_state: GameState, _guess: string, _clock: Clock): SubmitResult {
  throw new Error('not implemented');
}

export function resetGame(): GameState {
  throw new Error('not implemented');
}
