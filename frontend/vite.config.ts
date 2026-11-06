import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()] as any,
  server: {
    host: '127.0.0.1',
    port: 3000,
    strictPort: true,
  },
  test: {
    environment: 'node',
    css: false,
    globals: true,
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**'],
  },
})
