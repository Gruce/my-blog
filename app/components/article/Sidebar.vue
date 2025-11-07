<template>
  <div>
    <!-- Mobile Overlay -->
    <ClientOnly>
      <div 
        v-if="sidebarOpen" 
        class="fixed inset-0 bg-black/50 z-40 lg:hidden" 
        @click="closeSidebar"
        @touchstart="(e: TouchEvent) => { e.preventDefault(); closeSidebar(); }"
      />
    </ClientOnly>

    <!-- Desktop Sidebar - Teleported to body for proper fixed positioning -->
    <Teleport to="body">
      <aside 
        v-if="!isClient || windowWidth >= 1024"
        class="fixed left-0 top-0 w-80 border-r border-zinc-800 bg-zinc-950 z-50 h-screen hidden lg:block"
        :style="sidebarStyle"
        @click.stop 
        @mouseenter="handleSidebarMouseEnter" 
        @mouseleave="handleSidebarMouseLeave"
      >
        <div 
          ref="sidebarScrollRef" 
          class="w-full overflow-y-auto p-4 h-full"
          style="-webkit-overflow-scrolling: touch; touch-action: auto;"
        >
          <ArticleSidebarContent
            :sections="sections"
            :header-name-class="headerNameClass"
            :header-subtitle-class="headerSubtitleClass"
            :section-button-class="sectionButtonClass"
            :section-count-class="sectionCountClass"
            :series-button-class="seriesButtonClass"
            :get-home-link-class="getHomeLinkClass"
            :get-article-link-class="getArticleLinkClass"
            :is-section-expanded="isSectionExpanded"
            :is-series-expanded="isSeriesExpanded"
            :toggle-section="toggleSection"
            :toggle-series="toggleSeries"
            @close="closeSidebar"
          />
        </div>
      </aside>
    </Teleport>

    <!-- Main Layout Container -->
    <div class="flex" :class="{ 'lg:ml-80': !isClient || windowWidth >= 1024 }">
      <!-- Mobile Sidebar (Fixed Overlay) -->
      <ClientOnly>
        <Transition name="slide-left">
          <aside 
            v-if="windowWidth < 1024 && sidebarOpen"
            class="lg:hidden fixed left-0 top-0 h-screen w-80 border-r border-zinc-800 bg-zinc-950 z-50" 
            @click.stop
          >
            <div 
              ref="sidebarScrollRef" 
              class="w-full overflow-y-auto p-4 h-full"
              style="-webkit-overflow-scrolling: touch; touch-action: auto;"
            >
              <ArticleSidebarContent
                :sections="sections"
                :header-name-class="headerNameClass"
                :header-subtitle-class="headerSubtitleClass"
                :section-button-class="sectionButtonClass"
                :section-count-class="sectionCountClass"
                :series-button-class="seriesButtonClass"
                :get-home-link-class="getHomeLinkClass"
                :get-article-link-class="getArticleLinkClass"
                :is-section-expanded="isSectionExpanded"
                :is-series-expanded="isSeriesExpanded"
                :toggle-section="toggleSection"
                :toggle-series="toggleSeries"
                @close="closeSidebar"
              />
            </div>
          </aside>
        </Transition>
      </ClientOnly>

      <!-- Main Content Slot -->
      <div class="flex-1 w-full">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { useArticleSidebar } from '~/composables/useArticleSidebar'
import type { PostItem } from '~/composables/types'

const props = defineProps<{
  posts: PostItem[]
  currentPath: string
}>()

const sidebar = useArticleSidebar(toRef(props, 'posts'), props.currentPath)

const {
  sections,
  sidebarOpen,
  sidebarScrollRef,
  isClient,
  windowWidth,
  headerNameClass,
  headerSubtitleClass,
  sectionButtonClass,
  sectionCountClass,
  seriesButtonClass,
  sidebarStyle,
  toggleSection,
  toggleSeries,
  isSectionExpanded,
  isSeriesExpanded,
  getHomeLinkClass,
  getArticleLinkClass,
  handleSidebarMouseEnter,
  handleSidebarMouseLeave
} = sidebar

const closeSidebar = () => {
  sidebarOpen.value = false
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

defineExpose({
  sidebarOpen,
  closeSidebar,
  toggleSidebar
})
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-left-enter-from {
  transform: translateX(-100%);
}

.slide-left-enter-to {
  transform: translateX(0);
}

.slide-left-leave-from {
  transform: translateX(0);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}
</style>

<style>
/* Hide desktop sidebar on mobile screens during SSR */
@media (max-width: 1023px) {
  aside[class*="fixed left-0 top-0 w-80"] {
    display: none !important;
  }
}
</style>

