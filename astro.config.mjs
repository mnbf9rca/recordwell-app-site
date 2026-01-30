// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync } from 'fs';

const siteConfig = JSON.parse(readFileSync('./site.config.json', 'utf-8'));

export default defineConfig({
  site: 'https://recordwell.app',
  vite: {
    define: {
      'import.meta.env.THEME': JSON.stringify(siteConfig.theme)
    }
  }
});
