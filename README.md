# Huroof (حروف)

Huroof is a lightweight, zero-dependency TypeScript library for Arabic numbers and dates.

مكتبة خفيفة لتنسيق الأرقام والتواريخ العربية بدون أي اعتماديات خارجية.

## Features (EN)

- Arabic and English digit conversion
- Tafgeet: number to Arabic words
- Currency formatting
- Hijri date conversion (tabular)
- Relative time in Arabic
- Tree-shakeable exports

## المميزات (AR)

- تحويل الأرقام بين العربية والإنجليزية
- التفقيط: تحويل الرقم إلى كلمات عربية
- تنسيق العملات
- تحويل التاريخ الهجري (حسابي/جدولي)
- الوقت النسبي بالعربية
- قابلية فصل الاستيرادات (Tree-shakeable)

## Installation / التثبيت

```bash
npm install huroof
# or
pnpm add huroof
# or
yarn add huroof
```

## Quick Start / بداية سريعة

```ts
import { toArabicDigits, toEnglishDigits, tafgeet, formatCurrency } from 'huroof';
import { toHijri, formatDate, relativeTime } from 'huroof';

toArabicDigits(2024); // "٢٠٢٤"
toEnglishDigits("٢٠٢٤"); // "2024"

tafgeet(1250); // "ألف ومائتان وخمسون"

formatCurrency(150, { currency: 'SAR' }); // "١٥٠.٠٠ ر.س"
formatCurrency(100, { currency: 'USD', useArabicDigits: false }); // "100.00 $"

const date = new Date('2024-03-15');
toHijri(date); // { year: 1445, month: 9, day: 5 }
formatDate(date, { calendar: 'hijri' }); // "٥ رمضان ١٤٤٥"
relativeTime(new Date(Date.now() - 1000 * 60 * 5)); // "منذ ٥ دقائق"
```

## Usage Examples

### Example: Arabic digits in UI

```ts
import { toArabicDigits } from 'huroof';

const total = toArabicDigits(12345); // "١٢٣٤٥"
```

### Example: English digits output

```ts
import { toEnglishDigits } from 'huroof';

toEnglishDigits("٣٠١"); // "301"
```

### Example: Currency formatting

```ts
import { formatCurrency } from 'huroof';

formatCurrency(250, { currency: 'SAR' }); // "٢٥٠.٠٠ ر.س"
formatCurrency(99.99, { currency: 'USD', useArabicDigits: false }); // "99.99 $"
```

### Example: Hijri conversion + formatting

```ts
import { toHijri, formatDate } from 'huroof';

const date = new Date('2024-03-15');
toHijri(date); // { year: 1445, month: 9, day: 5 }
formatDate(date, { calendar: 'hijri' }); // "٥ رمضان ١٤٤٥"
```

### Example: Relative time

```ts
import { relativeTime } from 'huroof';

relativeTime(new Date(Date.now() - 1000 * 60 * 5)); // "منذ ٥ دقائق"
```

### Example: Tafgeet

```ts
import { tafgeet } from 'huroof';

tafgeet(1250); // "ألف ومائتان وخمسون"
```

## API Reference

### Numbers
- `toArabicDigits(value: string | number): string`
- `toEnglishDigits(value: string | number): string`
- `tafgeet(value: number): string`
- `formatCurrency(value: number, options): string`

### Dates
- `toHijri(date: Date): { year: number; month: number; day: number }`
- `formatDate(date: Date, options): string`
- `relativeTime(date: Date): string`

## Build and Test / البناء والاختبار

```bash
npm run test
npm run build
```

## License

MIT
