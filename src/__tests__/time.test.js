import { describe, expect, it } from 'vitest';
import { formatSeconds } from '../utils/time.js';

describe('formatSeconds', () => {
  it('formats minutes and seconds with padding', () => {
    expect(formatSeconds(65)).toBe('01:05');
  });

  it('clamps negative values to zero', () => {
    expect(formatSeconds(-10)).toBe('00:00');
  });

  it('floors fractional seconds', () => {
    expect(formatSeconds(9.9)).toBe('00:09');
  });
});
