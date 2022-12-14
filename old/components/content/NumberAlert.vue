<script setup>
defineProps({
  number: {
    type: String,
  }
})
</script>

<template>
  <div class="p-4 mb-2 bg-gray-100 rounded-md dark:bg-gray-300">
    <div class="relative flex">
      <div v-if="number" class="absolute right-0">
        <span class="text-5xl font-semibold text-gray-300 dark:text-gray-400" aria-hidden="true">
            {{number}}
        </span>
      </div>
      <div>
        <h3 class="m-0 text-base font-medium text-gray-900">
          <Markdown :use="$slots.title" unwrap="p" />
        </h3>
        <div class="mt-2 text-sm text-gray-700">
          <Markdown :use="$slots.default" unwrap="p" />
        </div>
      </div>
    </div>
  </div>
</template>
