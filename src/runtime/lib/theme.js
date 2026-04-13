/**
 * @typedef {{ text: string; href: string }} ThemeLink
 * @typedef {{
 *   home: string;
 *   blog: string;
 *   tags: string;
 *   links: string;
 *   backToTop: string;
 *   toggleTheme: string;
 *   paginationPrev: string;
 *   paginationNext: string;
 *   paginationPage: string;
 *   paginationOf: string;
 *   tagsHeading: string;
 *   postsTaggedWith: string;
 *   tableOfContents: string;
 *   copyCode: string;
 *   copiedCode: string;
 * }} ThemeLabels
 * @typedef {{
 *   title: string;
 *   description: string;
 *   lang: string;
 *   author: string;
 *   ogImage: string;
 *   postsPerPage: number;
 *   home: {
 *     headline: string;
 *     intro: string;
 *     links: ThemeLink[];
 *   };
 *   labels: ThemeLabels;
 * }} ThemeConfig
 * @typedef {import('astro:content').CollectionEntry<'blog'>} BlogEntry
 */

/** @type {ThemeConfig} */
const themeConfig = __LLUVIAME_THEME_CONFIG__;

export { themeConfig };

export function createPageTitle(value) {
  if (!value) return themeConfig.title;
  return `${value} | ${themeConfig.title}`;
}

/** @param {BlogEntry[]} posts */
export function sortPosts(posts) {
  return posts.slice().sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** @param {BlogEntry[]} posts */
export function getPublishedPosts(posts) {
  return sortPosts(posts.filter((post) => post.data.draft !== true));
}

export function isExternalLink(href) {
  return /^https?:\/\//.test(href);
}
