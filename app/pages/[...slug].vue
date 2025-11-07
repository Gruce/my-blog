<script lang="ts" setup>
import { type Ref } from 'vue'
import { useArticleSidebar } from '~/composables/useArticleSidebar'
import type { PostItem } from '~/composables/types'
import { useReadingTime } from '~/composables/useReadingTime'
import { useArticleSeries } from '~/composables/useArticleSeries'
import type { BlogCategory } from '~/composables/types'

const route = useRoute()
const { data: page } = await useAsyncData(`page-${route.path}`, () => {
  return queryCollection('blog').path(route.path).first()
})

// Fetch all posts for sidebar navigation
const { data: posts } = await useAsyncData<PostItem[]>('blog-sidebar', async () => {
  const list = await queryCollection('blog').order('date', 'DESC').all()
  return list.map((p: any) => ({
    id: p.id,
    path: p.path,
    title: p.title,
    date: p.date,
    category: (p.category ?? 'tech') as BlogCategory,
    series: p.series,
    seriesOrder: p.seriesOrder
  }))
})

// Use composables
const sidebarRef = ref<{ sidebarOpen: Ref<boolean>, closeSidebar: () => void, toggleSidebar: () => void }>()
const currentPath = computed(() => page.value?.path || route.path)
const postsRef = computed(() => posts.value || [])
const sidebar = useArticleSidebar(postsRef, currentPath.value)
const { readingTime } = useReadingTime(toRef(page, 'value'))
const { seriesArticles, previousArticle, nextArticle } = useArticleSeries(toRef(page, 'value'), route)

// Get sidebar state for header toggle
const sidebarOpen = computed(() => sidebar.sidebarOpen.value)

const toggleSidebar = () => {
  if (sidebarRef.value) {
    sidebarRef.value.toggleSidebar()
  }
}

// Enhanced analytics tracking
const articleContentRef = ref<{ articleRef: HTMLElement }>()
const { gtag } = useGtag()
const isClient = ref(false)

// Track article view when component mounts
onMounted(() => {
  isClient.value = true
  if (page.value) {
    try {
      gtag('event', 'view_item', {
        item_id: page.value.title,
        item_name: page.value.title,
        item_category: page.value.category || 'tech',
        custom_parameter_1: page.value.category || 'tech',
        custom_parameter_2: readingTime.value * 60,
        content_type: 'article'
      })
    } catch (error) {
      console.warn('Analytics tracking error:', error)
    }
  }
})

// Track scroll depth
const handleScroll = (scrollPercent: number) => {
  if (!isClient.value) return

  try {
    // Track at 25%, 50%, 75%, 100%
    if (scrollPercent >= 25 && scrollPercent < 50) {
      gtag('event', 'scroll', { percent_scrolled: 25 })
    } else if (scrollPercent >= 50 && scrollPercent < 75) {
      gtag('event', 'scroll', { percent_scrolled: 50 })
    } else if (scrollPercent >= 75 && scrollPercent < 100) {
      gtag('event', 'scroll', { percent_scrolled: 75 })
    } else if (scrollPercent >= 100) {
      gtag('event', 'scroll', { percent_scrolled: 100 })
    }
  } catch (error) {
    console.warn('Analytics tracking error:', error)
  }
}

// SEO Meta
if (page.value?.image) {
  useSeoMeta({
    ogImage: page.value.image,
    twitterImage: page.value.image
  })
}

const siteUrl = useRuntimeConfig().public?.siteUrl || ''

useSeoMeta({
  title: () => page.value?.title,
  ogTitle: () => page.value?.title,
  description: () => page.value?.description || page.value?.title,
  ogDescription: () => page.value?.description || page.value?.title,
  ogType: 'article',
  ogImage: () => page.value?.image,
  twitterCard: 'summary_large_image',
  author: () => page.value?.author || 'Hassan K. Al-Khalidi',
  twitterCreator: '@gruceing',
  twitterSite: '@gruceing'
})

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: page.value?.title,
        description: page.value?.description || page.value?.title,
        image: page.value?.image ? [page.value.image] : undefined,
        datePublished: page.value?.date,
        author: {
          '@type': 'Person',
          name: page.value?.author || 'Hassan K. Al-Khalidi',
          alternateName: page.value?.authorAlternateNames || ['Hassan Alkhalidi', 'حسن الخالدي', 'حسن', 'حسن خالد', 'gruce', 'gruceing'],
          url: siteUrl,
          sameAs: [
            'https://github.com/gruce',
            'https://instagram.com/gruceing',
            'https://www.linkedin.com/in/gruceing/'
          ],
          jobTitle: 'Software Engineer & Technical Writer',
          description: 'Hassan K. Al-Khalidi (gruceing) - Software engineer, technical writer, and developer advocate specializing in modern web technologies and engineering practices.'
        },
        publisher: {
          '@type': 'Person',
          name: 'Hassan K. Al-Khalidi',
          alternateName: ['gruceing', 'حسن الخالدي']
        },
        mainEntityOfPage: siteUrl + (page.value?.path || ''),
        keywords: page.value?.tags?.join(', ') || '',
        inLanguage: 'en'
      })
    }
  ]
}))
</script>

<template>
  <template v-if="page">
    <ArticleSidebar 
      ref="sidebarRef"
      :posts="posts || []"
      :current-path="currentPath"
    >
      <div class="flex flex-col max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <ArticleHeader
          :page="page"
          :reading-time="readingTime"
          :sidebar-open="sidebarOpen"
          :header-name-class="sidebar.headerNameClass"
          :header-subtitle-class="sidebar.headerSubtitleClass"
          @toggle-sidebar="toggleSidebar"
          @close-sidebar="() => sidebarRef?.closeSidebar()"
        />

        <ArticleContent
          ref="articleContentRef"
          :page="page"
          @scroll="handleScroll"
        />

        <ArticleSeriesNavigation
          v-if="page?.series && seriesArticles && seriesArticles.length > 0"
          :page="page"
          :series-articles="seriesArticles"
          :previous-article="previousArticle"
          :next-article="nextArticle"
        />

        <ArticleFooter />
      </div>
    </ArticleSidebar>
  </template>
  <template v-else>
    <div class="empty-page text-center py-12 px-4">
      <h1 class="text-2xl sm:text-3xl font-medium text-white/95 mb-4">Page Not Found</h1>
      <p class="text-zinc-400 mb-6">Oops! The content you're looking for doesn't exist.</p>
      <NuxtLink to="/"
        class="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors duration-200">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Go back home
      </NuxtLink>
    </div>
  </template>
</template>
