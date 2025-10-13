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
    <header class="mb-8">
      <h1 class="text-3xl font-medium tracking-tight text-white/95">{{ page.title }}</h1>
      <div class="mt-2 flex items-center gap-3 text-xs text-zinc-500">
        <time v-if="page.date" :datetime="page.date" class="tabular-nums">{{ new Date(page.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' }) }}</time>
        <span v-if="page.tags?.length">•</span>
        <ul v-if="page.tags?.length" class="flex gap-2">
          <li v-for="tag in page.tags" :key="tag" class="px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">{{ tag }}</li>
        </ul>
      </div>
    </header>
    <article class="prose prose-invert max-w-none">
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
    <footer class="mt-10 pt-6 border-t border-zinc-800 text-sm text-zinc-400">
      <p>
        Questions or feedback? Contact me at
        <a href="mailto:h.alkhalidi@dudes.studio" class="underline underline-offset-4 decoration-zinc-600 hover:decoration-zinc-300">h.alkhalidi@dudes.studio</a>.
      </p>
    </footer>
  </template>
  <template v-else>
    <div class="empty-page">
      <h1>Page Not Found</h1>
      <p>Oops! The content you're looking for doesn't exist.</p>
      <NuxtLink to="/">Go back home</NuxtLink>
    </div>
  </template>
</template>
