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
        <div v-if="parentFolderName" class="text-xs sm:text-sm text-zinc-500 font-normal mb-1">
          {{ parentFolderName }}
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
 * Get all nested parent folder names from path
 * For path like /dudes-studio/core-services/web-mobile-development, returns "Dudes Studio > Core Services"
 * For path like /design/design-science-series/article, returns "Design > Design Science Series"
 * For path like /tech/article, returns "Tech"
 */
const parentFolderName = computed(() => {
  const path = props.page?.path || ''
  if (!path) return null
  
  // Remove leading/trailing slashes and split
  const pathParts = path.replace(/^\/|\/$/g, '').split('/').filter((p: string) => p.length > 0)
  
  // Skip 'blog' prefix if present
  const startIndex = pathParts[0] === 'blog' ? 1 : 0
  const relevantParts = pathParts.slice(startIndex)
  
  // Get all parent folders (all parts except the last one, which is the filename)
  if (relevantParts.length >= 2) {
    // Get all parts except the last one (filename)
    const parentFolders = relevantParts.slice(0, -1)
    
    // Convert each folder name to readable format and join with separator
    const readableFolders = parentFolders.map((folder: string) => {
      return folder.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    })
    
    return readableFolders.join(' > ')
  }
  
  // If we only have 1 part, there's no parent folder to show
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

