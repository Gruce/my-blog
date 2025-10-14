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
          <p class="text-zinc-400 mt-1 text-sm">CEO, DUDES Studio • Co-Founder, Enab عنب</p>
          <NuxtLink 
            to="/about" 
            class="inline-block mt-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
          >
            About →
          </NuxtLink>
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
  title: 'Hassan K. Al-Khalidi (gruceing) — Engineering, Design & Events',
  ogTitle: 'Hassan K. Al-Khalidi (gruceing) — Engineering, Design & Events',
  description: 'Hassan K. Al-Khalidi (gruceing) - Software engineer, technical writer, and developer advocate. Engineering insights, design principles, and event coverage.',
  ogDescription: 'Hassan K. Al-Khalidi (gruceing) - Software engineer, technical writer, and developer advocate. Engineering insights, design principles, and event coverage.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  author: 'Hassan K. Al-Khalidi',
  twitterCreator: '@gruceing',
  twitterSite: '@gruceing',
  keywords: 'Hassan K. Al-Khalidi, Hassan Alkhalidi, حسن الخالدي, حسن, حسن خالد, gruce, gruceing, software engineering, technical writing, web development, frontend architecture, engineering culture'
})

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Hassan K. Al-Khalidi',
        alternateName: ['Hassan Alkhalidi', 'حسن الخالدي', 'حسن', 'حسن خالد', 'gruce', 'gruceing'],
        url: 'https://gruceing.dev',
        sameAs: [
          'https://github.com/gruce',
          'https://instagram.com/gruceing',
          'https://www.linkedin.com/in/gruceing/'
        ],
        jobTitle: 'Software Engineer & Technical Writer',
        description: 'Hassan K. Al-Khalidi (gruceing) - Software engineer, technical writer, and developer advocate specializing in modern web technologies and engineering practices.',
        image: 'https://gruceing.dev/hassan-alkhalidi.jpg',
        knowsAbout: ['Software Engineering', 'Web Development', 'Frontend Architecture', 'Technical Writing', 'Engineering Culture', 'Design Systems'],
        alumniOf: 'Software Engineering',
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Software Engineer',
          description: 'Full-stack developer specializing in modern web technologies'
        }
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Hassan K. Al-Khalidi Blog',
        description: 'Engineering insights, design principles, and event coverage from Hassan K. Al-Khalidi (gruceing)',
        url: 'https://gruceing.dev',
        author: {
          '@type': 'Person',
          name: 'Hassan K. Al-Khalidi',
          alternateName: ['gruceing', 'حسن الخالدي']
        },
        publisher: {
          '@type': 'Person',
          name: 'Hassan K. Al-Khalidi',
          alternateName: ['gruceing', 'حسن الخالدي']
        },
        numberOfItems: posts.value?.length || 0,
        inLanguage: 'en'
      })
    }
  ]
}))
</script>

<style>

</style>