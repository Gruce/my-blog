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
            <p class="text-zinc-400 mt-1 text-xs sm:text-sm">CEO, DUDES Studio • Co-Founder, Enab عنب</p>
            <NuxtLink 
              to="/about" 
              class="inline-block mt-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
            >
              About →
            </NuxtLink>
          </div>
        </div>
      </header>

      <!-- File Tree Navigation -->
      <nav class="space-y-0.5">
        <template v-for="section in sections" :key="section.key">
          <!-- Section Folder -->
          <div>
            <button
              @click="toggleSection(section.key)"
              class="w-full flex items-center gap-2 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 rounded-md transition-colors"
              type="button"
            >
              <svg
                class="w-4 h-4 flex-shrink-0 transition-transform duration-200"
                :class="{ 'rotate-90': isSectionExpanded(section.key) }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <svg
                class="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <span class="flex-1 text-left">{{ section.title }}</span>
              <span class="text-xs text-zinc-600">({{ section.items.length }})</span>
            </button>
            
            <!-- Section Content (Series and Standalone Posts) -->
            <div v-if="isSectionExpanded(section.key)" class="ml-6 mt-0.5 space-y-0.5">
              <template v-for="item in section.items" :key="'seriesName' in item ? item.seriesName : item.id">
                <!-- Series Folder -->
                <div v-if="'seriesName' in item">
                  <button
                    @click.stop="toggleSeries(item.seriesName)"
                    class="w-full flex items-center gap-2 py-1.5 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 rounded-md transition-colors"
                    type="button"
                  >
                    <svg
                      class="w-4 h-4 flex-shrink-0 transition-transform duration-200"
                      :class="{ 'rotate-90': isSeriesExpanded(item.seriesName) }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                    <svg
                      class="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <span class="flex-1 text-left">{{ item.seriesName }}</span>
                    <span class="text-xs text-zinc-600">({{ item.items.length }})</span>
                  </button>
                  
                  <!-- Series Articles -->
                  <div v-if="isSeriesExpanded(item.seriesName)" class="ml-6 mt-0.5 space-y-0.5">
                    <NuxtLink
                      v-for="post in item.items"
                      :key="post.id"
                      :to="post.path"
                      class="flex items-center gap-2 py-1.5 pl-1 text-sm text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900/50 rounded-md transition-colors"
                      :class="{ 'text-zinc-100 bg-zinc-900/50': $route.path === post.path }"
                    >
                      <svg
                        class="w-4 h-4 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span class="flex-1 truncate">{{ post.title }}</span>
                    </NuxtLink>
                  </div>
                </div>
                
                <!-- Standalone Post -->
                <NuxtLink
                  v-else
                  :to="item.path"
                  class="flex items-center gap-2 py-1.5 pl-1 text-sm text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900/50 rounded-md transition-colors"
                  :class="{ 'text-zinc-100 bg-zinc-900/50': $route.path === item.path }"
                >
                  <svg
                    class="w-4 h-4 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="flex-1 truncate">{{ item.title }}</span>
                </NuxtLink>
              </template>
            </div>
          </div>
        </template>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO meta tags for homepage
useSeoMeta({
  title: 'Hassan K. Al-Khalidi (gruceing)',
  ogTitle: 'Hassan K. Al-Khalidi (gruceing)',
  description: 'Software engineer, technical writer, and developer advocate specializing in modern web technologies and engineering practices.',
  ogDescription: 'Software engineer, technical writer, and developer advocate specializing in modern web technologies and engineering practices.',
  ogImage: '/hassan-alkhalidi.jpg',
  twitterCard: 'summary_large_image'
})

type PostItem = { 
  id: string
  path: string
  title: string
  date?: string | Date
  category?: 'tech' | 'design' | 'events' | 'startup'
  series?: string
  seriesOrder?: number
}
const { data: posts } = await useAsyncData<PostItem[]>('blog', async () => {
  const list = await queryCollection('blog').order('date', 'DESC').all()
  return list.map((p: any) => ({ 
    id: p.id, 
    path: p.path, 
    title: p.title, 
    date: p.date, 
    category: p.category ?? 'tech',
    series: p.series,
    seriesOrder: p.seriesOrder
  }))
})

type SeriesGroup = { 
  seriesName: string
  items: PostItem[]
  isExpanded: boolean
}

type Group = { key: 'tech' | 'design' | 'events' | 'startup'; title: string; items: (PostItem | SeriesGroup)[] }
const sections = computed(() => {
  const groups: Record<'tech' | 'design' | 'events' | 'startup', Group> = {
    tech: { key: 'tech', title: 'Engineering', items: [] },
    design: { key: 'design', title: 'Design', items: [] },
    events: { key: 'events', title: 'Events & Workshops', items: [] },
    startup: { key: 'startup', title: 'Startups', items: [] }
  }
  
  // Group posts by category and series
  for (const post of (posts.value || [])) {
    const key = (post.category ?? 'tech') as 'tech' | 'design' | 'events' | 'startup'
    
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
  for (const key of ['startup', 'tech', 'design', 'events'] as const) {
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
  
  const orderedKeys: Array<'startup' | 'tech' | 'design' | 'events'> = ['startup', 'tech', 'design', 'events']
  return orderedKeys
    .map(k => groups[k])
    .filter((g) => g.items.length > 0)
})

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