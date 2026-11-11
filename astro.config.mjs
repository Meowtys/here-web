import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://youre-here.vercel.app',
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  image: {
    service: passthroughImageService(),
  },
  build: {
    format: 'directory',
  },
});
