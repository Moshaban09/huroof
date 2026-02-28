import { describe, expect, it } from 'vitest';
import { toArabicDigits, toEnglishDigits } from './digits';

describe('Number Utilities: Digits', () => {
  describe('toArabicDigits', () => {
    it('converts number 123 to ١٢٣', () => {
      expect(toArabicDigits(123)).toBe('١٢٣');
    });

    it('converts string "123" to "١٢٣"', () => {
      expect(toArabicDigits('123')).toBe('١٢٣');
    });

    it('keeps non-digit characters intact', () => {
      expect(toArabicDigits('Order #456')).toBe('Order #٤٥٦');
    });

    it('handles mixed content', () => {
      expect(toArabicDigits('User 1: 50% off')).toBe('User ١: ٥٠% off');
    });
  });

  describe('toEnglishDigits', () => {
    it('converts "١٢٣" to "123"', () => {
      expect(toEnglishDigits('١٢٣')).toBe('123');
    });

    it('handles mixed content', () => {
      expect(toEnglishDigits('السعر: ٥٠ ريال')).toBe('السعر: 50 ريال');
    });

    it('keeps English digits intact', () => {
      expect(toEnglishDigits('123')).toBe('123');
    });
  });
});
