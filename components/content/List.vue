<script setup lang="ts">
// Utils from Nuxt Content
const { flatUnwrap } = useUnwrap()

defineProps({
  icon: {
    type: String,
    default: 'heroicons-outline:badge-check'
  }
})
</script>

<template>
  <ul class="p-0">
    <li v-for="(item, index) of flatUnwrap($slots.default(), ['ul'])" :key="index" class="flex space-x-2">
      <span class="flex-shrink-0 w-6 h-6 text-gray-300">{{index+1}}</span>
      <span><Markdown :use="() => item" unwrap="li" /></span>
    </li>
  </ul>
</template>
