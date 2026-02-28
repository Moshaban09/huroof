import { describe, expect, it } from 'vitest';
import { formatCurrency } from './currency';

describe('Number Utilities: Currency', () => {
  it('formats default currency (SAR/Arabic)', () => {
    expect(formatCurrency(100)).toBe('١٠٠.٠٠ ر.س');
  });

  it('formats EGP', () => {
    expect(formatCurrency(50.5, { currency: 'EGP' })).toBe('٥٠.٥٠ ج.م');
  });

  it('formats USD with English digits', () => {
    expect(formatCurrency(1000, { currency: 'USD', useArabicDigits: false })).toBe('1,000.00 $');
  });

  it('uses three decimal places for KWD', () => {
    expect(formatCurrency(1.234, { currency: 'KWD', useArabicDigits: false })).toBe('1.234 د.ك');
  });

  it('uses three decimal places for BHD', () => {
    expect(formatCurrency(1.2, { currency: 'BHD', useArabicDigits: false })).toBe('1.200 د.ب');
  });

  it('uses three decimal places for OMR', () => {
    expect(formatCurrency(1.2, { currency: 'OMR', useArabicDigits: false })).toBe('1.200 ر.ع');
  });

  it('uses zero decimal places for JPY', () => {
    expect(formatCurrency(1000, { currency: 'JPY', useArabicDigits: false })).toBe('1,000 JPY');
  });

  it('handles custom currencies', () => {
    expect(formatCurrency(123, { currency: 'XYZ' })).toBe('١٢٣.٠٠ XYZ');
  });

  it('hides symbol', () => {
    expect(formatCurrency(100, { showSymbol: false })).toBe('١٠٠.٠٠');
  });
});
