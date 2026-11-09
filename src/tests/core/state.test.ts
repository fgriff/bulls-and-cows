import { resetGame, startGame, submitGuess } from '../../core/state';
import { Clock, GameConfig } from '../../core/types';
import { mockRandom } from '../../test-utils/mockRandom';

function fixedClock(value: number): Clock {
  return () => value;
}

describe('startGame', () => {
  test('Создает состояние playing с секретом и пустой историей', () => {
    const config: GameConfig = { length: 4, base: 10 };
    const state = startGame(config, mockRandom([0.1, 0.2, 0.3, 0.4]), fixedClock(1000));
    expect(state.phase).toBe('playing');

    if (state.phase === 'playing') {
      expect(state.config).toEqual(config);
      expect(state.secret).toHaveLength(4);
      expect(state.history).toEqual([]);
      expect(state.startedAt).toBe(1000);
    }
  });
});

describe('submitGuess', () => {
  const config: GameConfig = { length: 2, base: 10 };

  test('Возвращает invalid для невалидной попытки', () => {
    const state = startGame(config, mockRandom([0.1, 0.2]), fixedClock(1000));
    const result = submitGuess(state, '99', fixedClock(2000));
    expect(result.kind).toBe('invalid');
  });

  test('Добавляет новую попытку в историю', () => {
    const state = startGame(config, mockRandom([0.1, 0.2]), fixedClock(1000));
    const result = submitGuess(state, '34', fixedClock(2000));
    expect(result.kind).toBe('attempt');

    if (result.kind === 'attempt' && result.state.phase === 'playing') {
      expect(result.state.history).toHaveLength(1);
      expect(result.state.history[0].guess).toBe('34');
    }
  });

  test('Не дублирует повторную попытку', () => {
    const state = startGame(config, mockRandom([0.1, 0.2]), fixedClock(1000));
    const r1 = submitGuess(state, '34', fixedClock(2000));

    if (r1.kind !== 'attempt') {
      throw new Error('expected attempt');
    }

    const r2 = submitGuess(r1.state, '34', fixedClock(3000));
    expect(r2.kind).toBe('duplicate');

    if (r2.kind === 'duplicate') {
      expect(r2.state).toBe(r1.state);
    } else {
      throw new Error('expected duplicate');
    }
  });

  test('Завершает игру при победе и фиксирует время', () => {
    const config4: GameConfig = { length: 4, base: 10 };
    const state = startGame(config4, mockRandom([0.1, 0.2, 0.3, 0.4]), fixedClock(1000));

    if (state.phase !== 'playing') {
      throw new Error('expected playing');
    }

    const secret = state.secret;
    const result = submitGuess(state, secret, fixedClock(5000));
    expect(result.kind).toBe('attempt');

    if (result.kind === 'attempt' && result.state.phase === 'finished') {
      expect(result.state.won).toBe(true);
      expect(result.state.finishedAt).toBe(5000);
      expect(result.state.history).toHaveLength(1);
    }
  });

  test('Возвращает invalid, если игра уже завершена', () => {
    const state = resetGame();
    const result = submitGuess(state, '12', fixedClock(2000));
    expect(result.kind).toBe('invalid');
  });
});

describe('resetGame', () => {
  test('Возвращает состояние settings', () => {
    expect(resetGame()).toEqual({ phase: 'settings' });
  });
});
