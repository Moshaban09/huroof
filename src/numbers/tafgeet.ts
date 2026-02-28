/**
 * Arabic Number to Text Converter (Tafgeet)
 * Handles numbers up to Trillions.
 */

const ONES = [
  '', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة'
];

const TEENS = [
  'عشرة', 'أحد عشر', 'اثنا عشر', 'ثلاثة عشر', 'أربعة عشر', 'خمسة عشر',
  'ستة عشر', 'سبعة عشر', 'ثمانية عشر', 'تسعة عشر'
];

const TENS = [
  '', 'عشرة', 'عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'
];

const HUNDREDS = [
  '', 'مائة', 'مائتان', 'ثلاثمائة', 'أربعمائة', 'خمسمائة', 'ستمائة', 'سبعمائة', 'ثمانمائة', 'تسعمائة'
];

const THOUSANDS = [
  '', 'ألف', 'ألفان', 'آلاف', 'ألفًا'
];

const MILLIONS = [
  '', 'مليون', 'مليونان', 'ملايين', 'مليونًا'
];

const BILLIONS = [
  '', 'مليار', 'ملياران', 'مليارات', 'مليارًا'
];

const TRILLIONS = [
  '', 'تريليون', 'تريليونان', 'تريليونات', 'تريليونًا'
];

function normalizeInput(value: number | string): number {
  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (!/^[+-]?\d+$/.test(trimmed)) {
      throw new Error('tafgeet expects a numeric string');
    }

    const parsed = Number(trimmed);

    if (!Number.isSafeInteger(parsed)) {
      throw new Error('tafgeet expects a safe integer value');
    }

    return parsed;
  }

  if (!Number.isFinite(value)) {
    throw new Error('tafgeet expects a finite number');
  }

  if (!Number.isInteger(value)) {
    throw new Error('tafgeet expects an integer value');
  }

  if (!Number.isSafeInteger(value)) {
    throw new Error('tafgeet expects a safe integer value');
  }

  return value;
}

/**
 * Converts a segment of up to 3 digits (0-999) into Arabic text.
 */
function convertThreeDigits(n: number): string {
  if (n === 0) return '';

  const hundreds = Math.floor(n / 100);
  const remainder = n % 100;
  const ones = remainder % 10;
  const tens = Math.floor(remainder / 10);

  const parts: string[] = [];

  if (hundreds > 0) {
    parts.push(HUNDREDS[hundreds] || '');
  }

  if (remainder > 0) {
    if (remainder < 10) {
      parts.push(ONES[remainder] || '');
    } else if (remainder >= 11 && remainder <= 19) {
      parts.push(TEENS[remainder - 10] || '');
    } else {
      if (ones > 0) parts.push(ONES[ones] || '');
      if (tens > 0) parts.push(TENS[tens] || '');
    }
  }

  return parts.join(' و');
}

/**
 * Converts a number to Arabic text.
 * @param number The number to convert.
 * @returns Arabic text representation.
 */
export function tafgeet(number: number | string): string {
  const num = normalizeInput(number);

  if (num === 0) return 'صفر';

  if (num < 0) return `سالب ${tafgeet(Math.abs(num))}`;

  const segments: { value: number; suffix: string[] }[] = [
    { value: 1000000000000, suffix: TRILLIONS },
    { value: 1000000000, suffix: BILLIONS },
    { value: 1000000, suffix: MILLIONS },
    { value: 1000, suffix: THOUSANDS },
    { value: 1, suffix: [] }
  ];

  let remaining = num;
  const parts: string[] = [];

  for (const segment of segments) {
    const count = Math.floor(remaining / segment.value);

    if (count > 0) {
      if (segment.value === 1) {
        parts.push(convertThreeDigits(count));
      } else if (count === 1) {
        parts.push(segment.suffix[1] || '');
      } else if (count === 2) {
        parts.push(segment.suffix[2] || '');
      } else if (count >= 3 && count <= 10) {
        parts.push(`${convertThreeDigits(count)} ${segment.suffix[3] || ''}`);
      } else {
        parts.push(`${convertThreeDigits(count)} ${segment.suffix[4] || ''}`);
      }

      remaining %= segment.value;
    }
  }

  return parts.filter(Boolean).join(' و');
}
