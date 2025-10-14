<template>
  <div class="flex flex-col">
    <header class="mb-10">
      <div class="flex items-center gap-4 mb-6">
        <img 
          src="/hassan-alkhalidi.jpg" 
          alt="Hassan K. Al-Khalidi" 
          class="w-16 h-16 rounded-full object-cover border border-zinc-800"
        />
        <div>
          <h1 class="text-2xl font-medium tracking-tight text-white/95">Hassan K. Al-Khalidi</h1>
          <p class="text-zinc-400 mt-1 text-sm">Engineering, design, and events.</p>
        </div>
      </div>
    </header>

    <nav class="mb-6 flex flex-wrap gap-1">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="active = tab.key"
        class="px-3 py-2 rounded-full border text-xs transition-colors"
        :class="active === tab.key ? 'border-zinc-600 bg-zinc-900 text-zinc-100' : 'border-zinc-800 bg-transparent text-zinc-400 hover:text-zinc-200'"
        :aria-pressed="active === tab.key"
      >
        {{ tab.label }} <span class="text-zinc-500">({{ tab.count }})</span>
      </button>
    </nav>

    <section v-if="active === 'all'" class="space-y-8">
      <div v-for="section in sections" :key="section.key">
        <h2 class="text-sm uppercase tracking-wider text-zinc-500 mb-3">{{ section.title }}</h2>
        <ul class="divide-y divide-zinc-800 border-t border-b border-zinc-800">
          <li v-for="post in section.items" :key="post.id" class="py-3">
            <NuxtLink :to="post.path" class="group flex items-baseline justify-between gap-4">
              <span class="text-[15px] text-zinc-100 group-hover:text-white transition-colors">{{ post.title }}</span>
              <time v-if="post.date" :datetime="post.date" class="text-xs tabular-nums text-zinc-500">{{ new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' }) }}</time>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <section v-else>
      <ul class="divide-y divide-zinc-800 border-t border-b border-zinc-800">
        <li v-for="post in filtered" :key="post.id" class="py-3">
          <NuxtLink :to="post.path" class="group flex items-baseline justify-between gap-4">
            <span class="text-[15px] text-zinc-100 group-hover:text-white transition-colors">{{ post.title }}</span>
            <time v-if="post.date" :datetime="post.date" class="text-xs tabular-nums text-zinc-500">{{ new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' }) }}</time>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
  
</template>

<script setup lang="ts">
type PostItem = { id: string; path: string; title: string; date?: string | Date; category?: 'tech' | 'design' | 'events' }
const { data: posts } = await useAsyncData<PostItem[]>('blog', async () => {
  const list = await queryCollection('blog').order('date', 'DESC').all()
  return list.map((p: any) => ({ id: p.id, path: p.path, title: p.title, date: p.date, category: p.category ?? 'tech' }))
})

type Group = { key: 'tech' | 'design' | 'events'; title: string; items: PostItem[] }
const sections = computed(() => {
  const groups: Record<'tech' | 'design' | 'events', Group> = {
    tech: { key: 'tech', title: 'Articles – Engineering', items: [] },
    design: { key: 'design', title: 'Articles – Design', items: [] },
    events: { key: 'events', title: 'Events & Workshops', items: [] }
  }
  for (const post of (posts.value || [])) {
    const key = (post.category ?? 'tech') as 'tech' | 'design' | 'events'
    groups[key].items.push(post)
  }
  return Object.values(groups).filter((g) => g.items.length > 0)
})

type TabKey = 'all' | 'tech' | 'design' | 'events'
const active = ref<TabKey>('all')

const tabs = computed(() => {
  const counts: Record<TabKey, number> = {
    all: posts.value?.length || 0,
    tech: sections.value.find(s => s.key === 'tech')?.items.length || 0,
    design: sections.value.find(s => s.key === 'design')?.items.length || 0,
    events: sections.value.find(s => s.key === 'events')?.items.length || 0,
  }
  return [
    { key: 'all' as TabKey, label: 'All', count: counts.all },
    { key: 'tech' as TabKey, label: 'Engineering', count: counts.tech },
    { key: 'design' as TabKey, label: 'Design', count: counts.design },
    { key: 'events' as TabKey, label: 'Events', count: counts.events },
  ]
})

const filtered = computed(() => {
  if (active.value === 'all') return posts.value || []
  return (posts.value || []).filter(p => (p.category ?? 'tech') === active.value)
})

useSeoMeta({
  title: 'Hassan K. Al-Khalidi — Blog',
  ogTitle: 'Hassan K. Al-Khalidi — Blog',
  description: 'Engineering, design, and events from Hassan K. Al-Khalidi.',
  ogDescription: 'Engineering, design, and events from Hassan K. Al-Khalidi.',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Blog',
        numberOfItems: posts.value?.length || 0
      })
    }
  ]
}))
</script>

<style>

</style>