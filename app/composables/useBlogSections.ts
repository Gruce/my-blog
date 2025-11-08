import { computed, type Ref, type ComputedRef } from 'vue'
import type { BlogCategory, PostItem, SeriesGroup, Group } from './types'
import { BLOG_CATEGORIES, BLOG_CATEGORY_TITLES, BLOG_CATEGORY_NAMES } from './types'

/**
 * Extract series folder from path
 * Handles multiple cases:
 * - /design/design-science-series/article -> design-science-series
 * - /design-science-series/article -> design-science-series
 * - /blog/design/design-science-series/article -> design-science-series
 */
function getSeriesFolderFromPath(path: string): string | null {
  if (!path) return null
  
  // Remove leading/trailing slashes and split
  const parts = path.replace(/^\/|\/$/g, '').split('/').filter(p => p.length > 0)
  
  // Skip 'blog' prefix if present
  const startIndex = parts[0] === 'blog' ? 1 : 0
  const relevantParts = parts.slice(startIndex)
  
  // If we have 3+ parts after removing 'blog': category/folder/article
  if (relevantParts.length > 2 && relevantParts[1]) {
    return relevantParts[1] // Return the folder name
  }
  
  // If we have 2 parts and first part looks like a series folder (contains hyphens)
  // This handles cases where Nuxt Content strips the category from the path
  if (relevantParts.length === 2 && relevantParts[0] && relevantParts[0].includes('-')) {
    // Check if it's not a category name (use single source of truth)
    if (!BLOG_CATEGORY_NAMES.includes(relevantParts[0])) {
      return relevantParts[0] // Return the folder name
    }
  }
  
  return null
}

/**
 * Get series name from folder name
 * Converts folder name to readable series name
 * e.g., "design-science-series" -> "Design Science Series"
 * 
 * Note: Could be enhanced to read from _dir.yml in the future
 */
function getSeriesNameFromFolder(folderName: string): string {
  // Convert folder name to readable series name
  // e.g., "design-science-series" -> "Design Science Series"
  return folderName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Shared composable for organizing blog posts into sections and series groups
 * Now supports folder-based series detection
 */
export function useBlogSections(
  posts: Ref<PostItem[] | undefined> | ComputedRef<PostItem[]>
) {
  const sections = computed(() => {
    const groups: Record<BlogCategory, Group> = {
      tech: { key: 'tech', title: BLOG_CATEGORY_TITLES.tech, items: [] },
      design: { key: 'design', title: BLOG_CATEGORY_TITLES.design, items: [] },
      events: { key: 'events', title: BLOG_CATEGORY_TITLES.events, items: [] },
      startup: { key: 'startup', title: BLOG_CATEGORY_TITLES.startup, items: [] },
      'dudes-studio': { key: 'dudes-studio', title: BLOG_CATEGORY_TITLES['dudes-studio'], items: [] }
    }

    // Group posts by category and series (from folder structure or series field)
    const postsList = Array.isArray(posts.value) ? posts.value : []
    for (const post of postsList) {
      const key = (post.category ?? 'tech') as BlogCategory

      // Use series from post (already detected in the mapping)
      // If not set, try to detect from path as fallback
      let seriesName: string | null = post.series || null
      
      // Fallback: If no explicit series, try to detect from path
      if (!seriesName && post.path) {
        const seriesFolder = getSeriesFolderFromPath(post.path)
        
        // Prevent series folder from matching category key (e.g., "design" folder in "design" category)
        if (seriesFolder && seriesFolder === key) {
          // This is likely a false positive, treat as standalone post
          groups[key].items.push(post)
          continue
        }
        
        if (seriesFolder) {
          seriesName = getSeriesNameFromFolder(seriesFolder)
        }
      }

      if (seriesName) {
        // Find or create series group
        const existingSeriesIndex = groups[key].items.findIndex(
          (item): item is SeriesGroup =>
            typeof item === 'object' && 'seriesName' in item && item.seriesName === seriesName
        )

        if (existingSeriesIndex >= 0) {
          const seriesGroup = groups[key].items[existingSeriesIndex] as SeriesGroup
          seriesGroup.items.push(post)
          // Sort by seriesOrder, then by date
          seriesGroup.items.sort((a, b) => {
            if (a.seriesOrder !== undefined && b.seriesOrder !== undefined) {
              return a.seriesOrder - b.seriesOrder
            }
            if (a.seriesOrder !== undefined) return -1
            if (b.seriesOrder !== undefined) return 1
            return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
          })
        } else {
          groups[key].items.push({
            seriesName: seriesName,
            items: [post],
            isExpanded: false
          })
        }
      } else {
        // Non-series post, add directly
        groups[key].items.push(post)
      }
    }

    // Sort items: series groups first (by first item date), then individual posts
    for (const key of BLOG_CATEGORIES) {
      groups[key].items.sort((a, b) => {
        const aIsSeries = typeof a === 'object' && 'seriesName' in a
        const bIsSeries = typeof b === 'object' && 'seriesName' in b

        if (aIsSeries && !bIsSeries) return -1
        if (!aIsSeries && bIsSeries) return 1

        const aDate = aIsSeries
          ? (a as SeriesGroup).items[0]?.date
          : (a as PostItem).date
        const bDate = bIsSeries
          ? (b as SeriesGroup).items[0]?.date
          : (b as PostItem).date

        return new Date(bDate || 0).getTime() - new Date(aDate || 0).getTime()
      })
    }

    return BLOG_CATEGORIES
      .map(k => groups[k])
      .filter((g) => g.items.length > 0)
  })

  return {
    sections
  }
}

