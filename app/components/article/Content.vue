<template>
  <article 
    ref="articleRef"
    class="prose prose-invert max-w-full overflow-x-hidden prose-sm sm:prose-base prose-p:leading-relaxed prose-headings:leading-tight"
    @scroll="handleScroll">
    <ContentRenderer :value="page" :components="components" />
  </article>
</template>

<script setup lang="ts">
import ProseP from '../content/ProseP.vue'
import ProseA from '../content/ProseA.vue'
import ProseH1 from '../content/ProseH1.vue'
import ProseH2 from '../content/ProseH2.vue'
import ProseH3 from '../content/ProseH3.vue'
import ProseUl from '../content/ProseUl.vue'
import ProseOl from '../content/ProseOl.vue'
import ProseLi from '../content/ProseLi.vue'
import ProseBlockquote from '../content/ProseBlockquote.vue'
import ProseCodeInline from '../content/ProseCodeInline.vue'
import ProseCode from '../content/ProseCode.vue'
import ProseHr from '../content/ProseHr.vue'
import ProseImg from '../content/ProseImg.vue'
import ProseStrong from '../content/ProseStrong.vue'
import ProseEm from '../content/ProseEm.vue'
import ProseMermaid from '../content/ProseMermaid.vue'
import ImageCarousel from '../ImageCarousel.vue'

const props = defineProps<{
  page: any
}>()

const emit = defineEmits<{
  scroll: [scrollPercent: number]
}>()

const articleRef = ref<HTMLElement>()

const components = {
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
}

const handleScroll = () => {
  if (!articleRef.value) return
  
  try {
    const scrollTop = articleRef.value.scrollTop
    const scrollHeight = articleRef.value.scrollHeight
    const clientHeight = articleRef.value.clientHeight
    const scrollPercent = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)
    
    emit('scroll', scrollPercent)
  } catch (error) {
    // Ignore scroll errors
  }
}

defineExpose({
  articleRef
})
</script>

