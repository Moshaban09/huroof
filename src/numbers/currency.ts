import { toArabicDigits } from './digits';

interface CurrencyOptions {
  /**
   * The currency code (ISO 4217).
   * Default: 'SAR'
   */
  currency?: 'SAR' | 'EGP' | 'AED' | 'QAR' | 'KWD' | 'BHD' | 'OMR' | 'JOD' | 'USD' | 'EUR' | string;
  /**
   * Whether to use Arabic numerals (١٢٣) or English numerals (123).
   * Default: true
   */
  useArabicDigits?: boolean;
  /**
   * Whether to show the currency symbol/name.
   * Default: true
   */
  showSymbol?: boolean;
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  SAR: 'ر.س',
  EGP: 'ج.م',
  AED: 'د.إ',
  QAR: 'ر.ق',
  KWD: 'د.ك',
  BHD: 'د.ب',
  OMR: 'ر.ع',
  JOD: 'د.أ',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

function getCurrencyFractionDigits(currency: string): number {
  try {
    const fractionDigits = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).resolvedOptions().maximumFractionDigits;

    return fractionDigits ?? 2;
  } catch {
    return 2;
  }
}

/**
 * Formats a number as a currency string.
 * @param amount The amount to format.
 * @param options Configuration options.
 * @returns Formatted currency string.
 */
export function formatCurrency(amount: number, options: CurrencyOptions = {}): string {
  const {
    currency = 'SAR',
    useArabicDigits = true,
    showSymbol = true,
  } = options;

  const fractionDigits = getCurrencyFractionDigits(currency);

  let formattedAmount = amount.toLocaleString('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

  if (useArabicDigits) {
    formattedAmount = toArabicDigits(formattedAmount);
  }

  if (!showSymbol) {
    return formattedAmount;
  }

  const symbol = CURRENCY_SYMBOLS[currency] || currency;

  return `${formattedAmount} ${symbol}`;
}
