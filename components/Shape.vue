<template>
  <div class="relative w-full h-full">
    <div class="grid grid-cols-2 grid-rows-2 w-full h-full relative border border-slate-500">

      <div v-element-hover="() => activeGroup = 0" class="border-e border-slate-500 hover:bg-slate-500/15 transition duration-150 z-[10]"></div>
      <div v-element-hover="() => activeGroup = 3" class="border-b border-slate-500 hover:bg-slate-500/15 transition duration-150 z-[10]"></div>
      <div v-element-hover="() => activeGroup = 1" class="border-t border-slate-500 hover:bg-slate-500/15 transition duration-150 z-[10]"></div>
      <div v-element-hover="() => activeGroup = 2" class="border-s border-slate-500 hover:bg-slate-500/15 transition duration-150 z-[10]"></div>

      <div :style="{
        width: `${parentSize / 2}px`,
        height: `${parentSize / 2}px`,
        transform: `translate(${currentBoxPosition.x}px, ${currentBoxPosition.y}px)`,
        backgroundColor: squareColor,
      }" class="absolute cursor-pointer flex justify-center items-center transition-all duration-500 ease z-[10]">

        <div class="absolute w-8 md:w-16 h-8 md:h-16 text-white">SSSS</div>
      </div>

      <div v-for="square in childSquares" class="absolute border border-slate-500 rotate-45" :style="{
        ...square,
        width: `${rotatedSquareSize}px`,
        height: `${rotatedSquareSize}px`,
      }"></div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useTimeoutFn, useIntervalFn } from '@vueuse/core'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { vElementHover } from '@vueuse/components'
import { onMounted } from 'vue'

const breakpoints = useBreakpoints(breakpointsTailwind)
const mobile = breakpoints.smaller('sm')

const activeGroup = defineModel({
  default: 1,
  required: true,
  type: Number,
})

const parentSize = computed(() => mobile.value ? 256 : 384);
const rotatedSquareSize = computed(() => (parentSize.value / 2) / Math.sqrt(2));

// Add a computed property for the square color based on activeGroup
const squareColor = computed(() => {
  switch (activeGroup.value) {
    case 0: return '#3B82F6'; // blue-500
    case 1: return '#10B981'; // emerald-500
    case 2: return '#EF4444'; // red-500
    case 3: return '#8B5CF6'; // violet-500
    default: return '#64748B'; // slate-500
  }
});

// Add a computed property for the page background color
const pageBgColor = computed(() => {
  switch (activeGroup.value) {
    case 0: return '#0A1629'; // very dark blue
    case 1: return '#0A1F19'; // very dark green
    case 2: return '#1A0A0A'; // very dark red
    case 3: return '#130A1A'; // very dark purple
    default: return '#0A0F16'; // very dark slate
  }
});

// Use onMounted to ensure we're in a browser environment
onMounted(() => {
  // Set initial background color
  updateDocumentBackground(pageBgColor.value);
  
  // Watch for changes to pageBgColor
  watch(pageBgColor, (newColor) => {
    updateDocumentBackground(newColor);
  });
});

// Function to update document background
const updateDocumentBackground = (color) => {
  document.body.style.backgroundColor = color;
  document.documentElement.style.backgroundColor = color;
};

const currentBoxPosition = ref({ x: 0, y: 0 });

const multiplier = 1;

const prepareNextGroup = () => {
  const offset = parentSize.value / 4;

  
  switch (activeGroup.value) {
    case 0:
      currentBoxPosition.value = { x: 0, y: 0 };
      break;
    case 1:
      currentBoxPosition.value = { x: 0, y: parentSize.value / 2 };
      break;
    case 2:
      currentBoxPosition.value = { x: (multiplier * parentSize.value / 2) + (-1 * multiplier * 1), y: parentSize.value / 2 };
      break;
    case 3:
      currentBoxPosition.value = { x: multiplier * parentSize.value / 2, y: 0 };
      break;
  }
}

const goNextGroup = () => {
  prepareNextGroup()
  activeGroup.value = (activeGroup.value + 1) % 4;
}

watch(() => activeGroup.value, (newValue) => {
  prepareNextGroup()
})

const childSquares = computed(() => [
  {
    left: `calc(25% - ${rotatedSquareSize.value / 2}px)`,
    top: `calc(50% - ${rotatedSquareSize.value / 2}px)`,
  },
  {
    left: `calc(50% - ${rotatedSquareSize.value / 2}px)`,
    top: `calc(25% - ${rotatedSquareSize.value / 2}px)`,
  },
  {
    left: `calc(75% - ${rotatedSquareSize.value / 2}px)`,
    top: `calc(50% - ${rotatedSquareSize.value / 2}px)`,
  },
  {
    left: `calc(50% - ${rotatedSquareSize.value / 2}px)`,
    top: `calc(75% - ${rotatedSquareSize.value / 2}px)`,
  }
])
</script>
