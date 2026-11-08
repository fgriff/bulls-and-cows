export type Base = 2 | 8 | 10 | 16;

export const DIGITS_BY_BASE: Record<Base, string> = {
  2: '01',
  8: '01234567',
  10: '0123456789',
  16: '0123456789abcdef',
};
