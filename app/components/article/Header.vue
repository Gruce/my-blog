<template>
  <div>
    <!-- Mobile Sidebar Header -->
    <div class="lg:hidden">
      <ArticleSidebarHeader
        :header-name-class="headerNameClassValue"
        :header-subtitle-class="headerSubtitleClassValue"
        @close="handleClose"
      />
    </div>

    <div class="flex justify-between items-center">
      <!-- Date and Reading Time -->
      <div class="mb-6 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-500">
        <time v-if="page.date" :datetime="page.date" class="tabular-nums">
          {{ new Date(page.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' }) }}
        </time>
        <span v-if="page.date && readingTime > 0" class="text-zinc-600 hidden sm:inline">•</span>
        <div v-if="readingTime > 0" class="flex items-center gap-1.5">
          <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="tabular-nums">{{ readingTime }} min read</span>
        </div>
      </div>

      <!-- Mobile Sidebar Toggle -->
      <div class="mb-6 flex justify-end">
        <button @click="$emit('toggle-sidebar')"
          class="lg:hidden inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200"
          type="button" aria-label="Toggle navigation">
          <svg v-if="!sidebarOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span class="hidden sm:inline">{{ sidebarOpen ? 'Hide' : 'Show' }} Navigation</span>
        </button>
      </div>
    </div>

    <header class="mb-4">
      <!-- Title -->
      <div class="flex flex-col">
        <div v-if="pageSeries" class="text-xs sm:text-sm text-zinc-500 font-normal mb-1">
          {{ pageSeries }}
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
        class="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md bg-zinc-800/50 text-zinc-300 text-xs font-medium">
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toValue, computed, type ComputedRef } from 'vue'

const props = defineProps<{
  page: any
  readingTime: number
  sidebarOpen: boolean
  headerNameClass?: string | ComputedRef<string>
  headerSubtitleClass?: string | ComputedRef<string>
}>()

const headerNameClassValue = computed(() => props.headerNameClass ? toValue(props.headerNameClass) : '')
const headerSubtitleClassValue = computed(() => props.headerSubtitleClass ? toValue(props.headerSubtitleClass) : '')

/**
 * Get series name from page (explicit or from folder structure)
 */
const pageSeries = computed(() => {
  if (props.page?.series) return props.page.series
  
  // Detect from folder structure
  const path = props.page?.path || ''
  const pathParts = path.replace(/^\/|\/$/g, '').split('/')
  if (pathParts.length > 2) {
    const folderName = pathParts[1]
    return folderName.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  }
  
  return null
})

const emit = defineEmits<{
  'toggle-sidebar': []
  'close-sidebar': []
}>()

const handleClose = () => {
  emit('close-sidebar')
}
</script>

