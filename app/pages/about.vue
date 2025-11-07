<template>
  <ArticleSidebar 
    ref="sidebarRef"
    :posts="posts || []"
    :current-path="'/about'"
  >
    <div class="flex flex-col max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <!-- Mobile Sidebar Header -->
      <div class="lg:hidden mb-6">
        <ArticleSidebarHeader
          :header-name-class="sidebar.headerNameClass"
          :header-subtitle-class="sidebar.headerSubtitleClass"
          @close="() => sidebarRef?.closeSidebar()"
        />
      </div>

      <!-- Mobile Sidebar Toggle -->
      <div class="lg:hidden mb-6 flex justify-end">
        <button 
          @click="toggleSidebar"
          class="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200"
          type="button" 
          aria-label="Toggle navigation"
        >
          <svg v-if="!sidebarOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span class="hidden sm:inline">{{ sidebarOpen ? 'Hide' : 'Show' }} Navigation</span>
        </button>
      </div>

      <!-- Main Content -->
      <div class="space-y-6">
        <!-- Header -->
        <header class="mb-6">
          <div class="flex items-center gap-3 sm:gap-4 mb-4">
            <img 
              src="/hassan-alkhalidi.jpg" 
              alt="Hassan K. Al-Khalidi" 
              class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-zinc-800 flex-shrink-0"
            />
            <div class="min-w-0 flex-1">
              <h1 class="text-xl sm:text-2xl font-medium tracking-tight text-white/95 mb-1">Hassan K. Al-Khalidi</h1>
              <p class="text-zinc-400 text-sm sm:text-base mb-0.5">Software Engineer & Technical Writer</p>
              <p class="text-zinc-500 text-xs sm:text-sm">gruceing • حسن الخالدي</p>
            </div>
          </div>
        </header>

        <!-- Introduction -->
        <section>
          <h2 class="text-lg sm:text-xl font-medium text-white/95 mb-3">About</h2>
          <div class="text-zinc-300 leading-relaxed text-sm">
            <p>
              Software engineer and entrepreneur. CEO of DUDES Studio. Co-founder of Enab عنب. 
              Building at the intersection of technology and traditional industries.
            </p>
          </div>
        </section>

        <!-- Experience -->
        <section>
          <h2 class="text-lg sm:text-xl font-medium text-white/95 mb-3">Experience</h2>
          <div class="space-y-4">
            <!-- DUDES Studio -->
            <div class="border-l-2 border-zinc-800 pl-3 sm:pl-4">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5">
                <div class="flex-1">
                  <h3 class="text-base font-medium text-white/90">Chief Executive Officer</h3>
                  <p class="text-zinc-400 text-xs">DUDES Studio</p>
                </div>
                <div class="text-zinc-400 text-xs whitespace-nowrap">
                  <div>Jun 2024 - Present</div>
                  <div class="text-zinc-500 text-xs">1 yr 6 mos</div>
                </div>
              </div>
            </div>

            <!-- Enab -->
            <div class="border-l-2 border-zinc-800 pl-3 sm:pl-4">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5">
                <div class="flex-1">
                  <h3 class="text-base font-medium text-white/90">Co-Founder</h3>
                  <p class="text-zinc-400 text-xs">Enab عنب</p>
                </div>
                <div class="text-zinc-400 text-xs whitespace-nowrap">
                  <div>Apr 2023 - Present</div>
                  <div class="text-zinc-500 text-xs">2 yrs 8 mos</div>
                </div>
              </div>
            </div>

            <!-- Basra Oil Company -->
            <div class="border-l-2 border-zinc-800 pl-3 sm:pl-4">
              <div class="mb-3">
                <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5">
                  <div class="flex-1">
                    <h3 class="text-base font-medium text-white/90">Basra Oil Company</h3>
                  </div>
                  <div class="text-zinc-400 text-xs whitespace-nowrap">
                    <div>4 yrs 10 mos</div>
                  </div>
                </div>
              </div>

              <!-- Core Analyzer -->
              <div class="ml-0 sm:ml-3 mb-3 pb-3 border-b border-zinc-800/50">
                <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5">
                  <div class="flex-1">
                    <h4 class="text-sm font-medium text-white/80">Core Analyzer</h4>
                    <p class="text-zinc-300 text-xs leading-relaxed">
                      Core analysis. Sample collection. Laboratory testing. Equipment management.
                    </p>
                  </div>
                  <div class="text-zinc-400 text-xs whitespace-nowrap">
                    <div>Aug 2023 - Mar 2024</div>
                    <div class="text-zinc-500 text-xs">8 mos</div>
                  </div>
                </div>
              </div>

              <!-- PVT Analyst -->
              <div class="ml-0 sm:ml-3">
                <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5">
                  <div class="flex-1">
                    <h4 class="text-sm font-medium text-white/80">PVT Analyst for Oil Reservoirs</h4>
                    <p class="text-zinc-300 text-xs leading-relaxed">
                      PVT analysis of oil reservoir samples. Laboratory testing. Data analysis for reservoir optimization.
                    </p>
                  </div>
                  <div class="text-zinc-400 text-xs whitespace-nowrap">
                    <div>Jun 2019 - Aug 2023</div>
                    <div class="text-zinc-500 text-xs">4 yrs 3 mos</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Al Naeem TV -->
            <div class="border-l-2 border-zinc-800 pl-3 sm:pl-4">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5">
                <div class="flex-1">
                  <h3 class="text-base font-medium text-white/90">Software Engineer</h3>
                  <p class="text-zinc-400 text-xs">Al Naeem TV</p>
                  <p class="text-zinc-300 text-xs leading-relaxed">
                    Financial and employee management systems. Laravel, Vue.js, Nuxt.js.
                  </p>
                </div>
                <div class="text-zinc-400 text-xs whitespace-nowrap">
                  <div>Nov 2018 - Mar 2024</div>
                  <div class="text-zinc-500 text-xs">5 yrs 5 mos</div>
                </div>
              </div>
            </div>

            <!-- GPS LVN -->
            <div class="border-l-2 border-zinc-800 pl-3 sm:pl-4">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5">
                <div class="flex-1">
                  <h3 class="text-base font-medium text-white/90">Software Engineer</h3>
                  <p class="text-zinc-400 text-xs">GPS LVN</p>
                  <p class="text-zinc-300 text-xs leading-relaxed">
                    GPS car tracking system. Laravel.
                  </p>
                </div>
                <div class="text-zinc-400 text-xs whitespace-nowrap">
                  <div>Jun 2023 - Sep 2023</div>
                  <div class="text-zinc-500 text-xs">4 mos</div>
                </div>
              </div>
            </div>

            <!-- Ourstory -->
            <div class="border-l-2 border-zinc-800 pl-3 sm:pl-4">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5">
                <div class="flex-1">
                  <h3 class="text-base font-medium text-white/90">Founder</h3>
                  <p class="text-zinc-400 text-xs">Ourstory - Network</p>
                </div>
                <div class="text-zinc-400 text-xs whitespace-nowrap">
                  <div>Apr 2019 - Feb 2022</div>
                  <div class="text-zinc-500 text-xs">2 yrs 11 mos</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Education -->
        <section>
          <h2 class="text-lg sm:text-xl font-medium text-white/95 mb-3">Education</h2>
          <div class="space-y-3">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div>
                <p class="text-zinc-300 text-sm font-medium">Computer Science</p>
                <p class="text-zinc-500 text-xs">University of Basrah</p>
              </div>
              <div class="text-zinc-400 text-xs">
                <span>1st in class</span>
                <span class="mx-1">•</span>
                <span>2023</span>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div>
                <p class="text-zinc-300 text-sm font-medium">Oil Analysis</p>
                <p class="text-zinc-500 text-xs">Basra Oil Technical Institute</p>
              </div>
              <div class="text-zinc-400 text-xs">
                <span>5th in class</span>
                <span class="mx-1">•</span>
                <span>2019</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Connect -->
        <section>
          <h2 class="text-lg sm:text-xl font-medium text-white/95 mb-3">Connect</h2>
          <div class="flex flex-wrap gap-3">
            <a 
              href="https://github.com/gruce" 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-400 hover:text-white rounded-lg transition-colors duration-200"
            >
              <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span class="text-xs">GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/gruceing/" 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-400 hover:text-white rounded-lg transition-colors duration-200"
            >
              <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span class="text-xs">LinkedIn</span>
            </a>
            <a 
              href="https://instagram.com/gruceing" 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-400 hover:text-white rounded-lg transition-colors duration-200"
            >
              <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span class="text-xs">Instagram</span>
            </a>
            <a 
              href="mailto:h.alkhalidi@dudes.studio" 
              class="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-400 hover:text-white rounded-lg transition-colors duration-200"
            >
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="text-xs">Email</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  </ArticleSidebar>
</template>

<script setup lang="ts">
import { type Ref } from 'vue'
import { useArticleSidebar } from '~/composables/useArticleSidebar'
import type { PostItem } from '~/composables/types'

// Fetch all posts for sidebar navigation
const { data: posts } = await useAsyncData<PostItem[]>('blog-sidebar-about', async () => {
  const list = await queryCollection('blog').order('date', 'DESC').all()
  return list.map((p: any) => ({
    id: p.id,
    path: p.path,
    title: p.title,
    date: p.date,
    category: p.category ?? 'tech',
    series: p.series,
    seriesOrder: p.seriesOrder
  }))
})

// Use sidebar composable
const sidebarRef = ref<{ sidebarOpen: Ref<boolean>, closeSidebar: () => void, toggleSidebar: () => void }>()
const postsRef = computed(() => posts.value || [])
const sidebar = useArticleSidebar(postsRef, '/about')

// Get sidebar state for header toggle
const sidebarOpen = computed(() => sidebar.sidebarOpen.value)

const toggleSidebar = () => {
  if (sidebarRef.value) {
    sidebarRef.value.toggleSidebar()
  }
}

// SEO Meta
useSeoMeta({
  title: 'About Hassan K. Al-Khalidi (gruceing) - Software Engineer & Technical Writer',
  ogTitle: 'About Hassan K. Al-Khalidi (gruceing) - Software Engineer & Technical Writer',
  description: 'Learn about Hassan K. Al-Khalidi (gruceing), a software engineer and technical writer specializing in frontend architecture, engineering culture, and developer experience.',
  ogDescription: 'Learn about Hassan K. Al-Khalidi (gruceing), a software engineer and technical writer specializing in frontend architecture, engineering culture, and developer experience.',
  ogType: 'profile',
  twitterCard: 'summary_large_image',
  author: 'Hassan K. Al-Khalidi',
  twitterCreator: '@gruceing',
  twitterSite: '@gruceing',
  keywords: 'Hassan K. Al-Khalidi, Hassan Alkhalidi, حسن الخالدي, حسن, حسن خالد, gruce, gruceing, software engineer, technical writer, frontend architecture, engineering culture, developer experience'
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
        url: 'https://gruceing.dev/about',
        sameAs: [
          'https://github.com/gruce',
          'https://instagram.com/gruceing',
          'https://www.linkedin.com/in/gruceing/'
        ],
        jobTitle: 'Software Engineer & Technical Writer',
        description: 'Hassan K. Al-Khalidi (gruceing) - Software engineer, technical writer, and developer advocate specializing in modern web technologies and engineering practices.',
        image: 'https://gruceing.dev/hassan-alkhalidi.jpg',
        knowsAbout: ['Software Engineering', 'Web Development', 'Frontend Architecture', 'Technical Writing', 'Engineering Culture', 'Design Systems', 'Developer Experience'],
        alumniOf: 'Software Engineering',
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Software Engineer',
          description: 'Full-stack developer specializing in modern web technologies'
        },
        worksFor: {
          '@type': 'Organization',
          name: 'Independent'
        }
      })
    }
  ]
}))
</script>
