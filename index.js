import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';
import * as pagefind from 'pagefind';

const defaultThemeOptions = {
  title: 'LluviAmE',
  description: 'A minimalist Astro blog theme.',
  lang: 'zh-CN',
  author: 'yuXIw',
  ogImage: '/og-image.png',
  postsPerPage: 10,
  home: {
    headline: "Hello, I'm LluviAmE.",
    intro: 'Welcome to my minimalistic space. I write about code, design, and life.',
    links: [
      { text: 'GitHub', href: 'https://github.com' },
      { text: 'Twitter', href: 'https://twitter.com' },
    ],
  },
  labels: {
    home: 'Home',
    blog: 'Blog',
    tags: 'Tags',
    links: 'Links',
    backToTop: 'Top ↑',
    toggleTheme: 'Toggle Theme',
    paginationPrev: 'Prev',
    paginationNext: 'Next',
    paginationPage: 'Page',
    paginationOf: 'of',
    tagsHeading: 'Tags',
    postsTaggedWith: 'Posts tagged with',
    tableOfContents: 'Table of Contents',
    copyCode: 'COPY',
    copiedCode: 'COPIED!',
  },
};

const injectedRoutes = [
  ['/', new URL('./src/runtime/pages/index.astro', import.meta.url)],
  ['/blog/[...page]', new URL('./src/runtime/pages/blog/[...page].astro', import.meta.url)],
  ['/blog/[id]', new URL('./src/runtime/pages/blog/[id].astro', import.meta.url)],
  ['/tags', new URL('./src/runtime/pages/tags/index.astro', import.meta.url)],
  ['/tags/[tag]', new URL('./src/runtime/pages/tags/[tag].astro', import.meta.url)],
  ['/rss.xml', new URL('./src/runtime/pages/rss.xml.js', import.meta.url)],
];

function mergeThemeOptions(options = {}) {
  return {
    ...defaultThemeOptions,
    ...options,
    home: {
      ...defaultThemeOptions.home,
      ...options.home,
      links: options.home?.links ?? defaultThemeOptions.home.links,
    },
    labels: {
      ...defaultThemeOptions.labels,
      ...options.labels,
    },
  };
}

export default function lluviame(options = {}) {
  const themeOptions = mergeThemeOptions(options);

  return {
    name: 'astro-theme-lluviame',
    hooks: {
      'astro:config:setup': ({ injectRoute, updateConfig }) => {
        for (const [pattern, entrypoint] of injectedRoutes) {
          injectRoute({ pattern, entrypoint });
        }

        updateConfig({
          integrations: [sitemap()],
          markdown: {
            shikiConfig: {
              themes: {
                light: 'github-light',
                dark: 'github-dark',
              },
            },
          },
          vite: {
            define: {
              __LLUVIAME_THEME_CONFIG__: JSON.stringify(themeOptions),
            },
          },
        });
      },
      'astro:build:done': async ({ dir, logger }) => {
        const outputPath = fileURLToPath(dir);
        const { index } = await pagefind.createIndex();

        await index.addDirectory({ path: outputPath });
        await index.writeFiles({ outputPath: `${outputPath}/pagefind` });

        logger.info('Generated Pagefind search index.');
      },
    },
  };
}

export { defaultThemeOptions };
