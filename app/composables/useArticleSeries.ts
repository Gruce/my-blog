import { computed, type Ref } from 'vue'

export type SeriesArticle = {
  id: string
  path: string
  title: string
  seriesOrder?: number
  date?: string | Date
}

export function useArticleSeries(page: Ref<any>, route: any) {
  const { data: seriesArticles } = useAsyncData<SeriesArticle[]>(
    `series-${route.path}`,
    async () => {
      if (!page.value?.series) return []

      const allSeriesArticles = await queryCollection('blog').all()
      const seriesName = page.value.series

      return allSeriesArticles
        .filter((p: any) => p.series === seriesName)
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
      watch: [() => page.value?.series],
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

