<template>
  <div>
    <NuxtRouteAnnouncer />
    <!-- <h1>Welcome</h1>
    <p>
      Doing things at <a target="_blank" href="https://dudes.studio">DUDES Studio</a>.
    </p> -->
    <div class="w-[100dvw] h-[100dvh] flex justify-center items-center">
      <div class="h-64 w-64 sm:h-96 sm:w-96 aspect-square flex justify-center">
        <div class="w-full h-full max-w-[300px] md:max-w-none">
          <ClientOnly>
            <Shape v-model="activeGroup" />
            <template #placeholder>
              <div class="w-full h-full flex justify-center items-center bg-primary/5">
                <div class="w-24 h-24 border border-primary animate-pulse rounded-full"></div>
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>


</div>
</template>

<script setup lang="ts">
const activeGroup = ref(1)
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