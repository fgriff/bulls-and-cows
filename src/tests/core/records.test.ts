import { addRecord, sortRecords, topN } from '../../core/records';
import { RecordEntry } from '../../core/types';

function record(overrides: Partial<RecordEntry>): RecordEntry {
  return {
    id: 'x',
    config: { length: 4, base: 10 },
    attempts: 5,
    durationMs: 1000,
    at: 0,
    ...overrides,
  };
}

describe('sortRecords', () => {
  test('Сортирует по числу попыток возрастанию', () => {
    const sorted = sortRecords([record({ attempts: 5 }), record({ attempts: 3 })]);
    expect(sorted.map((record) => record.attempts)).toEqual([3, 5]);
  });

  test('При равенстве попыток сортирует по времени', () => {
    const sorted = sortRecords([
      record({ attempts: 3, durationMs: 2000 }),
      record({ attempts: 3, durationMs: 1000 }),
    ]);
    expect(sorted.map((record) => record.durationMs)).toEqual([1000, 2000]);
  });

  test('Не мутирует исходный массив', () => {
    const input = [record({ attempts: 5 }), record({ attempts: 3 })];
    sortRecords(input);
    expect(input.map((record) => record.attempts)).toEqual([5, 3]);
  });
});

describe('topN', () => {
  test('Возвращает первые N записей', () => {
    const input = [record({ attempts: 5 }), record({ attempts: 3 }), record({ attempts: 4 })];
    expect(topN(input, 2).map((record) => record.attempts)).toEqual([3, 4]);
  });
});

describe('addRecord', () => {
  test('Добавляет запись и сортирует', () => {
    const result = addRecord([record({ attempts: 5 })], record({ attempts: 2 }));
    expect(result.map((record) => record.attempts)).toEqual([2, 5]);
  });

  test('Обрезает до maxSize, сохраняя лучшие результаты', () => {
    const input = Array.from({ length: 10 }, (_, idx) => record({ id: `${idx}`, attempts: idx }));

    const result = addRecord(input, record({ id: 'new', attempts: 1 }), 5);

    expect(result).toHaveLength(5);
    expect(result[result.length - 1].attempts).toBe(3);
  });

  test('Отбрасывает запись, если она не попала в топ maxSize', () => {
    const input = Array.from({ length: 5 }, (_, idx) => record({ id: `${idx}`, attempts: idx }));

    const result = addRecord(input, record({ id: 'new', attempts: 100 }), 5);

    expect(result).toHaveLength(5);
    expect(result[result.length - 1].attempts).toBe(4);
    expect(result.find((record) => record.id === 'new')).toBeUndefined();
  });
});
