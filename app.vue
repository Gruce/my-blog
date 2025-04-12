<template>
  <div>
    <NuxtRouteAnnouncer />
    <h1>Welcome</h1>
    <p>
      Doing things at <a target="_blank" href="https://dudes.studio">DUDES Studio</a>.
    </p>
    <!-- <div class="w-[100dvw] h-[100dvh] flex justify-center items-center">
      <div class="aspect-square flex justify-center" :style="{ width: `${size}px`, height: `${size}px` }">
        <Shape v-model="activeGroup" :size="size" />
      </div>
    </div> -->
</div>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const activeGroup = ref(1)

const breakpoints = useBreakpoints(breakpointsTailwind)
const mobile = breakpoints.smaller('sm')
const size = computed(() => mobile.value ? 256 : 256);
</script>

<style>
body {
  font-family: "IBM Plex Mono", monospace;
  /* background-color: black; */
  color: white;
  padding: 20px;
}

a {
  color: white;
}
</style>