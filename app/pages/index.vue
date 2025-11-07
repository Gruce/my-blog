<template>
  <div class="flex flex-col">
    <header class="mt-2 sm:mt-3 mb-2 sm:mb-3">
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

    <nav class="mb-6 flex flex-wrap gap-1.5 sm:gap-1">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="handleTabClick(tab.key)"
        class="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full border text-xs transition-colors"
        :class="active === tab.key ? 'border-zinc-600 bg-zinc-900 text-zinc-100' : 'border-zinc-800 bg-transparent text-zinc-400 hover:text-zinc-200'"
        :aria-pressed="active === tab.key"
      >
        {{ tab.label }} <span class="text-zinc-500">({{ tab.count }})</span>
      </button>
    </nav>

    <section v-if="active === 'all'" class="space-y-6 sm:space-y-8">
      <div v-for="section in sections" :key="section.key">
        <h2 class="text-xs sm:text-sm uppercase tracking-wider text-zinc-500 mb-2 sm:mb-3">{{ section.title }}</h2>
        <ul class="divide-y divide-zinc-800 border-t border-b border-zinc-800">
          <template v-for="item in section.items" :key="'seriesName' in item ? item.seriesName : item.id">
            <!-- Series Group -->
            <li v-if="'seriesName' in item" class="py-3">
              <div class="space-y-2">
                <!-- Series Header - Styled like normal article -->
                <button
                  @click="toggleSeries(item.seriesName)"
                  class="group flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 w-full text-left"
                  type="button"
                  aria-label="Toggle series"
                >
                  <div class="flex items-start gap-2 flex-1 min-w-0">
                    <!-- Arrow Icon -->
                    <svg 
                      class="w-3.5 h-3.5 text-zinc-500 flex-shrink-0 mt-0.5 transition-transform duration-200"
                      :class="{ 'rotate-90': isSeriesExpanded(item.seriesName) }"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                    <span class="text-[15px] sm:text-[15px] text-zinc-100 group-hover:text-white transition-colors flex-1 min-w-0 leading-snug">
                      {{ item.seriesName }} <span class="text-zinc-600">({{ item.items.length }})</span>
                    </span>
                  </div>
                  <div v-if="item.items.length > 0" class="text-xs tabular-nums text-zinc-500 flex-shrink-0 sm:mt-0.5">
                    <template v-if="item.items.length === 1">
                      <time v-if="item.items[0].date" :datetime="item.items[0].date">
                        {{ new Date(item.items[0].date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' }) }}
                      </time>
                    </template>
                    <template v-else>
                      <time 
                        v-if="item.items[item.items.length - 1]?.date" 
                        :datetime="item.items[item.items.length - 1].date"
                      >
                        {{ new Date(item.items[item.items.length - 1].date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' }) }}
                      </time>
                      <span class="text-zinc-600 mx-1">–</span>
                      <time 
                        v-if="item.items[0]?.date" 
                        :datetime="item.items[0].date"
                      >
                        {{ new Date(item.items[0].date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' }) }}
                      </time>
                    </template>
                  </div>
                </button>
              <!-- Series Items -->
              <div v-if="isSeriesExpanded(item.seriesName)" class="pl-2 sm:pl-4 space-y-0 border-l border-zinc-800 mt-2">
                <template v-for="(post, index) in item.items" :key="post.id">
                  <div class="py-2 first:pt-0">
                    <div class="flex items-start gap-2">
                      <div class="w-3.5 flex-shrink-0"></div>
                      <!-- Article Link -->
                      <NuxtLink 
                        :to="post.path" 
                        class="group flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 flex-1 min-w-0"
                      >
                        <span class="text-[15px] sm:text-[15px] text-zinc-100 group-hover:text-white transition-colors flex-1 min-w-0 leading-snug">{{ post.title }}</span>
                        <time v-if="post.date" :datetime="post.date" class="text-xs tabular-nums text-zinc-500 flex-shrink-0 sm:mt-0.5">{{ new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' }) }}</time>
                      </NuxtLink>
                    </div>
                  </div>
                </template>
              </div>
              </div>
            </li>
            <!-- Standalone Post -->
            <li v-else class="py-3">
              <NuxtLink :to="item.path" class="group flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                <span class="text-[15px] sm:text-[15px] text-zinc-100 group-hover:text-white transition-colors flex-1 min-w-0 leading-snug">{{ item.title }}</span>
                <time v-if="item.date" :datetime="item.date" class="text-xs tabular-nums text-zinc-500 flex-shrink-0 sm:mt-0.5">{{ new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' }) }}</time>
            </NuxtLink>
          </li>
          </template>
        </ul>
      </div>
    </section>

    <section v-else>
      <ul class="divide-y divide-zinc-800 border-t border-b border-zinc-800">
        <template v-for="item in filtered" :key="'seriesName' in item ? item.seriesName : item.id">
          <!-- Series Group -->
          <li v-if="'seriesName' in item" class="py-3">
            <div class="space-y-2">
              <!-- Series Header - Styled like normal article -->
              <button
                @click="toggleSeries(item.seriesName)"
                class="group flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 w-full text-left"
                type="button"
                aria-label="Toggle series"
              >
                <div class="flex items-start gap-2 flex-1 min-w-0">
                  <!-- Arrow Icon -->
                  <svg 
                    class="w-3.5 h-3.5 text-zinc-500 flex-shrink-0 mt-0.5 transition-transform duration-200"
                    :class="{ 'rotate-90': isSeriesExpanded(item.seriesName) }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                  <span class="text-[15px] sm:text-[15px] text-zinc-100 group-hover:text-white transition-colors flex-1 min-w-0 leading-snug">
                    {{ item.seriesName }} <span class="text-zinc-600">({{ item.items.length }})</span>
                  </span>
                </div>
                <div v-if="item.items.length > 0" class="text-xs tabular-nums text-zinc-500 flex-shrink-0 sm:mt-0.5">
                  <template v-if="item.items.length === 1">
                    <time v-if="item.items[0].date" :datetime="item.items[0].date">
                      {{ new Date(item.items[0].date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' }) }}
                    </time>
                  </template>
                  <template v-else>
                    <time 
                      v-if="item.items[item.items.length - 1]?.date" 
                      :datetime="item.items[item.items.length - 1].date"
                    >
                      {{ new Date(item.items[item.items.length - 1].date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' }) }}
                    </time>
                    <span class="text-zinc-600 mx-1">–</span>
                    <time 
                      v-if="item.items[0]?.date" 
                      :datetime="item.items[0].date"
                    >
                      {{ new Date(item.items[0].date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' }) }}
                    </time>
                  </template>
                </div>
              </button>
              <!-- Series Items -->
              <div v-if="isSeriesExpanded(item.seriesName)" class="pl-2 sm:pl-4 space-y-0 border-l border-zinc-800 mt-2">
                <template v-for="(post, index) in item.items" :key="post.id">
                  <div class="py-2 first:pt-0">
                    <div class="flex items-start gap-2">
                      <div class="w-3.5 flex-shrink-0"></div>
                      <!-- Article Link -->
                      <NuxtLink 
                        :to="post.path" 
                        class="group flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 flex-1 min-w-0"
                      >
                        <span class="text-[15px] sm:text-[15px] text-zinc-100 group-hover:text-white transition-colors flex-1 min-w-0 leading-snug">{{ post.title }}</span>
                        <time v-if="post.date" :datetime="post.date" class="text-xs tabular-nums text-zinc-500 flex-shrink-0 sm:mt-0.5">{{ new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' }) }}</time>
                      </NuxtLink>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </li>
          <!-- Standalone Post -->
          <li v-else class="py-3">
            <NuxtLink :to="item.path" class="group flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
              <span class="text-[15px] sm:text-[15px] text-zinc-100 group-hover:text-white transition-colors flex-1 min-w-0 leading-snug">{{ item.title }}</span>
              <time v-if="item.date" :datetime="item.date" class="text-xs tabular-nums text-zinc-500 flex-shrink-0 sm:mt-0.5">{{ new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' }) }}</time>
          </NuxtLink>
        </li>
        </template>
      </ul>
    </section>
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
    tech: { key: 'tech', title: 'Articles – Engineering', items: [] },
    design: { key: 'design', title: 'Articles – Design', items: [] },
    events: { key: 'events', title: 'Events & Workshops', items: [] },
    startup: { key: 'startup', title: 'Articles – Startups', items: [] }
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
          isExpanded: expandedSeries[post.series] === true
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

type TabKey = 'all' | 'tech' | 'design' | 'events' | 'startup'
const active = ref<TabKey>('all')

const tabs = computed(() => {
  const counts: Record<TabKey, number> = {
    all: posts.value?.length || 0,
    tech: sections.value.find((s: Group) => s.key === 'tech')?.items.length || 0,
    design: sections.value.find((s: Group) => s.key === 'design')?.items.length || 0,
    events: sections.value.find((s: Group) => s.key === 'events')?.items.length || 0,
    startup: sections.value.find((s: Group) => s.key === 'startup')?.items.length || 0,
  }
  return [
    { key: 'all' as TabKey, label: 'All', count: counts.all },
    { key: 'startup' as TabKey, label: 'Startups', count: counts.startup },
    { key: 'tech' as TabKey, label: 'Engineering', count: counts.tech },
    { key: 'design' as TabKey, label: 'Design', count: counts.design },
    { key: 'events' as TabKey, label: 'Events', count: counts.events },
  ]
})

// Track expanded series state
const expandedSeries = reactive<Record<string, boolean>>({})

const isSeriesExpanded = (seriesName: string) => {
  return expandedSeries[seriesName] === true
}

const toggleSeries = (seriesName: string) => {
  expandedSeries[seriesName] = !expandedSeries[seriesName]
}

const filtered = computed(() => {
  if (active.value === 'all') {
    // Group by series for filtered view too
    const seriesMap = new Map<string, PostItem[]>()
    const standalone: PostItem[] = []
    
    for (const post of (posts.value || [])) {
      if (post.series) {
        if (!seriesMap.has(post.series)) {
          seriesMap.set(post.series, [])
        }
        seriesMap.get(post.series)!.push(post)
      } else {
        standalone.push(post)
      }
    }
    
    // Sort series items
    for (const [_, items] of seriesMap) {
      items.sort((a, b) => {
        if (a.seriesOrder !== undefined && b.seriesOrder !== undefined) {
          return a.seriesOrder - b.seriesOrder
        }
        if (a.seriesOrder !== undefined) return -1
        if (b.seriesOrder !== undefined) return 1
        return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
      })
    }
    
    // Convert to array format similar to sections
    const result: (PostItem | SeriesGroup)[] = []
    for (const [seriesName, items] of seriesMap) {
      result.push({
        seriesName,
        items,
        isExpanded: expandedSeries[seriesName] === true
      })
    }
    result.push(...standalone)
    
    // Sort: series first, then standalone
    result.sort((a, b) => {
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
    
    return result
  }
  
  // For category filters, group by series
  const categoryPosts = (posts.value || []).filter((p: PostItem) => (p.category ?? 'tech') === active.value)
  const seriesMap = new Map<string, PostItem[]>()
  const standalone: PostItem[] = []
  
  for (const post of categoryPosts) {
    if (post.series) {
      if (!seriesMap.has(post.series)) {
        seriesMap.set(post.series, [])
      }
      seriesMap.get(post.series)!.push(post)
    } else {
      standalone.push(post)
    }
  }
  
  // Sort series items
  for (const [_, items] of seriesMap) {
    items.sort((a, b) => {
      if (a.seriesOrder !== undefined && b.seriesOrder !== undefined) {
        return a.seriesOrder - b.seriesOrder
      }
      if (a.seriesOrder !== undefined) return -1
      if (b.seriesOrder !== undefined) return 1
      return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
    })
  }
  
  const result: (PostItem | SeriesGroup)[] = []
  for (const [seriesName, items] of seriesMap) {
    result.push({
      seriesName,
      items,
      isExpanded: expandedSeries.value.has(seriesName)
    })
  }
  result.push(...standalone)
  
  // Sort: series first, then standalone
  result.sort((a, b) => {
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
  
  return result
})

// Enhanced analytics tracking
const { gtag } = useGtag()

const handleTabClick = (tabKey: TabKey) => {
  active.value = tabKey
  if (tabKey !== 'all' && process.client) {
    try {
      gtag('event', 'select_content', {
        content_type: 'category_filter',
        item_id: tabKey,
        item_name: tabKey
      })
    } catch (error) {
      console.warn('Analytics tracking error:', error)
    }
  }
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