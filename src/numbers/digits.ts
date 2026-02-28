/**
 * Arabic numerals (Eastern Arabic numerals) used in the Arab world.
 * "٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"
 */
const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

/**
 * English numerals (Western Arabic numerals).
 * "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
 */
const ENGLISH_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * Converts English digits (0-9) in a string or number to Arabic digits (٠-٩).
 * @param input The number or string to convert.
 * @returns The string with Arabic formatted digits.
 */
export function toArabicDigits(input: string | number): string {
  const str = String(input);
  return str.replace(/[0-9]/g, (d) => ARABIC_DIGITS[parseInt(d, 10)] || d);
}

/**
 * Converts Arabic digits (٠-٩) in a string to English digits (0-9).
 * Also handles Persian digits if they matches the range (extended implementation possible).
 * @param input The string to convert.
 * @returns The string with English formatted digits.
 */
export function toEnglishDigits(input: string | number): string {
  const str = String(input);
  return str.replace(/[٠-٩]/g, (d) => {
    const index = ARABIC_DIGITS.indexOf(d);
    return index !== -1 ? (ENGLISH_DIGITS[index] || d) : d;
  });
}
