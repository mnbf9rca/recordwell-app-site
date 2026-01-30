// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://recordwell.app',
  vite: {
    define: {
      'import.meta.env.THEME': JSON.stringify(process.env.THEME || 'light')
    }
  }
});
