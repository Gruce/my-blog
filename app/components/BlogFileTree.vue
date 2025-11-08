<template>
  <nav class="space-y-0.5">
    <!-- About Link -->
    <NuxtLink
      to="/about"
      :class="getArticleLinkClass(route.path === '/about')"
      @click="onArticleClick?.('/about')"
    >
      <svg
        class="w-4 h-4 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <span class="flex-1 truncate">About</span>
    </NuxtLink>

    <template v-for="section in sections" :key="section.key">
      <!-- Section Folder -->
      <div>
        <button
          @click="toggleSection(section.key)"
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
          <span :class="sectionCountClass">({{ section.items.length }})</span>
        </button>
        
        <!-- Section Content (Series and Standalone Posts) -->
        <div v-if="isSectionExpanded(section.key)" class="ml-6 mt-0.5 space-y-0.5">
          <template v-for="item in section.items" :key="'seriesName' in item ? item.seriesName : item.id">
            <!-- Series Folder -->
            <div v-if="'seriesName' in item">
              <button
                @click.stop="toggleSeries(item.seriesName)"
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
                <span :class="sectionCountClass">({{ item.items.length }})</span>
              </button>
              
              <!-- Series Articles -->
              <div v-if="isSeriesExpanded(item.seriesName)" class="ml-6 mt-0.5 space-y-0.5">
                <NuxtLink
                  v-for="post in item.items"
                  :key="post.id"
                  :to="post.path"
                  :class="getArticleLinkClass(post.path)"
                  @click="onArticleClick?.(post.path)"
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
                  <svg v-if="isNewArticle(post.date)" class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4c1.11 0 2 .89 2 2v12c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2V6c0-1.11.89-2 2-2zM8.5 15V9H7.25v3.5L4.75 9H3.5v6h1.25v-3.5L7.3 15zm5-4.74V9h-4v6h4v-1.25H11v-1.11h2.5v-1.26H11v-1.12zm7 3.74V9h-1.25v4.5h-1.12V10h-1.25v3.5h-1.13V9H14.5v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1"/>
                  </svg>
                </NuxtLink>
              </div>
            </div>
            
            <!-- Standalone Post -->
            <NuxtLink
              v-else
              :to="item.path"
              :class="getArticleLinkClass(item.path)"
              @click="onArticleClick?.(item.path)"
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
              <svg v-if="isNewArticle(item.date)" class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4c1.11 0 2 .89 2 2v12c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2V6c0-1.11.89-2 2-2zM8.5 15V9H7.25v3.5L4.75 9H3.5v6h1.25v-3.5L7.3 15zm5-4.74V9h-4v6h4v-1.25H11v-1.11h2.5v-1.26H11v-1.12zm7 3.74V9h-1.25v4.5h-1.12V10h-1.25v3.5h-1.13V9H14.5v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1"/>
              </svg>
            </NuxtLink>
          </template>
        </div>
      </div>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Group, PostItem } from '~/composables/types'

const route = useRoute()

const props = defineProps<{
  sections: Group[]
  isSectionExpanded: (key: string) => boolean
  isSeriesExpanded: (name: string) => boolean
  toggleSection: (key: string) => void
  toggleSeries: (name: string) => void
  getArticleLinkClass: (path: string) => string
  sectionButtonClass?: string
  sectionCountClass?: string
  seriesButtonClass?: string
  onArticleClick?: (path: string) => void
}>()

// Default classes if not provided
const sectionButtonClass = computed(() => 
  props.sectionButtonClass || 'w-full flex items-center gap-2 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 rounded-md transition-colors'
)

const sectionCountClass = computed(() => 
  props.sectionCountClass || 'text-xs text-zinc-600'
)

const seriesButtonClass = computed(() => 
  props.seriesButtonClass || 'w-full flex items-center gap-2 py-1.5 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 rounded-md transition-colors'
)

/**
 * Check if an article is "new" (published within the last 30 days)
 */
function isNewArticle(date?: string | Date): boolean {
  if (!date) return false
  
  const articleDate = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const daysDiff = Math.floor((now.getTime() - articleDate.getTime()) / (1000 * 60 * 60 * 24))
  
  return daysDiff <= 30 && daysDiff >= 0
}
</script>

