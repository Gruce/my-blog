/**
 * Single source of truth for blog categories
 * This file is imported by both app code and config files
 */

export const BLOG_CATEGORIES = ['startup', 'tech', 'design', 'events', 'dudes-studio'] as const

export type BlogCategory = typeof BLOG_CATEGORIES[number]

export const BLOG_CATEGORY_TITLES: Record<BlogCategory, string> = {
  tech: 'Engineering',
  design: 'Design',
  events: 'Events & Workshops',
  startup: 'Startups',
  'dudes-studio': 'DUDES Studio'
} as const

/**
 * Get category names as a string array for path detection
 * Single source of truth for category names
 */
export const BLOG_CATEGORY_NAMES = BLOG_CATEGORIES as readonly string[]

