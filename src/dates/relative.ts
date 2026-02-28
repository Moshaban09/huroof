import { toArabicDigits } from '../numbers/digits';

function pluralizeEnglish(value: number, unit: string): string {
  return value === 1 ? unit : `${unit}s`;
}

function formatArabicRelative(prefix: 'منذ' | 'بعد', value: number, unit: string): string {
  return `${prefix} ${toArabicDigits(value)} ${unit}`;
}

/**
 * Calculates relative time (e.g. "since 5 minutes", "منذ ٥ دقائق").
 */
export function relativeTime(date: Date | string | number, locale: 'ar' | 'en' = 'ar'): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  const isFuture = diffMs > 0;
  const absoluteSeconds = Math.floor(Math.abs(diffMs) / 1000);

  if (absoluteSeconds < 60) {
    if (!isFuture) {
      return locale === 'ar' ? 'منذ لحظات' : 'just now';
    }

    if (locale === 'ar') {
      return formatArabicRelative('بعد', absoluteSeconds, 'ثانية');
    }

    return `in ${absoluteSeconds} ${pluralizeEnglish(absoluteSeconds, 'second')}`;
  }

  const minutes = Math.floor(absoluteSeconds / 60);
  if (minutes < 60) {
    if (locale === 'ar') {
      return formatArabicRelative(isFuture ? 'بعد' : 'منذ', minutes, 'دقيقة');
    }

    return isFuture
      ? `in ${minutes} ${pluralizeEnglish(minutes, 'minute')}`
      : `${minutes} ${pluralizeEnglish(minutes, 'minute')} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    if (locale === 'ar') {
      return formatArabicRelative(isFuture ? 'بعد' : 'منذ', hours, 'ساعة');
    }

    return isFuture
      ? `in ${hours} ${pluralizeEnglish(hours, 'hour')}`
      : `${hours} ${pluralizeEnglish(hours, 'hour')} ago`;
  }

  const days = Math.floor(hours / 24);
  if (locale === 'ar') {
    return formatArabicRelative(isFuture ? 'بعد' : 'منذ', days, 'يوم');
  }

  return isFuture
    ? `in ${days} ${pluralizeEnglish(days, 'day')}`
    : `${days} ${pluralizeEnglish(days, 'day')} ago`;
}
