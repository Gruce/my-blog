<template>
  <div class="relative w-full max-w-4xl mx-auto">
    <!-- Main image display -->
    <div 
      class="relative overflow-hidden rounded-lg bg-zinc-900 cursor-grab active:cursor-grabbing"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseUp"
    >
      <img
        :src="currentImage"
        :alt="`Image ${currentIndex + 1} of ${images.length}`"
        class="w-full h-64 sm:h-80 md:h-96 object-contain transition-opacity duration-300 select-none cursor-pointer hover:opacity-90"
        @load="onImageLoad"
        @error="onImageError"
        @click="openModal"
        draggable="false"
      />
      
      <!-- Loading overlay -->
      <div v-if="loading" class="absolute inset-0 bg-zinc-900 flex items-center justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-400"></div>
      </div>
      
      <!-- Navigation arrows -->
      <button
        v-if="images && images.length > 1"
        @click="previousImage"
        class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
        :disabled="loading"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        v-if="images && images.length > 1"
        @click="nextImage"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
        :disabled="loading"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <!-- Image counter -->
      <div v-if="images && images.length > 1" class="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
        {{ currentIndex + 1 }} / {{ images.length }}
      </div>
    </div>
    
    <!-- Modal/Lightbox -->
    <div 
      v-if="isModalOpen" 
      class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      @click="closeModal"
    >
      <div class="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
        <!-- Close button -->
        <button
          @click="closeModal"
          class="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <!-- Modal image -->
        <img
          :src="currentImage"
          :alt="`Image ${currentIndex + 1} of ${images.length}`"
          class="max-w-full max-h-full object-contain"
          @click.stop
        />
        
        <!-- Modal navigation arrows -->
        <button
          v-if="images && images.length > 1"
          @click.stop="previousImage"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          v-if="images && images.length > 1"
          @click.stop="nextImage"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        <!-- Modal image counter -->
        <div v-if="images && images.length > 1" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded text-sm">
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
interface Props {
  images?: string[]
  autoplay?: boolean
  autoplayInterval?: number
}

const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  autoplay: false,
  autoplayInterval: 5000
})

const currentIndex = ref(0)
const loading = ref(true)
const isModalOpen = ref(false)

// Touch/Mouse swipe functionality
const touchStartX = ref(0)
const touchStartY = ref(0)
const isDragging = ref(false)
const dragStartX = ref(0)

const currentImage = computed(() => props.images?.[currentIndex.value] || '')

const nextImage = () => {
  if (!props.images || props.images.length <= 1) return
  currentIndex.value = (currentIndex.value + 1) % props.images.length
  loading.value = true
}

const previousImage = () => {
  if (!props.images || props.images.length <= 1) return
  currentIndex.value = currentIndex.value === 0 ? props.images.length - 1 : currentIndex.value - 1
  loading.value = true
}

const goToImage = (index: number) => {
  if (!props.images || index < 0 || index >= props.images.length) return
  currentIndex.value = index
  loading.value = true
}

const onImageLoad = () => {
  loading.value = false
}

const onImageError = (event: Event) => {
  loading.value = false
  console.error('Failed to load image:', currentImage.value)
}

const onThumbnailError = (event: Event) => {
  console.error('Failed to load thumbnail:', event.target)
}

// Touch event handlers
const onTouchStart = (event: TouchEvent) => {
  if (!props.images || props.images.length <= 1) return
  touchStartX.value = event.touches[0].clientX
  touchStartY.value = event.touches[0].clientY
}

const onTouchMove = (event: TouchEvent) => {
  if (!props.images || props.images.length <= 1) return
  event.preventDefault()
}

const onTouchEnd = (event: TouchEvent) => {
  if (!props.images || props.images.length <= 1) return
  
  const touchEndX = event.changedTouches[0].clientX
  const touchEndY = event.changedTouches[0].clientY
  const deltaX = touchEndX - touchStartX.value
  const deltaY = touchEndY - touchStartY.value
  
  // Only trigger swipe if horizontal movement is greater than vertical
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
    if (deltaX > 0) {
      previousImage()
    } else {
      nextImage()
    }
  }
}

// Mouse event handlers for desktop
const onMouseDown = (event: MouseEvent) => {
  if (!props.images || props.images.length <= 1) return
  isDragging.value = true
  dragStartX.value = event.clientX
  event.preventDefault()
}

const onMouseMove = (event: MouseEvent) => {
  if (!isDragging.value || !props.images || props.images.length <= 1) return
  event.preventDefault()
}

const onMouseUp = (event: MouseEvent) => {
  if (!isDragging.value || !props.images || props.images.length <= 1) return
  
  const deltaX = event.clientX - dragStartX.value
  
  if (Math.abs(deltaX) > 50) {
    if (deltaX > 0) {
      previousImage()
    } else {
      nextImage()
    }
  }
  
  isDragging.value = false
}

// Modal functions
const openModal = () => {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden' // Prevent background scrolling
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = 'auto' // Restore scrolling
}


// Autoplay functionality
let autoplayTimer: NodeJS.Timeout | null = null

const startAutoplay = () => {
  if (props.autoplay && props.images.length > 1) {
    autoplayTimer = setInterval(nextImage, props.autoplayInterval)
  }
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
  // Restore body overflow in case component unmounts while modal is open
  document.body.style.overflow = 'auto'
})

// Keyboard support for modal
const handleKeydown = (event: KeyboardEvent) => {
  if (!isModalOpen.value) return
  
  switch (event.key) {
    case 'Escape':
      closeModal()
      break
    case 'ArrowLeft':
      previousImage()
      break
    case 'ArrowRight':
      nextImage()
      break
  }
}

// Add keyboard event listener when modal opens
watch(isModalOpen, (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.removeEventListener('keydown', handleKeydown)
  }
})

// Pause autoplay on hover
const pauseAutoplay = () => {
  if (props.autoplay) {
    stopAutoplay()
  }
}

const resumeAutoplay = () => {
  if (props.autoplay) {
    startAutoplay()
  }
}
</script>
