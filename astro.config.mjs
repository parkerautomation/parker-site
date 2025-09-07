// @ts-check
import { defineConfig } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// TODO: set `site` and optional `base` before deployment
// For GitHub Pages: site: 'https://parkerautomation.github.io/parker-site', base: '/parker-site/'
// For custom domain: site: 'https://<custom-domain>' with no base
export default defineConfig({
  integrations: [
    alpinejs()
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});