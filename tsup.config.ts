import { defineConfig } from 'tsup';

const entry = ['src/index.ts', 'src/numbers/index.ts', 'src/dates/index.ts'];

export default defineConfig([
  {
    entry,
    format: ['esm'],
    dts: true,
    splitting: true,
    clean: true,
    minify: true,
    outDir: 'dist',
    target: 'es2022',
    outExtension() {
      return { js: '.js' };
    },
  },
  {
    entry,
    format: ['cjs'],
    splitting: false,
    clean: false,
    minify: true,
    outDir: 'dist',
    target: 'es2022',
    outExtension() {
      return { js: '.cjs' };
    },
  },
]);
