import { isValidGuess } from '../../core/isValidGuess';

describe('isValidGuess', () => {
  describe('Валидные попытки', () => {
    test('Принимает корректную попытку в десятичной системе', () => {
      expect(isValidGuess('1234', 4, 10)).toBe(true);
    });

    test('Принимает корректную попытку с ведущим нулем', () => {
      expect(isValidGuess('0123', 4, 10)).toBe(true);
    });

    test('Принимает корректную попытку в двоичной системе', () => {
      expect(isValidGuess('10', 2, 2)).toBe(true);
    });

    test('Принимает корректную попытку в шестнадцатеричной системе', () => {
      expect(isValidGuess('1a2f', 4, 16)).toBe(true);
    });
  });

  describe('Неверная длина', () => {
    test('Отклоняет попытку короче заданной длины', () => {
      expect(isValidGuess('123', 4, 10)).toBe(false);
    });

    test('Отклоняет попытку длиннее заданной длины', () => {
      expect(isValidGuess('12345', 4, 10)).toBe(false);
    });

    test('Отклоняет пустую строку', () => {
      expect(isValidGuess('', 4, 10)).toBe(false);
    });
  });

  describe('Недопустимые для системы счисления символы', () => {
    test('Отклоняет цифру 2 в двоичной системе', () => {
      expect(isValidGuess('12', 2, 2)).toBe(false);
    });

    test('Отклоняет цифру 8 в восьмеричной системе', () => {
      expect(isValidGuess('78', 2, 8)).toBe(false);
    });

    test('Отклоняет букву в десятичной системе', () => {
      expect(isValidGuess('12a4', 4, 10)).toBe(false);
    });

    test('Отклоняет букву за пределами f в шестнадцатеричной системе', () => {
      expect(isValidGuess('12g4', 4, 16)).toBe(false);
    });
  });

  describe('Повторяющиеся цифры', () => {
    test('Отклоняет попытку с повторяющейся цифрой', () => {
      expect(isValidGuess('1123', 4, 10)).toBe(false);
    });

    test('Отклоняет попытку из одинаковых цифр', () => {
      expect(isValidGuess('0000', 4, 10)).toBe(false);
    });

    test('Отклоняет повтор цифры, отличающейся только регистром (hex)', () => {
      expect(isValidGuess('Aa12', 4, 16)).toBe(false);
    });
  });

  describe('Регистр в шестнадцатеричной системе', () => {
    test('Принимает заглавные буквы A-F', () => {
      expect(isValidGuess('1A2F', 4, 16)).toBe(true);
    });

    test('Принимает смешанный регистр', () => {
      expect(isValidGuess('1a2F', 4, 16)).toBe(true);
    });
  });

  describe('Невозможная конфигурация', () => {
    test('Отклоняет любую попытку, если длина больше основания системы', () => {
      expect(isValidGuess('012', 3, 2)).toBe(false);
      expect(isValidGuess('01234567', 9, 8)).toBe(false);
    });
  });
});
