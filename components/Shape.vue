<template>
  <div class="relative w-full h-full">
    <div class="grid grid-cols-2 grid-rows-2 w-full h-full relative border border-slate-500">

      <div v-element-hover="() => handleHover(0)" class="border-e border-slate-500 hover:bg-slate-500/15 transition duration-150 z-[10] col-start-1 row-start-1"></div>
      <div v-element-hover="() => handleHover(3)" class="border-b border-slate-500 hover:bg-slate-500/15 transition duration-150 z-[10] col-start-2 row-start-1"></div>
      <div v-element-hover="() => handleHover(1)" class="border-t border-slate-500 hover:bg-slate-500/15 transition duration-150 z-[10] col-start-1 row-start-2"></div>
      <div v-element-hover="() => handleHover(2)" class="border-s border-slate-500 hover:bg-slate-500/15 transition duration-150 z-[10] col-start-2 row-start-2"></div>

      <div :style="{
        width: `${parentSize / 2}px`,
        height: `${parentSize / 2}px`,
        backgroundColor: squareColor,
        position: 'absolute',
        top: `${currentPosition.y}px`,
        left: `${currentPosition.x}px`,
        transition: 'top 0.3s ease, left 0.3s ease', // Faster transition: 0.5s → 0.3s
      }" class="flex justify-center items-center z-[10]">

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
const displayGroup = ref(1); // Track the visually displayed group
const squareColor = computed(() => {
  switch (displayGroup.value) {
    case 0: return '#3B82F6'; // blue-500
    case 1: return '#10B981'; // emerald-500
    case 2: return '#EF4444'; // red-500
    case 3: return '#8B5CF6'; // violet-500
    default: return '#64748B'; // slate-500
  }
});

// Add a computed property for the page background color
const pageBgColor = computed(() => {
  switch (displayGroup.value) {
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

// Replace currentBoxPosition with grid-based positioning
// Use position-based approach for smooth transitions
// Replace the current position and animation handling with a simpler approach
const currentPosition = ref({ x: 0, y: 0 });
const isAnimating = ref(false);
const previousGroup = ref(1); // Track the previous group to determine path

// Add a new handler for hover events
const handleHover = (group) => {
  // Store the target group but don't update activeGroup immediately
  if (!isAnimating.value) {
    activeGroup.value = group;
  } else {
    // Store the target for when animation completes
    targetGroup.value = group;
  }
}

// Add a ref to track the target group during animation
const targetGroup = ref(null);

// Update prepareNextGroup to implement sequential movement with animation
const prepareNextGroup = () => {
  if (isAnimating.value) return;
  
  const halfSize = parentSize.value / 2;
  const currentGroup = activeGroup.value;
  
  // Get target position based on current group
  let targetPos;
  switch (currentGroup) {
    case 0: targetPos = { x: 0, y: 0 }; break;
    case 1: targetPos = { x: 0, y: halfSize }; break;
    case 2: targetPos = { x: halfSize, y: halfSize }; break;
    case 3: targetPos = { x: halfSize, y: 0 }; break;
  }
  
  // If already at target position, do nothing
  if (currentPosition.value.x === targetPos.x && currentPosition.value.y === targetPos.y) {
    previousGroup.value = currentGroup;
    displayGroup.value = currentGroup; // Update display group
    return;
  }
  
  isAnimating.value = true;
  
  // Determine if we need to move through an intermediate position
  if (Math.abs(previousGroup.value - currentGroup) === 2 || 
      (previousGroup.value === 0 && currentGroup === 3) || 
      (previousGroup.value === 3 && currentGroup === 0)) {
    // Need to move through an intermediate position
    let intermediateGroup;
    
    // Determine the intermediate group
    if (previousGroup.value === 0 && currentGroup === 2) intermediateGroup = 1;
    else if (previousGroup.value === 2 && currentGroup === 0) intermediateGroup = 1;
    else if (previousGroup.value === 1 && currentGroup === 3) intermediateGroup = 0;
    else if (previousGroup.value === 3 && currentGroup === 1) intermediateGroup = 0;
    else if (previousGroup.value === 0 && currentGroup === 3) intermediateGroup = 3; // Fix: blue to purple should go through red
    else if (previousGroup.value === 3 && currentGroup === 0) intermediateGroup = 0; // Fix: purple to blue should go direct
    else intermediateGroup = (previousGroup.value + 1) % 4;
    
    // Get intermediate position
    let intermediatePos;
    switch (intermediateGroup) {
      case 0: intermediatePos = { x: 0, y: 0 }; break;
      case 1: intermediatePos = { x: 0, y: halfSize }; break;
      case 2: intermediatePos = { x: halfSize, y: halfSize }; break;
      case 3: intermediatePos = { x: halfSize, y: 0 }; break;
    }
    
    // First move to intermediate position
    currentPosition.value = intermediatePos;
    
    // Then move to final position after delay
    setTimeout(() => {
      currentPosition.value = targetPos;
      
      // Animation complete
      setTimeout(() => {
        displayGroup.value = currentGroup; // Update colors after animation
        isAnimating.value = false;
        previousGroup.value = currentGroup;
        
        // If a new target was set during animation, update now
        if (targetGroup.value !== null) {
          activeGroup.value = targetGroup.value;
          targetGroup.value = null;
        }
      }, 300); // Faster timeout: 550ms → 300ms
    }, 300); // Faster timeout: 550ms → 300ms
  } else {
    // Direct movement (adjacent cells)
    currentPosition.value = targetPos;
    
    // Animation complete
    setTimeout(() => {
      displayGroup.value = currentGroup; // Update colors after animation
      isAnimating.value = false;
      previousGroup.value = currentGroup;
      
      // If a new target was set during animation, update now
      if (targetGroup.value !== null) {
        activeGroup.value = targetGroup.value;
        targetGroup.value = null;
      }
    }, 300); // Faster timeout: 550ms → 300ms
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
