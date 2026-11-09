export type KeyValueStorage = {
  get(key: string): string | null;
  set(key: string, value: string): void;
};
