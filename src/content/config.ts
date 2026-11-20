import { defineCollection, z } from 'astro:content';

const tutorials = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(['PC Ports', 'Modding', 'Software', 'AI']),
    subcategory: z.string(),
    platform: z.string(),
    readingTime: z.string(),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
    projectUrl: z.string().optional(),
    order: z.number().default(100),
  }),
});

export const collections = { tutorials };
