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

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
})


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

useSeoMeta({
  title: () => page.value?.title,
  ogTitle: () => page.value?.title,
  description: () => page.value?.description || page.value?.title,
  ogDescription: () => page.value?.description || page.value?.title,
  ogType: 'article',
  ogImage: () => page.value?.image,
  twitterCard: 'summary_large_image'
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
        author: [{ '@type': 'Person', name: 'Hassan K. Al-Khalidi' }],
        mainEntityOfPage: siteUrl + (page.value?.path || ''),
      })
    }
  ]
}))
</script>

<template>
  <template v-if="page">
    <!-- Back to Home Button -->
    <div class="mb-6">
      <NuxtLink 
        to="/" 
        class="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </NuxtLink>
    </div>

    <header class="mb-8">
      <h1 class="text-2xl sm:text-3xl font-medium tracking-tight text-white/95 leading-tight">{{ page.title }}</h1>
      <div class="mt-4 space-y-3 sm:space-y-0 sm:mt-2 sm:flex sm:items-center sm:gap-3 text-xs text-zinc-500">
        <!-- Date and reading stats row -->
        <div class="flex flex-wrap items-center gap-2 sm:gap-3">
          <time v-if="page.date" :datetime="page.date" class="tabular-nums">{{ new Date(page.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' }) }}</time>
          <span v-if="page.date && (wordCount > 0 || readingTime > 0)" class="hidden lg:inline text-zinc-600">•</span>
          <div v-if="wordCount > 0" class="flex items-center gap-1.5">
            <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span class="tabular-nums">{{ wordCount.toLocaleString() }} words</span>
          </div>
          <span v-if="wordCount > 0 && readingTime > 0" class="hidden lg:inline text-zinc-600">•</span>
          <div v-if="readingTime > 0" class="flex items-center gap-1.5">
            <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="tabular-nums">{{ readingTime }} min read</span>
          </div>
        </div>
        
        <!-- Tags row -->
        <div v-if="page.tags?.length" class="flex flex-wrap gap-1.5">
          <span v-for="tag in page.tags" :key="tag" class="px-2 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs">{{ tag }}</span>
        </div>
      </div>
    </header>
    <article class="prose prose-invert max-w-none prose-sm sm:prose-base">
      <ContentRenderer
        :value="page"
        :components="{
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
          mermaid: ProseMermaid
        }"
      />
    </article>
    <footer class="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-zinc-800 text-xs sm:text-sm text-zinc-400">
      <p class="break-words">
        Questions or feedback? Contact me at
        <a href="mailto:h.alkhalidi@dudes.studio" class="underline underline-offset-4 decoration-zinc-600 hover:decoration-zinc-300 break-all sm:break-normal">h.alkhalidi@dudes.studio</a>.
      </p>
    </footer>
  </template>
  <template v-else>
    <div class="empty-page text-center py-12 px-4">
      <h1 class="text-2xl sm:text-3xl font-medium text-white/95 mb-4">Page Not Found</h1>
      <p class="text-zinc-400 mb-6">Oops! The content you're looking for doesn't exist.</p>
      <NuxtLink 
        to="/" 
        class="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors duration-200"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Go back home
      </NuxtLink>
    </div>
  </template>
</template>
