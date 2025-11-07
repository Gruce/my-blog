<template>
  <div class="flex flex-col">
    <div class="flex flex-col max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
      <header>
        <div class="flex items-center gap-2 sm:gap-4 mb-6">
          <img 
            src="/hassan-alkhalidi.jpg" 
            alt="Hassan K. Al-Khalidi" 
            class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-zinc-800 flex-shrink-0"
          />
          <div class="min-w-0 flex-1">
            <h1 class="text-xl sm:text-2xl font-medium tracking-tight text-white/95">Hassan K. Al-Khalidi</h1>
            <p class="text-zinc-400 mt-1 text-xs sm:text-sm">CEO, DUDES Studio</p>
          </div>
        </div>
      </header>

      <!-- File Tree Navigation -->
      <BlogFileTree
        :sections="sections"
        :is-section-expanded="isSectionExpanded"
        :is-series-expanded="isSeriesExpanded"
        :toggle-section="toggleSection"
        :toggle-series="toggleSeries"
        :get-article-link-class="(path: string) => {
          return $route.path === path 
            ? 'flex items-center gap-2 py-1.5 pl-1 text-sm text-zinc-100 bg-zinc-900/50 rounded-md transition-colors'
            : 'flex items-center gap-2 py-1.5 pl-1 text-sm text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900/50 rounded-md transition-colors'
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBlogSections } from '~/composables/useBlogSections'
import type { PostItem, BlogCategory } from '~/composables/types'

// SEO meta tags for homepage
useSeoMeta({
  title: 'Hassan K. Al-Khalidi (gruceing)',
  ogTitle: 'Hassan K. Al-Khalidi (gruceing)',
  description: 'Software engineer, technical writer, and developer advocate specializing in modern web technologies and engineering practices.',
  ogDescription: 'Software engineer, technical writer, and developer advocate specializing in modern web technologies and engineering practices.',
  ogImage: '/hassan-alkhalidi.jpg',
  twitterCard: 'summary_large_image'
})

const { data: posts } = await useAsyncData<PostItem[]>('blog', async () => {
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

// Use shared sections composable
const { sections } = useBlogSections(posts)

// Track expanded state
const expandedSections = reactive<Record<string, boolean>>({})
const expandedSeries = reactive<Record<string, boolean>>({})

const isSectionExpanded = (sectionKey: string) => {
  return expandedSections[sectionKey] === true
}

const toggleSection = (sectionKey: string) => {
  expandedSections[sectionKey] = !expandedSections[sectionKey]
}

const isSeriesExpanded = (seriesName: string) => {
  return expandedSeries[seriesName] === true
}

const toggleSeries = (seriesName: string) => {
  expandedSeries[seriesName] = !expandedSeries[seriesName]
}

useSeoMeta({
  title: 'Hassan K. Al-Khalidi (gruceing) — Engineering, Design & Events',
  ogTitle: 'Hassan K. Al-Khalidi (gruceing) — Engineering, Design & Events',
  description: 'Hassan K. Al-Khalidi (gruceing) - Software engineer, technical writer, and developer advocate. Engineering insights, design principles, and event coverage.',
  ogDescription: 'Hassan K. Al-Khalidi (gruceing) - Software engineer, technical writer, and developer advocate. Engineering insights, design principles, and event coverage.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  author: 'Hassan K. Al-Khalidi',
  twitterCreator: '@gruceing',
  twitterSite: '@gruceing',
  keywords: 'Hassan K. Al-Khalidi, Hassan Alkhalidi, حسن الخالدي, حسن, حسن خالد, gruce, gruceing, software engineering, technical writing, web development, frontend architecture, engineering culture'
})

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Hassan K. Al-Khalidi',
        alternateName: ['Hassan Alkhalidi', 'حسن الخالدي', 'حسن', 'حسن خالد', 'gruce', 'gruceing'],
        url: 'https://gruceing.dev',
        sameAs: [
          'https://github.com/gruce',
          'https://instagram.com/gruceing',
          'https://www.linkedin.com/in/gruceing/'
        ],
        jobTitle: 'Software Engineer & Technical Writer',
        description: 'Hassan K. Al-Khalidi (gruceing) - Software engineer, technical writer, and developer advocate specializing in modern web technologies and engineering practices.',
        image: 'https://gruceing.dev/hassan-alkhalidi.jpg',
        knowsAbout: ['Software Engineering', 'Web Development', 'Frontend Architecture', 'Technical Writing', 'Engineering Culture', 'Design Systems'],
        alumniOf: 'Software Engineering',
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Software Engineer',
          description: 'Full-stack developer specializing in modern web technologies'
        }
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Hassan K. Al-Khalidi Blog',
        description: 'Engineering insights, design principles, and event coverage from Hassan K. Al-Khalidi (gruceing)',
        url: 'https://gruceing.dev',
        author: {
          '@type': 'Person',
          name: 'Hassan K. Al-Khalidi',
          alternateName: ['gruceing', 'حسن الخالدي']
        },
        publisher: {
          '@type': 'Person',
          name: 'Hassan K. Al-Khalidi',
          alternateName: ['gruceing', 'حسن الخالدي']
        },
        numberOfItems: posts.value?.length || 0,
        inLanguage: 'en'
      })
    }
  ]
}))
</script>

<style>

</style>