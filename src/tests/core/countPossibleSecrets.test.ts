import { countPossibleSecrets } from '../../core/countPossibleSecrets';

describe('countPossibleSecrets', () => {
  test('Возвращает 1 при length = 0', () => {
    expect(countPossibleSecrets(0, 10)).toBe(1);
  });

  test('Возвращает base при length = 1', () => {
    expect(countPossibleSecrets(1, 10)).toBe(10);
    expect(countPossibleSecrets(1, 2)).toBe(2);
    expect(countPossibleSecrets(1, 16)).toBe(16);
  });

  test('Считает P(base, 2) = base * (base - 1)', () => {
    expect(countPossibleSecrets(2, 10)).toBe(90);
    expect(countPossibleSecrets(2, 2)).toBe(2);
    expect(countPossibleSecrets(2, 16)).toBe(240);
  });

  test('Считает P(base, 4) для десятичной системы', () => {
    expect(countPossibleSecrets(4, 10)).toBe(5040);
  });

  test('Считает P(base, 6) для шестнадцатеричной системы', () => {
    expect(countPossibleSecrets(6, 16)).toBe(5765760);
  });

  test('Считает для минимальной конфигурации (2, 2)', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
  });

  test('Считает для конфигурации (4, 16)', () => {
    expect(countPossibleSecrets(4, 16)).toBe(43680);
  });

  test('Возвращает 0, если length > base', () => {
    expect(countPossibleSecrets(5, 2)).toBe(0);
    expect(countPossibleSecrets(9, 8)).toBe(0);
  });

  test('Мемоизирует результат (повторный вызов возвращает то же значение)', () => {
    const first = countPossibleSecrets(4, 10);
    const second = countPossibleSecrets(4, 10);
    expect(first).toBe(second);
    expect(first).toBe(5040);
  });
});
