/**
 * Hijri Date Conversion Utility
 * Uses the approximate tabular algorithm for conversion.
 */

export interface HijriDate {
  year: number;
  month: number;
  day: number;
}

const HIJRI_MONTHS = [
  'محرم',
  'صفر',
  'ربيع الأول',
  'ربيع الآخر',
  'جمادى الأولى',
  'جمادى الآخرة',
  'رجب',
  'شعبان',
  'رمضان',
  'شوال',
  'ذو القعدة',
  'ذو الحجة'
];

/**
 * Converts a Gregorian Date to Hijri.
 * Based on the tabular Islamic calendar algorithm.
 * @param date The Gregorian date.
 * @returns HijriDate object { year, month, day }
 */
export function toHijri(date: Date | string | number): HijriDate {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    throw new Error('Invalid Date');
  }

  const day = d.getUTCDate();
  const month = d.getUTCMonth(); // 0-11
  const year = d.getUTCFullYear();

  let m = month + 1;
  let y = year;

  if (m < 3) {
    y -= 1;
    m += 12;
  }

  const a = Math.floor(y / 100);
  let b = 2 - a + Math.floor(a / 4);

  if (y < 1583) b = 0;
  if (y === 1582) {
    if (m > 10) b = -10;
    if (m === 10) {
      b = 0;
      if (day > 4) b = -10;
    }
  }

  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;

  // Hijri Calculation based on JD
  // Optimization: Use tabular mean (approximate but standard for non-observational)
  // Epoch: July 16, 622 AD = JD 1948439.5

  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l1 = l - 10631 * n + 354;
  const j1 = (Math.floor((10985 - l1) / 5316)) * (Math.floor((50 * l1) / 17719)) + (Math.floor(l1 / 5670)) * (Math.floor((43 * l1) / 15238));
  const l2 = l1 - (Math.floor((30 - j1) / 15)) * (Math.floor((17719 * j1) / 50)) - (Math.floor(j1 / 16)) * (Math.floor((15238 * j1) / 43)) + 29;

  const m1 = Math.floor((24 * l2) / 709);
  const d1 = l2 - Math.floor((709 * m1) / 24);
  const y1 = 30 * n + j1 - 30;

  return {
    year: y1,
    month: m1, // 1-12
    day: d1
  };
}

/**
 * Formats a Hijri date into a string.
 * @param date HijriDate object
 * @param format Pattern (currently simple string concat)
 */
export function formatHijri(hijri: HijriDate): string {
  // Simple default formatter: D Month YYYY
  // 1 Ramadan 1445
  return `${hijri.day} ${HIJRI_MONTHS[hijri.month - 1]} ${hijri.year}`;
}
