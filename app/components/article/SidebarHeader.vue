<template>
  <div :class="spacingClass">
    <NuxtLink to="/" @click="closeSidebar" class="flex items-center gap-3 group">
      <img src="/hassan-alkhalidi.jpg" alt="Hassan K. Al-Khalidi"
        class="w-12 h-12 rounded-lg object-cover border border-zinc-800 flex-shrink-0 group-hover:border-zinc-700 transition-colors" />
      <div class="min-w-0 flex-1">
        <h2 class="text-sm font-medium tracking-tight transition-colors" :class="headerNameClassValue">
          Hassan K. Al-Khalidi
        </h2>
        <p class="text-xs mt-0.5 transition-colors" :class="headerSubtitleClassValue">CEO, DUDES Studio</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed, toValue, type ComputedRef } from 'vue'

const props = defineProps<{
  headerNameClass: string | ComputedRef<string>
  headerSubtitleClass: string | ComputedRef<string>
  noSpacing?: boolean
}>()

const headerNameClassValue = computed(() => toValue(props.headerNameClass))
const headerSubtitleClassValue = computed(() => toValue(props.headerSubtitleClass))
const spacingClass = computed(() => {
  if (props.noSpacing === true) {
    return ''
  }
  return 'mb-6 pb-6 border-b border-zinc-800'
})

const emit = defineEmits<{
  close: []
}>()

const closeSidebar = () => {
  emit('close')
}
</script>

