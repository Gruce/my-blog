<script lang="ts" setup>
import ProseP from '../components/content/ProseP.vue'
import ProseA from '../components/content/ProseA.vue'
import ProseH1 from '../components/content/ProseH1.vue'
import ProseH2 from '../components/content/ProseH2.vue'
import ProseH3 from '../components/content/ProseH3.vue'
import ProseUl from '../components/content/ProseUl.vue'
import ProseOl from '../components/content/ProseOl.vue'
import ProseLi from '../components/content/ProseLi.vue'
import ProseBlockquote from '../components/content/ProseBlockquote.vue'
import ProseCodeInline from '../components/content/ProseCodeInline.vue'
import ProseCode from '../components/content/ProseCode.vue'
import ProseHr from '../components/content/ProseHr.vue'
import ProseImg from '../components/content/ProseImg.vue'
import ProseStrong from '../components/content/ProseStrong.vue'
import ProseEm from '../components/content/ProseEm.vue'
import ProseMermaid from '../components/content/ProseMermaid.vue'
import ImageCarousel from '../components/ImageCarousel.vue'

const route = useRoute()
const { data: page } = await useAsyncData(`page-${route.path}`, () => {
  return queryCollection('blog').path(route.path).first()
})

// Fetch all posts for sidebar navigation
type PostItem = { 
  id: string
  path: string
  title: string
  date?: string | Date
  category?: 'tech' | 'design' | 'events' | 'startup'
  series?: string
  seriesOrder?: number
}

const { data: posts } = await useAsyncData<PostItem[]>('blog-sidebar', async () => {
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

// Track expanded state for sidebar
const expandedSections = reactive<Record<string, boolean>>({})
const expandedSeries = reactive<Record<string, boolean>>({})

// Mobile sidebar toggle
const sidebarOpen = ref(false)
const sidebarScrollRef = ref<HTMLElement>()

// Sidebar dimming on mouse leave - default to dimmed
const sidebarDimmed = ref(true)
let dimTimeout: ReturnType<typeof setTimeout> | null = null
let isInitialLoad = ref(true)

// Computed: check if we're on desktop
const isDesktop = computed(() => {
  if (!isClient.value) return false
  return windowWidth.value >= 1024
})

// Computed: check if sidebar should be dimmed
// On SSR or initial load, default to dimmed if on desktop
const isDimmed = computed(() => {
  if (!isClient.value) {
    // SSR: default to dimmed
    return true
  }
  return isDesktop.value && sidebarDimmed.value
})

// Computed: base text color class when dimmed
const dimmedTextClass = computed(() => isDimmed.value ? 'text-zinc-500' : '')

// Computed: header name class
const headerNameClass = computed(() => {
  if (isDimmed.value) return 'text-zinc-500'
  return 'text-white/95 group-hover:text-white'
})

// Computed: header subtitle class
const headerSubtitleClass = computed(() => {
  if (isDimmed.value) return 'text-zinc-500'
  return 'text-zinc-400 group-hover:text-zinc-300'
})

// Computed: section button class
const sectionButtonClass = computed(() => {
  if (isDimmed.value) return 'text-zinc-500'
  return 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50'
})

// Computed: section count class
const sectionCountClass = computed(() => {
  if (isDimmed.value) return 'text-zinc-500'
  return 'text-zinc-600'
})

// Computed: series button class
const seriesButtonClass = computed(() => {
  if (isDimmed.value) return 'text-zinc-500'
  return 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50'
})

// Function to get home link class
const getHomeLinkClass = (isActive: boolean) => {
  const base = {
    'bg-zinc-800/50 font-medium': isActive,
    'hover:bg-zinc-900/50': !isActive
  }
  if (isDimmed.value) {
    return { ...base, 'text-zinc-500': true }
  }
  return {
    ...base,
    'text-zinc-100': isActive,
    'text-zinc-500 hover:text-zinc-100': !isActive
  }
}

// Function to get article link class
const getArticleLinkClass = (isActive: boolean, isStandalone: boolean = false) => {
  const base = {
    'bg-zinc-800/50 font-medium': isActive,
    'hover:bg-zinc-900/50': !isActive
  }
  if (isDimmed.value) {
    return { ...base, 'text-zinc-500': true }
  }
  return {
    ...base,
    [isStandalone ? 'text-white' : 'text-zinc-100']: isActive,
    'text-zinc-500 hover:text-zinc-100': !isActive
  }
}

const handleSidebarMouseEnter = () => {
  // Only handle on desktop
  if (isDesktop.value) {
    // On initial load, wait a bit before allowing brightening to ensure it starts dimmed
    if (isInitialLoad.value) {
      setTimeout(() => {
        isInitialLoad.value = false
      }, 100)
      return
    }
    sidebarDimmed.value = false
    if (dimTimeout) {
      clearTimeout(dimTimeout)
      dimTimeout = null
    }
  }
}

const handleSidebarMouseLeave = () => {
  // Only handle on desktop
  if (isDesktop.value) {
    if (dimTimeout) {
      clearTimeout(dimTimeout)
    }
    dimTimeout = setTimeout(() => {
      sidebarDimmed.value = true
    }, 2000) // 2 seconds
  }
}

// Cleanup timeout on unmount
onUnmounted(() => {
  if (dimTimeout) {
    clearTimeout(dimTimeout)
  }
})

// Check if we're on client side
const isClient = ref(false)

// Reactive window width for sidebar positioning
// Default to desktop width to ensure margin is applied on initial render
const windowWidth = ref(1920)

// Ensure window width is set on mount and sidebar is dimmed
onMounted(() => {
  // Set client flag
  isClient.value = true
  // Ensure sidebar starts dimmed on page load - set it immediately
  sidebarDimmed.value = true
  
  windowWidth.value = window.innerWidth
  
  // Force dimmed state after next tick to ensure it's applied
  nextTick(() => {
    sidebarDimmed.value = true
    // Trigger reactivity update
    if (windowWidth.value >= 1024) {
      sidebarDimmed.value = true
    }
  })
  
  // After a short delay, allow mouse interactions
  setTimeout(() => {
    isInitialLoad.value = false
  }, 500)
  
  // Update on resize
  const handleResize = () => {
    windowWidth.value = window.innerWidth
  }
  window.addEventListener('resize', handleResize)
  
  // Cleanup on unmount
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})

// Computed style for sidebar opacity and positioning
const sidebarStyle = computed(() => {
  // Add opacity for dimming (only on desktop)
  // Text colors will be changed via classes based on dim state
  // Default to dimmed (0.5 opacity) on desktop, full opacity on mobile
  let opacity = '1'
  if (isClient.value) {
    if (windowWidth.value >= 1024) {
      // Desktop: use dimmed state
      opacity = sidebarDimmed.value ? '0.5' : '1'
    }
  } else {
    // SSR: default to dimmed for desktop
    opacity = '0.5'
  }
  
  // For desktop, ensure sticky positioning
  // Sticky positioning requires:
  // 1. position: sticky
  // 2. top value (or other offset)
  // 3. Parent must allow scrolling (no overflow: hidden)
  // 4. Parent must be taller than sticky element
  const style: Record<string, string> = {
    opacity,
    transition: 'opacity 0.3s ease-in-out'
  }
  
  // Only apply sticky on desktop, not mobile
  if (isClient.value && windowWidth.value >= 1024) {
    // CRITICAL: For sticky to work, we must ensure:
    // 1. position: sticky is set
    // 2. top value is defined
    // 3. No parent has overflow: hidden/auto/scroll
    // 4. Parent container must be taller than sticky element
    style.position = 'sticky'
    style.top = '0'
    style.alignSelf = 'flex-start'
    // Use height instead of maxHeight to ensure proper sticky behavior
    style.height = '100vh'
  }
  
  return style
})


// Prevent body scroll when sidebar is open on mobile
let scrollPosition = 0
watch(sidebarOpen, (isOpen) => {
  if (isClient.value && window.innerWidth < 1024) {
    if (isOpen) {
      // Save scroll position
      scrollPosition = window.pageYOffset || document.documentElement.scrollTop
      // Prevent body scroll using position fixed
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollPosition}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Restore scroll position
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (scrollPosition) {
        window.scrollTo(0, scrollPosition)
        scrollPosition = 0
      }
    }
  }
})

// Handle touch events on sidebar to prevent body scroll
let touchMoveHandler: ((e: TouchEvent) => void) | null = null

watchEffect(() => {
  if (isClient.value && sidebarScrollRef.value) {
    touchMoveHandler = (e: TouchEvent) => {
      // Only stop propagation for touchmove to prevent body scroll
      // Allow clicks and other events to work normally
      e.stopPropagation()
    }
    
    // Only listen to touchmove, not touchstart or touchend, to allow clicks
    sidebarScrollRef.value.addEventListener('touchmove', touchMoveHandler, { passive: false })
    
    return () => {
      if (sidebarScrollRef.value && touchMoveHandler) {
        sidebarScrollRef.value.removeEventListener('touchmove', touchMoveHandler)
      }
    }
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (isClient.value) {
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    document.body.style.overflow = ''
  }
})

// Auto-expand section and series containing current article
watchEffect(() => {
  if (page.value && posts.value && posts.value.length > 0) {
    const currentPath = page.value.path
    const currentPost = posts.value.find(p => p.path === currentPath)
    
    if (currentPost) {
      // Find and expand the section containing this article
      const sectionKey = (currentPost.category ?? 'tech') as 'tech' | 'design' | 'events' | 'startup'
      expandedSections[sectionKey] = true
      
      // If article is in a series, expand that series too
      if (currentPost.series) {
        expandedSeries[currentPost.series] = true
      }
    }
  }
})

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

// Fetch series articles if this article is part of a series
type SeriesArticle = {
  id: string
  path: string
  title: string
  seriesOrder?: number
  date?: string | Date
}

const { data: seriesArticles } = await useAsyncData<SeriesArticle[]>(
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

// Find current article index and get previous/next
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

const isFirstArticle = computed(() => {
  return currentArticleIndex.value === 0
})

// Series navigation is always open

// Nuxt SEO integration
if (page.value?.image) {
  useSeoMeta({
    ogImage: page.value.image,
    twitterImage: page.value.image
  })
}


const siteUrl = useRuntimeConfig().public?.siteUrl || ''

// Calculate word count and reading time
const wordCount = computed(() => {
  if (!page.value) {
    return 0
  }
  
  // Extract text from minimark structure
  const extractText = (node: any): string => {
    if (!node) return ''
    
    // If it's a string, return it
    if (typeof node === 'string') {
      return node
    }
    
    // If it's an array, process each element
    if (Array.isArray(node)) {
      return node.map(extractText).join(' ')
    }
    
    // If it's an object with children, extract from children
    if (node.children && Array.isArray(node.children)) {
      return node.children.map(extractText).join(' ')
    }
    
    // If it's an object with value, extract from value
    if (node.value) {
      return extractText(node.value)
    }
    
    return ''
  }
  
  // Get content from body.value (minimark structure)
  let content = ''
  if (page.value.body?.value) {
    content = extractText(page.value.body.value)
  }
  
  if (!content) {
    return 0
  }
  
  // Clean and count words
  const words = content
    .replace(/[^\w\s]/g, ' ') // Remove punctuation
    .split(/\s+/)
    .filter((word: string) => word.length > 0)
  
  return words.length
})

const readingTime = computed(() => {
  const wordsPerMinute = 200 // Average reading speed
  const minutes = Math.ceil(wordCount.value / wordsPerMinute)
  return minutes
})

// Enhanced analytics tracking
const articleRef = ref<HTMLElement>()
const { gtag } = useGtag()

// Track article view when component mounts
onMounted(() => {
  if (page.value && isClient.value) {
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
const handleScroll = () => {
  if (!articleRef.value || !isClient.value) return
  
  try {
    const scrollTop = articleRef.value.scrollTop
    const scrollHeight = articleRef.value.scrollHeight
    const clientHeight = articleRef.value.clientHeight
    const scrollPercent = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)
    
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
    <!-- Mobile Overlay -->
    <div 
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden"
      @click="sidebarOpen = false"
      @touchstart="(e: TouchEvent) => { e.preventDefault(); sidebarOpen = false; }"
    ></div>

    <div class="flex lg:items-start" style="overflow: visible;">
      <!-- Sidebar - Hidden on mobile, visible on desktop -->
      <aside 
        class="w-80 border-r border-zinc-800 bg-zinc-950 flex-shrink-0 z-50 transition-all duration-300"
        :class="{ 
          '-translate-x-full fixed left-0 h-screen': !sidebarOpen && windowWidth < 1024,
          'translate-x-0 fixed left-0 h-screen': sidebarOpen && windowWidth < 1024
        }"
        :style="sidebarStyle"
        @click.stop
        @mouseenter="handleSidebarMouseEnter"
        @mouseleave="handleSidebarMouseLeave"
      >
        <div 
          ref="sidebarScrollRef"
          class="w-full overflow-y-auto p-4"
          :class="{
            'h-full': windowWidth < 1024,
            'h-screen': windowWidth >= 1024
          }"
          style="max-height: 100vh; -webkit-overflow-scrolling: touch; touch-action: auto;"
        >
        <!-- Sidebar Header -->
        <div class="mb-6 pb-6 border-b border-zinc-800">
      <NuxtLink 
        to="/" 
            @click="sidebarOpen = false"
            class="flex items-center gap-3 group"
          >
            <img 
              src="/hassan-alkhalidi.jpg" 
              alt="Hassan K. Al-Khalidi" 
              class="w-12 h-12 rounded-lg object-cover border border-zinc-800 flex-shrink-0 group-hover:border-zinc-700 transition-colors"
            />
            <div class="min-w-0 flex-1">
              <h2 class="text-sm font-medium tracking-tight transition-colors" :class="headerNameClass">Hassan K. Al-Khalidi</h2>
              <p class="text-xs mt-0.5 transition-colors" :class="headerSubtitleClass">CEO, DUDES Studio</p>
            </div>
      </NuxtLink>
    </div>

        <nav class="space-y-0.5">
          <!-- Home Link -->
          <NuxtLink
            to="/"
            @click="sidebarOpen = false"
            class="flex items-center gap-2 py-1.5 pl-1 text-sm rounded-md transition-colors"
            :class="getHomeLinkClass($route.path === '/')"
          >
            <svg
              class="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span class="flex-1">Home</span>
          </NuxtLink>
          
          <template v-for="section in sections" :key="section.key">
            <!-- Section Folder -->
            <div>
              <button
                @click="toggleSection(section.key)"
                class="w-full flex items-center gap-2 py-2 text-sm rounded-md transition-colors"
                :class="sectionButtonClass"
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
                <span class="text-xs transition-colors" :class="sectionCountClass">({{ section.items.length }})</span>
              </button>
              
              <!-- Section Content (Series and Standalone Posts) -->
              <div v-if="isSectionExpanded(section.key)" class="ml-6 mt-0.5 space-y-0.5">
                <template v-for="item in section.items" :key="'seriesName' in item ? item.seriesName : item.id">
                  <!-- Series Folder -->
                  <div v-if="'seriesName' in item">
                    <button
                      @click.stop="toggleSeries(item.seriesName)"
                      class="w-full flex items-center gap-2 py-1.5 text-sm rounded-md transition-colors"
                      :class="seriesButtonClass"
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
                      <span class="text-xs transition-colors" :class="sectionCountClass">({{ item.items.length }})</span>
                    </button>
                    
                    <!-- Series Articles -->
                    <div v-if="isSeriesExpanded(item.seriesName)" class="ml-6 mt-0.5 space-y-0.5">
                      <NuxtLink
                        v-for="post in item.items"
                        :key="post.id"
                        :to="post.path"
                        @click="sidebarOpen = false"
                        class="flex items-center gap-2 py-1.5 pl-1 text-sm rounded-md transition-colors"
                        :class="getArticleLinkClass($route.path === post.path)"
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
                    @click="sidebarOpen = false"
                    class="flex items-center gap-2 py-1.5 pl-1 text-sm rounded-md transition-colors"
                    :class="getArticleLinkClass($route.path === item.path, true)"
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
      </aside>

      <!-- Main Content -->
      <div class="flex-1 w-full">
        <div class="flex flex-col max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Mobile Sidebar Toggle -->
          <div class="mb-6 flex justify-end">
            <button
              @click="sidebarOpen = !sidebarOpen"
              class="lg:hidden inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200"
              type="button"
              aria-label="Toggle navigation"
            >
              <svg 
                v-if="!sidebarOpen"
                class="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg 
                v-else
                class="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span class="hidden sm:inline">{{ sidebarOpen ? 'Hide' : 'Show' }} Navigation</span>
            </button>
          </div>

          <!-- Date and Reading Time -->
          <div class="mb-6 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-500">
            <time v-if="page.date" :datetime="page.date" class="tabular-nums">{{ new
              Date(page.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' }) }}</time>
            <span v-if="page.date && readingTime > 0" class="text-zinc-600 hidden sm:inline">•</span>
        <div v-if="readingTime > 0" class="flex items-center gap-1.5">
          <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="tabular-nums">{{ readingTime }} min read</span>
        </div>
      </div>

    <header class="mb-4">
      <!-- Title -->
      <div class="flex flex-col">
        <div v-if="page.series" class="text-xs sm:text-sm text-zinc-500 font-normal mb-1">
          {{ page.series }}
        </div>
        <h1 class="text-xl sm:text-xl md:text-2xl font-medium tracking-tight text-white/95 leading-tight">
          <span v-if="page.seriesOrder" class="text-zinc-500 font-normal mr-2">{{ page.seriesOrder }}.</span>
          <span>{{ page.title }}</span>
        </h1>
      </div>
    </header>

    <!-- Tags -->
    <div v-if="page.tags?.length" class="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
      <span v-for="tag in page.tags" :key="tag"
        class="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md bg-zinc-800/50 text-zinc-300 text-xs font-medium">{{ tag
        }}</span>
    </div>


    <article ref="articleRef"
      class="prose prose-invert max-w-full overflow-x-hidden prose-sm sm:prose-base prose-p:leading-relaxed prose-headings:leading-tight"
      @scroll="handleScroll">
      <ContentRenderer :value="page" :components="{
          p: ProseP,
          a: ProseA,
          h1: ProseH1,
          h2: ProseH2,
          h3: ProseH3,
          ul: ProseUl,
          ol: ProseOl,
          li: ProseLi,
          blockquote: ProseBlockquote,
          code: ProseCodeInline,
          pre: ProseCode,
          hr: ProseHr,
          img: ProseImg,
          strong: ProseStrong,
          em: ProseEm,
          mermaid: ProseMermaid,
          ImageCarousel: ImageCarousel
      }" />
    </article>
    <!-- Series Navigation -->
    <nav v-if="page?.series && seriesArticles && seriesArticles.length > 0" class="mt-8 sm:mt-10 pt-6 sm:pt-8">
      <!-- More from Series -->
      <div class="mb-4">
        <h3 class="text-sm font-medium text-zinc-400 mb-3">More from {{ page.series }}</h3>

        <!-- Always show all articles in series -->
        <ul class="space-y-2">
          <li v-for="article in seriesArticles" :key="article.id">
            <NuxtLink :to="article.path" class="flex items-start gap-2 group"
              :class="{ 'opacity-100': article.path === page.path, 'opacity-60': article.path !== page.path }">
              <span v-if="article.seriesOrder" class="text-xs text-zinc-600 font-mono flex-shrink-0 mt-0.5">{{
                article.seriesOrder }}.</span>
              <span class="text-sm transition-colors flex-1" :class="article.path === page.path
                ? 'font-medium text-zinc-100'
                : 'text-zinc-300 group-hover:text-white'">
                {{ article.title }}
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Previous/Next Navigation -->
      <div class="pt-4 border-t border-zinc-800 space-y-4">
        <NuxtLink v-if="previousArticle" :to="previousArticle.path"
          class="group block w-full bg-zinc-900/80 hover:bg-zinc-900 transition-colors duration-200 p-4 rounded-lg">
          <div class="text-xs text-zinc-500 mb-1">Previous</div>
          <div class="flex items-center gap-2 text-sm text-zinc-300 group-hover:text-white transition-colors">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span class="truncate min-w-0">{{ previousArticle.title }}</span>
          </div>
        </NuxtLink>
        <NuxtLink v-if="nextArticle" :to="nextArticle.path"
          class="group block w-full bg-zinc-900/80 hover:bg-zinc-900 transition-colors duration-200 p-4 rounded-lg">
          <div class="text-xs text-zinc-500 mb-1 text-right">Next</div>
          <div
            class="flex items-center gap-2 text-sm text-zinc-300 group-hover:text-white transition-colors justify-end">
            <span class="truncate min-w-0">{{ nextArticle.title }}</span>
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </NuxtLink>
      </div>
    </nav>

    <footer class="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-zinc-800 text-xs sm:text-sm text-zinc-400">
      <p class="break-words">
        Questions or feedback? Contact me at
              <a href="mailto:h.alkhalidi@dudes.studio"
                class="underline underline-offset-4 decoration-zinc-600 hover:decoration-zinc-300 break-all sm:break-normal">h.alkhalidi@dudes.studio</a>.
      </p>
    </footer>
        </div>
      </div>
    </div>
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
