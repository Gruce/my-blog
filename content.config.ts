import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      // Define custom schema for docs collection
      schema: z.object({
        tags: z.array(z.string()),
        image: z.string(),
        date: z.date(),
        category: z.enum(['tech', 'design', 'events']).optional().default('tech'),
        description: z.string().optional(),
        author: z.string().optional().default('Hassan K. Al-Khalidi'),
        authorAlternateNames: z.array(z.string()).optional().default(['Hassan Alkhalidi', 'حسن الخالدي', 'حسن', 'حسن خالد', 'gruce', 'gruceing'])
      })
    })
  }
})
