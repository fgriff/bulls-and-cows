import { createDigitValidator } from '../../core/createDigitValidator';
import { Base } from '../../core/types';

describe('createDigitValidator', () => {
  describe('Двоичная система (base 2)', () => {
    const isBinaryDigit = createDigitValidator(2);

    test('Принимает символы 0 и 1', () => {
      expect(isBinaryDigit('0')).toBe(true);
      expect(isBinaryDigit('1')).toBe(true);
    });

    test('Отклоняет цифры вне диапазона 0-1 и буквы', () => {
      for (const d of '23456789') {
        expect(isBinaryDigit(d)).toBe(false);
      }

      expect(isBinaryDigit('a')).toBe(false);
    });
  });

  describe('Восьмеричная система (base 8)', () => {
    const isOctalDigit = createDigitValidator(8);

    test('Принимает цифры 0-7', () => {
      for (const d of '01234567') {
        expect(isOctalDigit(d)).toBe(true);
      }
    });

    test('Отклоняет 8, 9 и буквы', () => {
      expect(isOctalDigit('8')).toBe(false);
      expect(isOctalDigit('9')).toBe(false);
      expect(isOctalDigit('a')).toBe(false);
    });
  });

  describe('Десятичная система (base 10)', () => {
    const isDecimalDigit = createDigitValidator(10);

    test('Принимает все цифры 0-9', () => {
      for (const d of '0123456789') {
        expect(isDecimalDigit(d)).toBe(true);
      }
    });

    test('Отклоняет буквы', () => {
      expect(isDecimalDigit('a')).toBe(false);
      expect(isDecimalDigit('f')).toBe(false);
    });
  });

  describe('Шестнадцатеричная система (base 16)', () => {
    const isHexDigit = createDigitValidator(16);

    test('Принимает цифры 0-9', () => {
      for (const d of '0123456789') {
        expect(isHexDigit(d)).toBe(true);
      }
    });

    test('Принимает строчные буквы a-f', () => {
      for (const d of 'abcdef') {
        expect(isHexDigit(d)).toBe(true);
      }
    });

    test('Принимает заглавные буквы A-F (регистр не важен)', () => {
      for (const d of 'ABCDEF') {
        expect(isHexDigit(d)).toBe(true);
      }
    });

    test('Отклоняет буквы за пределами f', () => {
      expect(isHexDigit('g')).toBe(false);
      expect(isHexDigit('G')).toBe(false);
      expect(isHexDigit('z')).toBe(false);
      expect(isHexDigit('Z')).toBe(false);
    });
  });

  describe('Граничные случаи', () => {
    const isDecimalDigit = createDigitValidator(10);

    test('Отклоняет пустую строку', () => {
      expect(isDecimalDigit('')).toBe(false);
    });

    test('Отклоняет строку из нескольких символов', () => {
      expect(isDecimalDigit('12')).toBe(false);
      expect(isDecimalDigit('ab')).toBe(false);
    });

    test('Отклоняет нецифровые символы', () => {
      expect(isDecimalDigit('-')).toBe(false);
      expect(isDecimalDigit(' ')).toBe(false);
    });
  });

  describe('Каррирование', () => {
    test('Возвращает переиспользуемый предикат для каждой системы счисления', () => {
      const bases: Base[] = [2, 8, 10, 16];

      for (const base of bases) {
        const validator = createDigitValidator(base);
        expect(typeof validator).toBe('function');
        expect(validator('0')).toBe(true);
      }
    });
  });
});
