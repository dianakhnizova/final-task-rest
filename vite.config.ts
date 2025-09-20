import { reactRouter } from '@react-router/dev/vite';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [!process.env.VITEST && reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
      '@routes': path.resolve(__dirname, './.react-router/types/app/routes/'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      include: ['app/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'app/**/*.test.{js,jsx,ts,tsx}',
        'app/**/*.spec.{js,jsx,ts,tsx}',
        'app/index.{js,jsx,ts,tsx}',
        'app/setupTests.{js,ts}',
        'app/**/*.d.ts',
      ],
      reporter: ['text', 'json', 'html'],
      thresholds: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },
  },
});
