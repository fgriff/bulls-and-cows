import { generateSecret } from '../../core/generateSecret';
import { DIGITS_BY_BASE } from '../../core/types';
import { mockRandom } from '../../test-utils/mockRandom';

describe('generateSecret', () => {
  test('Возвращает строку заданной длины', () => {
    const secret = generateSecret(4, 10, mockRandom([0.1, 0.2, 0.3, 0.4]));
    expect(secret).toHaveLength(4);
  });

  test('Все символы принадлежат алфавиту выбранной системы счисления', () => {
    const secret = generateSecret(4, 16, mockRandom([0.05, 0.15, 0.25, 0.35]));

    for (const ch of secret) {
      expect(DIGITS_BY_BASE[16]).toContain(ch);
    }
  });

  test('Все цифры уникальны', () => {
    const secret = generateSecret(4, 10, mockRandom([0.1, 0.2, 0.3, 0.4]));
    expect(new Set(secret).size).toBe(secret.length);
  });

  test('Детерминирован при фиксированном random', () => {
    const r1 = mockRandom([0.1, 0.2, 0.3, 0.4]);
    const r2 = mockRandom([0.1, 0.2, 0.3, 0.4]);
    expect(generateSecret(4, 10, r1)).toBe(generateSecret(4, 10, r2));
  });

  test('Корректно обрабатывает ведущий ноль (случайно выпавший)', () => {
    const secret = generateSecret(4, 10, mockRandom([0.0, 0.2, 0.3, 0.4]));
    expect(secret).toBe('0234');
  });

  test('Пропускает дубли и берет следующее значение random', () => {
    const secret = generateSecret(4, 10, mockRandom([0.0, 0.0, 0.1, 0.2, 0.3]));
    expect(secret).toBe('0123');
  });

  test('Генерирует секрет для минимальной конфигурации (длина 2, base 2)', () => {
    const secret = generateSecret(2, 2, mockRandom([0.0, 0.5]));
    expect(secret).toHaveLength(2);
    expect(new Set(secret).size).toBe(2);

    for (const ch of secret) {
      expect(DIGITS_BY_BASE[2]).toContain(ch);
    }
  });

  test('Генерирует секрет для hex с буквами в нижнем регистре', () => {
    const secret = generateSecret(2, 16, mockRandom([0.9, 0.95]));
    expect(secret).toBe('ef');
  });
});
