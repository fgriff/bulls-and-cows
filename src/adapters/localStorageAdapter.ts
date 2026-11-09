import type { KeyValueStorage } from '../ports/storage.js';

export function createLocalStorageAdapter(): KeyValueStorage {
  return {
    get: (key) => localStorage.getItem(key),
    set: (key, value) => localStorage.setItem(key, value),
  };
}
