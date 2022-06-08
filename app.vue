<template>
  <Html lang="en" />
  <Meta property="og:image" content="/cover.jpg" />
  <Meta name="twitter:card" content="summary_large_image" />
  <div class="flex justify-center py-10">
    <img v-if="colorMode.preference === 'dark'" src="/logo-dark.png" class="rounded-lg" width="90" />
    <img v-else src="/logo.png" class="rounded-lg" width="90" />
  </div>
  <Navbar />
  <div class="max-w-2xl px-4 py-10 m-auto bg-white sm:px-8 sm:shadow dark:bg-gray-800 sm:rounded">
    <NuxtPage />
  </div>
</template>

<script setup>
const colorMode = useColorMode();
</script>

<style lang="postcss">
body {
  @apply bg-gray-50 dark:bg-gray-900;
}
</style>
