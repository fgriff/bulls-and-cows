export type Base = 2 | 8 | 10 | 16;

export const DIGITS_BY_BASE: Record<Base, string> = {
  2: '01',
  8: '01234567',
  10: '0123456789',
  16: '0123456789abcdef',
};

export type Random = () => number;

export type GameConfig = {
  length: number;
  base: Base;
};

export type Phase = 'settings' | 'playing' | 'finished';

export type Attempt = {
  guess: string;
  bulls: number;
  cows: number;
};

export type GameState =
  | { phase: 'settings' }
  | {
      phase: 'playing';
      config: GameConfig;
      secret: string;
      history: readonly Attempt[];
      startedAt: number;
    }
  | {
      phase: 'finished';
      config: GameConfig;
      secret: string;
      history: readonly Attempt[];
      startedAt: number;
      finishedAt: number;
      won: boolean;
    };

export type SubmitResult =
  | { kind: 'invalid' }
  | { kind: 'duplicate'; state: GameState }
  | { kind: 'attempt'; state: GameState };

export type Clock = () => number;
