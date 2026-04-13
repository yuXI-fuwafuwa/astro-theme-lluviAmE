import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getPublishedPosts, themeConfig } from '../lib/theme.js';

export async function GET(context) {
  const blog = getPublishedPosts(await getCollection('blog'));

  return rss({
    title: themeConfig.title,
    description: themeConfig.description,
    site: context.site || 'http://localhost:4321',
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ?? post.data.title,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>${themeConfig.lang.toLowerCase()}</language>`,
  });
}
