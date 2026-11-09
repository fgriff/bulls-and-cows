import { RecordEntry } from '../core/types.js';
import { elem } from './elements.js';

export function renderRecords(records: readonly RecordEntry[]): HTMLElement {
  const list = elem('ol', { className: 'records-list' });

  for (const r of records) {
    list.append(
      elem('li', {}, [
        `попыток: ${r.attempts}; время: ${Math.round(r.durationMs / 1000)} сек.; ` +
          `длина: ${r.config.length}; база: ${r.config.base}`,
      ]),
    );
  }

  return elem('section', { className: 'records' }, [elem('h2', {}, ['Рекорды']), list]);
}
