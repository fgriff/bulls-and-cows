import { evaluateGuess } from '../../core/evaluateGuess';

describe('evaluateGuess', () => {
  test('Возвращает все bulls при полном совпадении', () => {
    expect(evaluateGuess('1234', '1234')).toEqual({ bulls: 4, cows: 0 });
  });

  test('Возвращает все cows при совпадении цифр не на своих местах', () => {
    expect(evaluateGuess('1234', '4321')).toEqual({ bulls: 0, cows: 4 });
  });

  test('Возвращает 0 bulls и 0 cows при полном несовпадении', () => {
    expect(evaluateGuess('1234', '5678')).toEqual({ bulls: 0, cows: 0 });
  });

  test('Корректно считает смешанный случай', () => {
    expect(evaluateGuess('1234', '1243')).toEqual({ bulls: 2, cows: 2 });
  });

  test('Корректно считает при одном bull и одной cow', () => {
    expect(evaluateGuess('1234', '1356')).toEqual({ bulls: 1, cows: 1 });
  });

  test('Учитывает ведущий ноль как обычную цифру', () => {
    expect(evaluateGuess('0123', '3210')).toEqual({ bulls: 0, cows: 4 });
  });

  test('Не считает cow цифру, которая уже посчитана как bull', () => {
    expect(evaluateGuess('1234', '1111')).toEqual({ bulls: 1, cows: 0 });
  });

  test('Не учитывает дубли в попытке сверх одного вхождения в секрете', () => {
    expect(evaluateGuess('1234', '1144')).toEqual({ bulls: 2, cows: 0 });
  });

  test('Обрабатывает hex без учета регистра', () => {
    expect(evaluateGuess('abcd', 'ABCD')).toEqual({ bulls: 4, cows: 0 });
  });

  test('Обрабатывает hex со смешанным регистром и частичным совпадением', () => {
    expect(evaluateGuess('1a2b', '1A3B')).toEqual({ bulls: 3, cows: 0 });
    expect(evaluateGuess('1a2b', '2A1B')).toEqual({ bulls: 2, cows: 2 });
  });

  test('Обрабатывает пустые строки', () => {
    expect(evaluateGuess('', '')).toEqual({ bulls: 0, cows: 0 });
  });
});
