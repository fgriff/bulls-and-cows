import { appendAttempt, findAttempt, isWin, type Attempt } from '../../core/history';

describe('appendAttempt', () => {
  test('Добавляет новую попытку в пустую историю', () => {
    const result = appendAttempt([], { guess: '1234', bulls: 0, cows: 2 });
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ guess: '1234', bulls: 0, cows: 2 });
  });

  test('Иммутабельно добавляет попытку, не меняя исходный массив', () => {
    const original: Attempt[] = [{ guess: '1234', bulls: 0, cows: 2 }];
    const result = appendAttempt(original, { guess: '5678', bulls: 1, cows: 1 });
    expect(original).toHaveLength(1);
    expect(result).toHaveLength(2);
    expect(result).not.toBe(original);
  });

  test('Не задваивает повторную попытку (регистрозависимо для hex)', () => {
    const history = appendAttempt([], { guess: 'abcd', bulls: 0, cows: 0 });
    const result = appendAttempt(history, { guess: 'ABCD', bulls: 0, cows: 0 });
    expect(result).toHaveLength(1);
  });

  test('Добавляет попытку, если она отличается', () => {
    const history = appendAttempt([], { guess: '1234', bulls: 0, cows: 0 });
    const result = appendAttempt(history, { guess: '1235', bulls: 0, cows: 0 });
    expect(result).toHaveLength(2);
  });
});

describe('findAttempt', () => {
  test('Находит попытку без учета регистра', () => {
    const history = appendAttempt([], { guess: 'abcd', bulls: 1, cows: 2 });
    expect(findAttempt(history, 'ABCD')).toEqual({ guess: 'abcd', bulls: 1, cows: 2 });
  });

  test('Возвращает undefined, если попытки нет', () => {
    expect(findAttempt([], '1234')).toBeUndefined();
  });
});

describe('isWin', () => {
  test('Возвращает true, если bulls равно длине', () => {
    expect(isWin({ bulls: 4, cows: 0 }, 4)).toBe(true);
  });

  test('Возвращает false, если bulls меньше длины', () => {
    expect(isWin({ bulls: 3, cows: 1 }, 4)).toBe(false);
  });
});
