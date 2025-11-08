/**
 * Shared types for blog content organization
 * Categories are defined in constants/blog-categories.ts (single source of truth)
 */

// Re-export from single source of truth
export type { BlogCategory } from '../../constants/blog-categories'
export { BLOG_CATEGORIES, BLOG_CATEGORY_TITLES, BLOG_CATEGORY_NAMES } from '../../constants/blog-categories'

export type BlogCategoryKey = BlogCategory

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

