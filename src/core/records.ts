import { RecordEntry } from './types';

export function sortRecords(_records: readonly RecordEntry[]): readonly RecordEntry[] {
  throw new Error('not implemented');
}

export function topN(_records: readonly RecordEntry[], _n: number): readonly RecordEntry[] {
  throw new Error('not implemented');
}

export function addRecord(
  _records: readonly RecordEntry[],
  _entry: RecordEntry,
  _maxSize = 10,
): readonly RecordEntry[] {
  throw new Error('not implemented');
}
