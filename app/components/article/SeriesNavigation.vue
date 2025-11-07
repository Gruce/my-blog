<template>
  <nav v-if="page?.series && seriesArticles && seriesArticles.length > 0" class="mt-8 sm:mt-10 pt-6 sm:pt-8">
    <!-- More from Series -->
    <div class="mb-4">
      <h3 class="text-sm font-medium text-zinc-400 mb-3">More from {{ page.series }}</h3>

      <!-- Always show all articles in series -->
      <ul class="space-y-2">
        <li v-for="article in seriesArticles" :key="article.id">
          <NuxtLink :to="article.path" class="flex items-start gap-2 group"
            :class="{ 'opacity-100': article.path === page.path, 'opacity-60': article.path !== page.path }">
            <span v-if="article.seriesOrder" class="text-xs text-zinc-600 font-mono flex-shrink-0 mt-0.5">
              {{ article.seriesOrder }}.
            </span>
            <span class="text-sm transition-colors flex-1" :class="article.path === page.path
              ? 'font-medium text-zinc-100'
              : 'text-zinc-300 group-hover:text-white'">
              {{ article.title }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Previous/Next Navigation -->
    <div class="pt-4 border-t border-zinc-800 space-y-4">
      <NuxtLink v-if="previousArticle" :to="previousArticle.path"
        class="group block w-full bg-zinc-900/80 hover:bg-zinc-900 transition-colors duration-200 p-4 rounded-lg">
        <div class="text-xs text-zinc-500 mb-1">Previous</div>
        <div class="flex items-center gap-2 text-sm text-zinc-300 group-hover:text-white transition-colors">
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span class="truncate min-w-0">{{ previousArticle.title }}</span>
        </div>
      </NuxtLink>
      <NuxtLink v-if="nextArticle" :to="nextArticle.path"
        class="group block w-full bg-zinc-900/80 hover:bg-zinc-900 transition-colors duration-200 p-4 rounded-lg">
        <div class="text-xs text-zinc-500 mb-1 text-right">Next</div>
        <div class="flex items-center gap-2 text-sm text-zinc-300 group-hover:text-white transition-colors justify-end">
          <span class="truncate min-w-0">{{ nextArticle.title }}</span>
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  page: any
  seriesArticles: any[]
  previousArticle: any
  nextArticle: any
}>()
</script>

