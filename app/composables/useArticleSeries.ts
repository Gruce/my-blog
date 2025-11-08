import { computed, type Ref } from 'vue'

export type SeriesArticle = {
  id: string
  path: string
  title: string
  seriesOrder?: number
  date?: string | Date
}

/**
 * Get series name from path or explicit series field
 * Handles both path formats:
 * - /design/design-science-series/article.md
 * - /design-science-series/article.md
 */
function getSeriesFromPost(post: any): string | null {
  if (post.series) return post.series
  
  // Detect from folder structure
  const pathParts = post.path.replace(/^\/|\/$/g, '').split('/')
  
  // If path has 3+ parts: category/folder/article
  if (pathParts.length > 2 && pathParts[1]) {
    const folderName = pathParts[1]
    return folderName.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  }
  
  // If path has 2 parts and first part looks like a series folder
  if (pathParts.length === 2 && pathParts[0] && pathParts[0].includes('-')) {
    const categoryNames = ['design', 'tech', 'startup', 'events']
    if (!categoryNames.includes(pathParts[0])) {
      const folderName = pathParts[0]
      return folderName.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    }
  }
  
  return null
}

export function useArticleSeries(page: Ref<any>, route: any) {
  const { data: seriesArticles } = useAsyncData<SeriesArticle[]>(
    `series-${route.path}`,
    async () => {
      if (!page.value) return []

      // Get series name from page (explicit or from folder)
      const pageSeries = getSeriesFromPost(page.value)
      if (!pageSeries) return []

      const allSeriesArticles = await queryCollection('blog').all()

      return allSeriesArticles
        .filter((p: any) => {
          const postSeries = getSeriesFromPost(p)
          return postSeries === pageSeries
        })
        .map((p: any) => ({
          id: p.id,
          path: p.path,
          title: p.title,
          seriesOrder: p.seriesOrder,
          date: p.date
        }))
        .sort((a, b) => {
          if (a.seriesOrder !== undefined && b.seriesOrder !== undefined) {
            return a.seriesOrder - b.seriesOrder
          }
          if (a.seriesOrder !== undefined) return -1
          if (b.seriesOrder !== undefined) return 1
          return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
        })
    },
    {
      watch: [() => page.value?.path, () => page.value?.series],
      default: () => []
    }
  )

  const currentArticleIndex = computed(() => {
    if (!seriesArticles.value || !page.value) return -1
    const index = seriesArticles.value.findIndex(article => article.path === page.value?.path)
    return index
  })

  const previousArticle = computed(() => {
    if (!seriesArticles.value || currentArticleIndex.value <= 0) return null
    return seriesArticles.value[currentArticleIndex.value - 1] || null
  })

  const nextArticle = computed(() => {
    if (!seriesArticles.value || currentArticleIndex.value < 0) return null
    if (currentArticleIndex.value >= seriesArticles.value.length - 1) return null
    return seriesArticles.value[currentArticleIndex.value + 1] || null
  })

  return {
    seriesArticles,
    previousArticle,
    nextArticle
  }
}

