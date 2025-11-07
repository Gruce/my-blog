<template>
  <div>
    <!-- Sidebar Header (hidden on mobile) -->
    <div class="hidden lg:block">
      <ArticleSidebarHeader
        :header-name-class="headerNameClass"
        :header-subtitle-class="headerSubtitleClass"
        @close="closeSidebar"
      />
    </div>

    <nav class="space-y-0.5">
      <!-- Home Link -->
      <NuxtLink to="/" @click="closeSidebar"
        class="flex items-center gap-2 py-1.5 pl-1 text-sm rounded-md transition-colors"
        :class="getHomeLinkClass($route.path === '/')">
        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span class="flex-1">Home</span>
      </NuxtLink>

      <!-- About Link -->
      <NuxtLink to="/about" @click="closeSidebar"
        class="flex items-center gap-2 py-1.5 pl-1 text-sm rounded-md transition-colors"
        :class="getHomeLinkClass($route.path === '/about')">
        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span class="flex-1">About</span>
      </NuxtLink>

      <template v-for="section in sections" :key="section.key">
        <!-- Section Folder -->
        <div>
          <button @click="toggleSection(section.key)"
            class="w-full flex items-center gap-2 py-2 text-sm rounded-md transition-colors"
            :class="sectionButtonClass" type="button">
            <svg class="w-4 h-4 flex-shrink-0 transition-transform duration-200"
              :class="{ 'rotate-90': isSectionExpanded(section.key) }" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span class="flex-1 text-left">{{ section.title }}</span>
            <span class="text-xs transition-colors" :class="sectionCountClass">({{ section.items.length }})</span>
          </button>

          <!-- Section Content (Series and Standalone Posts) -->
          <div v-if="isSectionExpanded(section.key)" class="ml-6 mt-0.5 space-y-0.5">
            <template v-for="item in section.items" :key="'seriesName' in item ? item.seriesName : item.id">
              <!-- Series Folder -->
              <div v-if="'seriesName' in item">
                <button @click.stop="toggleSeries(item.seriesName)"
                  class="w-full flex items-center gap-2 py-1.5 text-sm rounded-md transition-colors"
                  :class="seriesButtonClass" type="button">
                  <svg class="w-4 h-4 flex-shrink-0 transition-transform duration-200"
                    :class="{ 'rotate-90': isSeriesExpanded(item.seriesName) }" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                  <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  <span class="flex-1 text-left">{{ item.seriesName }}</span>
                  <span class="text-xs transition-colors" :class="sectionCountClass">({{ item.items.length }})</span>
                </button>

                <!-- Series Articles -->
                <div v-if="isSeriesExpanded(item.seriesName)" class="ml-6 mt-0.5 space-y-0.5">
                  <NuxtLink v-for="post in item.items" :key="post.id" :to="post.path" @click="closeSidebar"
                    class="flex items-center gap-2 py-1.5 pl-1 text-sm rounded-md transition-colors"
                    :class="getArticleLinkClass($route.path === post.path)">
                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span class="flex-1 truncate">{{ post.title }}</span>
                  </NuxtLink>
                </div>
              </div>

              <!-- Standalone Post -->
              <NuxtLink v-else :to="item.path" @click="closeSidebar"
                class="flex items-center gap-2 py-1.5 pl-1 text-sm rounded-md transition-colors"
                :class="getArticleLinkClass($route.path === item.path, true)">
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span class="flex-1 truncate">{{ item.title }}</span>
              </NuxtLink>
            </template>
          </div>
        </div>
      </template>
    </nav>
  </div>
</template>

<script setup lang="ts">
import type { Group } from '~/composables/types'

const props = defineProps<{
  sections: Group[]
  headerNameClass: string
  headerSubtitleClass: string
  sectionButtonClass: any
  sectionCountClass: any
  seriesButtonClass: any
  getHomeLinkClass: (isActive: boolean) => any
  getArticleLinkClass: (isActive: boolean, isStandalone?: boolean) => any
  isSectionExpanded: (key: string) => boolean
  isSeriesExpanded: (name: string) => boolean
  toggleSection: (key: string) => void
  toggleSeries: (name: string) => void
}>()

const emit = defineEmits<{
  close: []
}>()

const closeSidebar = () => {
  emit('close')
}
</script>

