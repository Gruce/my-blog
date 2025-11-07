<template>
  <aside class="w-64 border-r border-zinc-800 bg-zinc-950/50 p-4 overflow-y-auto h-screen sticky top-0">
    <nav class="space-y-1">
      <template v-for="section in sections" :key="section.key">
        <!-- Section Folder -->
        <div>
          <button
            @click="toggleSection(section.key)"
            class="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 rounded-md transition-colors"
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
            <span class="text-xs text-zinc-600">({{ section.items.length }})</span>
          </button>
          
          <!-- Section Content (Series and Standalone Posts) -->
          <div v-if="isSectionExpanded(section.key)" class="ml-4 mt-1 space-y-1">
            <template v-for="item in section.items" :key="'seriesName' in item ? item.seriesName : item.id">
              <!-- Series Folder -->
              <div v-if="'seriesName' in item">
                <button
                  @click.stop="toggleSeries(item.seriesName)"
                  class="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 rounded-md transition-colors"
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
                  <span class="text-xs text-zinc-600">({{ item.items.length }})</span>
                </button>
                
                <!-- Series Articles -->
                <div v-if="isSeriesExpanded(item.seriesName)" class="ml-4 mt-1 space-y-1">
                  <NuxtLink
                    v-for="post in item.items"
                    :key="post.id"
                    :to="post.path"
                    class="flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900/50 rounded-md transition-colors"
                    :class="{ 'text-zinc-100 bg-zinc-900/50': $route.path === post.path }"
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
                class="flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900/50 rounded-md transition-colors"
                :class="{ 'text-zinc-100 bg-zinc-900/50': $route.path === item.path }"
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
  </aside>
</template>

<script setup lang="ts">
type PostItem = { 
  id: string
  path: string
  title: string
  date?: string | Date
  category?: 'tech' | 'design' | 'events' | 'startup'
  series?: string
  seriesOrder?: number
}

type SeriesGroup = { 
  seriesName: string
  items: PostItem[]
  isExpanded: boolean
}

type Group = { key: 'tech' | 'design' | 'events' | 'startup'; title: string; items: (PostItem | SeriesGroup)[] }

const props = defineProps<{
  sections: Group[]
}>()

// Track expanded state
const expandedSections = reactive<Record<string, boolean>>({})
const expandedSeries = reactive<Record<string, boolean>>({})

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
</script>

