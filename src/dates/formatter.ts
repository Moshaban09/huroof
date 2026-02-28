import { toArabicDigits } from '../numbers/digits';
import { formatHijri, toHijri } from './hijri';

export interface DateFormatOptions {
  /**
   * The locale for formatting names (months/days).
   * Default: 'ar'
   */
  locale?: 'ar' | 'en';
  /**
   * Whether to use Arabic numerals.
   * Default: true (if locale is ar)
   */
  useArabicDigits?: boolean;
  /**
   * Format pattern (simple implementation).
   * Supported: 'YYYY-MM-DD', 'DD/MM/YYYY', 'human'
   */
  format?: 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'human';
  /**
   * Calendar system.
   * Default: 'gregorian'
   */
  calendar?: 'gregorian' | 'hijri';
}

const AR_MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

const EN_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Formats a date.
 */
export function formatDate(date: Date | string | number, options: DateFormatOptions = {}): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid Date';

  const {
     locale = 'ar',
     calendar = 'gregorian',
     format = 'human'
  } = options;

  const useArabicDigitsOption = options.useArabicDigits ?? (locale === 'ar');

  if (calendar === 'hijri') {
      const hDate = toHijri(d);
      // Basic Hijri Formatting
      const str = formatHijri(hDate);
      // If user wants Ar numerals
      if (useArabicDigitsOption) return toArabicDigits(str);
      return str;
  }

  // Gregorian Logic
  const day = d.getDate();
  const year = d.getFullYear();
  const monthIdx = d.getMonth();

  let formatted = '';

  if (format === 'human') {
      const monthName = locale === 'ar' ? AR_MONTHS[monthIdx] : EN_MONTHS[monthIdx];
      formatted = `${day} ${monthName} ${year}`;
  } else if (format === 'YYYY-MM-DD') {
      const m = (monthIdx + 1).toString().padStart(2, '0');
      const dd = day.toString().padStart(2, '0');
      formatted = `${year}-${m}-${dd}`;
  } else if (format === 'DD/MM/YYYY') {
      const m = (monthIdx + 1).toString().padStart(2, '0');
      const dd = day.toString().padStart(2, '0');
      formatted = `${dd}/${m}/${year}`;
  }

  if (useArabicDigitsOption) {
      return toArabicDigits(formatted);
  }

  return formatted;
}
