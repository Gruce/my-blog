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

// Nuxt SEO integration
if (page.value?.ogImage) {
  useSeoMeta({
    ogImage: page.value.ogImage,
    twitterImage: page.value.ogImage
  })
}
// Ensure the schema.org is rendered
useHead(page.value?.head || {})
useSeoMeta(page.value?.seo || {})


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
      <div class="mt-3 flex items-center gap-3 text-sm text-zinc-500">
        <time v-if="page.date" :datetime="page.date" class="tabular-nums">{{ new Date(page.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' }) }}</time>
        <span v-if="page.date && readingTime > 0" class="text-zinc-600">•</span>
        <div v-if="readingTime > 0" class="flex items-center gap-1.5">
          <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="tabular-nums">{{ readingTime }} min read</span>
        </div>
      </div>
      <div v-if="page.tags?.length" class="mt-3 flex flex-wrap gap-2">
        <span v-for="tag in page.tags" :key="tag" class="px-3 py-1.5 rounded-md bg-zinc-800/50 text-zinc-300 text-xs font-medium">{{ tag }}</span>
      </div>
    </header>
    <article class="prose prose-invert max-w-full overflow-x-hidden prose-sm sm:prose-base">
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
          mermaid: ProseMermaid,
          ImageCarousel: ImageCarousel
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
