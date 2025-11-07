<template>
  <div class="min-h-screen mx-auto">
    <NuxtRouteAnnouncer />

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en', class: 'dark' },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#000000' },
    { property: 'og:site_name', content: 'Hassan K. Al-Khalidi' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  titleTemplate: (title?: string) => title ? `${title} · Hassan K. Al-Khalidi` : 'Hassan K. Al-Khalidi'
})

// Enhanced page tracking with custom parameters
const route = useRoute()
const { gtag } = useGtag()

watch(
  () => route.fullPath,
  () => {
    if (process.client) {
      try {
        // Track page view with enhanced parameters
        gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: route.fullPath,
          content_group1: route.path.startsWith('/blog/startup') ? 'startup' : 
                         route.path.startsWith('/blog/tech') ? 'tech' :
                         route.path.startsWith('/blog/design') ? 'design' :
                         route.path.startsWith('/blog/events') ? 'events' : 'other'
        })
      } catch (error) {
        console.warn('Analytics tracking error:', error)
      }
    }
  },
  { immediate: true }
)
</script>

<style>
body {
  font-family: "IBM Plex Mono", monospace;
  background-color: black;
  color: white;
}
html, body {
  width: 100%;
  overflow-x: hidden;
}
</style>