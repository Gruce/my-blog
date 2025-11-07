/**
 * Shared types for blog content organization
 */

export type BlogCategory = 'tech' | 'design' | 'events' | 'startup'

export type BlogCategoryKey = BlogCategory

export const BLOG_CATEGORIES: BlogCategory[] = ['startup', 'tech', 'design', 'events'] as const

export const BLOG_CATEGORY_TITLES: Record<BlogCategory, string> = {
  tech: 'Engineering',
  design: 'Design',
  events: 'Events & Workshops',
  startup: 'Startups'
} as const

export type PostItem = {
  id: string
  path: string
  title: string
  date?: string | Date
  category?: BlogCategory
  series?: string
  seriesOrder?: number
}

export type SeriesGroup = {
  seriesName: string
  items: PostItem[]
  isExpanded: boolean
}

export type Group = {
  key: BlogCategoryKey
  title: string
  items: (PostItem | SeriesGroup)[]
}

