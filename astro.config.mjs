import { defineConfig } from 'astro/config';
import lluviame from './index.js';

export default defineConfig({
  site: 'https://lluviame.example.com',
  integrations: [
    lluviame({
      title: 'LluviAmE',
      description: 'A minimalist Astro blog theme.',
      lang: 'zh-CN',
      author: 'yuXIw',
      home: {
        headline: "Hello, I'm LluviAmE.",
        intro: 'Welcome to my minimalistic space. I write about code, design, and life.',
        links: [
          { text: 'GitHub', href: 'https://github.com/yuXI-fuwafuwa' },
          { text: 'X', href: 'https://x.com' },
        ],
      },
    }),
  ],
});
