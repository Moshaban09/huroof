import { describe, expect, it } from 'vitest';
import { tafgeet } from './tafgeet';

describe('Number Utilities: Tafgeet', () => {
  it('handles zero', () => {
    expect(tafgeet(0)).toBe('صفر');
  });

  it('handles single digits', () => {
    expect(tafgeet(1)).toBe('واحد');
    expect(tafgeet(5)).toBe('خمسة');
  });

  it('handles teens', () => {
    expect(tafgeet(11)).toBe('أحد عشر');
    expect(tafgeet(15)).toBe('خمسة عشر');
  });

  it('handles tens', () => {
    expect(tafgeet(20)).toBe('عشرون');
    expect(tafgeet(21)).toBe('واحد وعشرون');
  });

  it('handles hundreds', () => {
    expect(tafgeet(100)).toBe('مائة');
    expect(tafgeet(200)).toBe('مائتان');
    expect(tafgeet(150)).toBe('مائة وخمسون');
  });

  it('handles thousands', () => {
    expect(tafgeet(1000)).toBe('ألف');
    expect(tafgeet(2000)).toBe('ألفان');
    expect(tafgeet(3000)).toBe('ثلاثة آلاف');
    expect(tafgeet(15000)).toBe('خمسة عشر ألفًا');
  });

  it('handles complex numbers', () => {
    expect(tafgeet(1234)).toBe('ألف ومائتان وأربعة وثلاثون');
    expect(tafgeet(1000000)).toBe('مليون');
  });

  it('handles negative numbers', () => {
    expect(tafgeet(-50)).toBe('سالب خمسون');
  });

  it('rejects non-numeric strings', () => {
    expect(() => tafgeet('12abc')).toThrow('tafgeet expects a numeric string');
  });

  it('rejects decimal numbers', () => {
    expect(() => tafgeet(12.3)).toThrow('tafgeet expects an integer value');
  });

  it('rejects NaN', () => {
    expect(() => tafgeet(Number.NaN)).toThrow('tafgeet expects a finite number');
  });

  it('rejects Infinity', () => {
    expect(() => tafgeet(Number.POSITIVE_INFINITY)).toThrow('tafgeet expects a finite number');
  });

  it('supports large integer values within range', () => {
    expect(tafgeet(1000000000000)).toBe('تريليون');
  });
});
