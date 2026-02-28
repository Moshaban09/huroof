import { describe, expect, it } from 'vitest';
import { formatHijri, toHijri } from './hijri';

describe('Date Utilities: Hijri', () => {
  it('converts known Gregorian fixtures to exact Hijri dates', () => {
    expect(toHijri('2023-03-23T00:00:00.000Z')).toEqual({
      year: 1444,
      month: 9,
      day: 1,
    });

    expect(toHijri('2024-03-15T00:00:00.000Z')).toEqual({
      year: 1445,
      month: 9,
      day: 5,
    });

    expect(toHijri('2026-02-06T00:00:00.000Z')).toEqual({
      year: 1447,
      month: 8,
      day: 18,
    });
  });

  it('produces identical Hijri output for the same ISO input across timezones', () => {
    const originalTz = process.env.TZ;
    const iso = '2024-03-15T00:00:00.000Z';

    try {
      process.env.TZ = 'UTC';
      const utcResult = toHijri(iso);

      process.env.TZ = 'America/New_York';
      const newYorkResult = toHijri(iso);

      expect(newYorkResult).toEqual(utcResult);
      expect(utcResult).toEqual({
        year: 1445,
        month: 9,
        day: 5,
      });
    } finally {
      if (originalTz === undefined) {
        delete process.env.TZ;
      } else {
        process.env.TZ = originalTz;
      }
    }
  });

  it('formats hijri date', () => {
     const h = { year: 1445, month: 9, day: 1 };
     expect(formatHijri(h)).toBe('1 رمضان 1445');
  });
});
