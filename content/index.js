import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export function blogSchema({ image }) {
  return z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    image: image().optional(),
  });
}

export function blogCollection(options = {}) {
  const {
    pattern = '**/*.{md,mdx}',
    base = './src/content/blog',
  } = options;

  return defineCollection({
    loader: glob({ pattern, base }),
    schema: blogSchema,
  });
}
