import { describe, expect, it } from 'vitest';
import { formatDate } from './formatter';
import { relativeTime } from './relative';

describe('Date Utilities: Formatter', () => {
  const sampleDate = new Date('2024-05-15T12:00:00.000Z');

  it('formats human readable (Arabic Default)', () => {
    expect(formatDate(sampleDate)).toBe('١٥ مايو ٢٠٢٤');
  });

  it('formats YYYY-MM-DD', () => {
    expect(formatDate(sampleDate, { format: 'YYYY-MM-DD', useArabicDigits: false })).toBe('2024-05-15');
  });

  it('formats Hijri', () => {
    expect(formatDate(sampleDate, { calendar: 'hijri' })).toBe('٧ ذو القعدة ١٤٤٥');
  });
});

describe('Date Utilities: Relative', () => {
  it('handles "just now"', () => {
    const now = new Date();
    expect(relativeTime(now)).toBe('منذ لحظات');
  });

  it('handles minutes ago', () => {
    const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
    expect(relativeTime(fiveMinsAgo)).toBe('منذ ٥ دقيقة');
  });

  it('handles future seconds', () => {
    const inThirtySeconds = new Date(Date.now() + 30 * 1000);
    expect(relativeTime(inThirtySeconds, 'en')).toBe('in 30 seconds');
  });

  it('handles future minutes', () => {
    const inFiveMinutes = new Date(Date.now() + 5 * 60 * 1000);
    expect(relativeTime(inFiveMinutes)).toBe('بعد ٥ دقيقة');
  });

  it('handles future hours', () => {
    const inTwoHours = new Date(Date.now() + 2 * 60 * 60 * 1000);
    expect(relativeTime(inTwoHours, 'en')).toBe('in 2 hours');
  });

  it('handles future days', () => {
    const inThreeDays = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    expect(relativeTime(inThreeDays)).toBe('بعد ٣ يوم');
  });
});
