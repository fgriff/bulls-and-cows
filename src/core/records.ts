import { RecordEntry } from './types.js';

export function sortRecords(records: readonly RecordEntry[]): readonly RecordEntry[] {
  return [...records].sort((a, b) => {
    if (a.attempts !== b.attempts) {
      return a.attempts - b.attempts;
    }

    return a.durationMs - b.durationMs;
  });
}

export function topN(records: readonly RecordEntry[], n: number): readonly RecordEntry[] {
  return sortRecords(records).slice(0, n);
}

export function addRecord(
  records: readonly RecordEntry[],
  entry: RecordEntry,
  maxSize = 10,
): readonly RecordEntry[] {
  return topN([...records, entry], maxSize);
}
