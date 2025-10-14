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
      <div class="mt-3 sm:mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs text-zinc-500">
        <time v-if="page.date" :datetime="page.date" class="tabular-nums">{{ new Date(page.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' }) }}</time>
        <span v-if="page.tags?.length" class="hidden sm:inline">•</span>
        <ul v-if="page.tags?.length" class="flex flex-wrap gap-1.5 sm:gap-2">
          <li v-for="tag in page.tags" :key="tag" class="px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs">{{ tag }}</li>
        </ul>
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
