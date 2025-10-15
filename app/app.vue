<template>
  <div class="min-h-screen max-w-2xl mx-auto p-6">
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