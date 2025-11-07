import { computed, type Ref, type ComputedRef } from 'vue'
import type { BlogCategory, PostItem, SeriesGroup, Group } from './types'
import { BLOG_CATEGORIES, BLOG_CATEGORY_TITLES } from './types'

/**
 * Shared composable for organizing blog posts into sections and series groups
 */
export function useBlogSections(
  posts: Ref<PostItem[] | undefined> | ComputedRef<PostItem[]>
) {
  const sections = computed(() => {
    const groups: Record<BlogCategory, Group> = {
      tech: { key: 'tech', title: BLOG_CATEGORY_TITLES.tech, items: [] },
      design: { key: 'design', title: BLOG_CATEGORY_TITLES.design, items: [] },
      events: { key: 'events', title: BLOG_CATEGORY_TITLES.events, items: [] },
      startup: { key: 'startup', title: BLOG_CATEGORY_TITLES.startup, items: [] }
    }

    // Group posts by category and series
    const postsList = Array.isArray(posts.value) ? posts.value : []
    for (const post of postsList) {
      const key = (post.category ?? 'tech') as BlogCategory

      if (post.series) {
        // Find or create series group
        const existingSeriesIndex = groups[key].items.findIndex(
          (item): item is SeriesGroup =>
            typeof item === 'object' && 'seriesName' in item && item.seriesName === post.series
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
            seriesName: post.series,
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

