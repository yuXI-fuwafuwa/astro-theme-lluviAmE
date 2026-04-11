import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });
  
  return rss({
    title: 'LluviAmE Blog',
    description: 'A minimalistic Astro blog theme',
    site: context.site || 'https://lluviame.example.com',
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.title, // or post.data.description if you add it
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>zh-cn</language>`,
  });
}