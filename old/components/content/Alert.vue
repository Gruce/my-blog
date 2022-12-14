<script setup>
defineProps({
  icon: {
    type: String,
    default: 'heroicons-outline:exclamation'
  }
})
</script>

<template>
  <div class="p-4 rounded-md dark:bg-gray-300 bg-gray-50">
    <div class="flex">
      <div v-if="icon" class="flex-shrink-0 mr-3">
        <Icon class="w-5 h-5 text-gray-400 dark:text-gray-600" aria-hidden="true" :name="icon" />
      </div>
      <div>
        <h3 class="m-0 text-base font-medium text-gray-800">
          <Markdown :use="$slots.title" unwrap="p" />
        </h3>
        <div class="mt-2 text-sm text-gray-700">
          <Markdown :use="$slots.default" unwrap="p" />
        </div>
      </div>
    </div>
  </div>
</template>
