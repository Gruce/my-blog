import { ref, computed, reactive, watch, watchEffect, onMounted, onUnmounted, nextTick, type Ref, type ComputedRef } from 'vue'
import { useBlogSections } from '~/composables/useBlogSections'
import type { BlogCategory, PostItem } from '~/composables/types'

// Persistent dimming state across navigation (module-level)
let persistentSidebarDimmed = true
let persistentIsInitialLoad = true

export function useArticleSidebar(posts: Ref<PostItem[] | undefined> | ComputedRef<PostItem[]>, currentPath: string) {
  // Track expanded state
  const expandedSections = reactive<Record<string, boolean>>({})
  const expandedSeries = reactive<Record<string, boolean>>({})
  
  // Mobile sidebar toggle
  const sidebarOpen = ref(false)
  const sidebarScrollRef = ref<HTMLElement>()
  
  // Sidebar dimming - use persistent state
  const sidebarDimmed = ref(persistentSidebarDimmed)
  let dimTimeout: ReturnType<typeof setTimeout> | null = null
  let isInitialLoad = ref(persistentIsInitialLoad)
  
  // Client state
  const isClient = ref(false)
  const windowWidth = ref(1920)
  
  // Use shared sections composable
  const { sections } = useBlogSections(posts)

  // Auto-expand current article's section and series
  watchEffect(() => {
    if (!isClient.value || !posts.value) return
    
    const currentPost = posts.value.find(p => p.path === currentPath)
    if (currentPost) {
      const sectionKey = (currentPost.category ?? 'tech') as BlogCategory
      expandedSections[sectionKey] = true
      if (currentPost.series) {
        expandedSeries[currentPost.series] = true
      }
    }
  })

  // Toggle functions
  const toggleSection = (sectionKey: string) => {
    expandedSections[sectionKey] = !expandedSections[sectionKey]
  }

  const toggleSeries = (seriesName: string) => {
    expandedSeries[seriesName] = !expandedSeries[seriesName]
  }

  const isSectionExpanded = (sectionKey: string) => {
    return expandedSections[sectionKey] === true
  }

  const isSeriesExpanded = (seriesName: string) => {
    return expandedSeries[seriesName] === true
  }

  // Desktop check
  const isDesktop = computed(() => {
    if (!isClient.value) return false
    return windowWidth.value >= 1024
  })

  // Dimming state
  const isDimmed = computed(() => {
    if (!isClient.value) return true
    return isDesktop.value && sidebarDimmed.value
  })

  // Style classes
  const dimmedTextClass = computed(() => isDimmed.value ? 'text-zinc-500' : '')
  const headerNameClass = computed(() => {
    if (isDimmed.value) return 'text-zinc-500'
    return 'text-white/95 group-hover:text-white'
  })
  const headerSubtitleClass = computed(() => {
    if (isDimmed.value) return 'text-zinc-500'
    return 'text-zinc-400 group-hover:text-zinc-300'
  })
  const sectionButtonClass = computed(() => {
    if (isDimmed.value) return 'text-zinc-500'
    return 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50'
  })
  const sectionCountClass = computed(() => {
    if (isDimmed.value) return 'text-zinc-500'
    return 'text-zinc-600'
  })
  const seriesButtonClass = computed(() => {
    if (isDimmed.value) return 'text-zinc-500'
    return 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50'
  })

  const getHomeLinkClass = (isActive: boolean) => {
    const base = {
      'bg-zinc-800/50 font-medium': isActive,
      'hover:bg-zinc-900/50': !isActive
    }
    if (isDimmed.value) {
      return { ...base, 'text-zinc-500': true }
    }
    return {
      ...base,
      'text-zinc-100': isActive,
      'text-zinc-500 hover:text-zinc-100': !isActive
    }
  }

  const getArticleLinkClass = (isActive: boolean, isStandalone: boolean = false) => {
    const base = {
      'bg-zinc-800/50 font-medium': isActive,
      'hover:bg-zinc-900/50': !isActive
    }
    if (isDimmed.value) {
      return { ...base, 'text-zinc-500': true }
    }
    return {
      ...base,
      [isStandalone ? 'text-white' : 'text-zinc-100']: isActive,
      'text-zinc-500 hover:text-zinc-100': !isActive
    }
  }

  // Mouse handlers
  const handleSidebarMouseEnter = () => {
    if (isDesktop.value) {
      if (isInitialLoad.value) {
        setTimeout(() => {
          isInitialLoad.value = false
          persistentIsInitialLoad = false
        }, 100)
        return
      }
      sidebarDimmed.value = false
      persistentSidebarDimmed = false
      if (dimTimeout) {
        clearTimeout(dimTimeout)
        dimTimeout = null
      }
    }
  }

  const handleSidebarMouseLeave = () => {
    if (isDesktop.value) {
      if (dimTimeout) {
        clearTimeout(dimTimeout)
      }
      dimTimeout = setTimeout(() => {
        sidebarDimmed.value = true
        persistentSidebarDimmed = true
      }, 2000)
    }
  }

  // Sidebar style
  const sidebarStyle = computed(() => {
    let opacity = '1'
    if (isClient.value) {
      if (windowWidth.value >= 1024) {
        opacity = sidebarDimmed.value ? '0.5' : '1'
      }
    } else {
      opacity = '0.5'
    }

    return {
      opacity,
      transition: 'opacity 0.3s ease-in-out'
    }
  })

  // Body scroll prevention on mobile
  let scrollPosition = 0
  watch(sidebarOpen, (isOpen) => {
    if (isClient.value && window.innerWidth < 1024) {
      if (isOpen) {
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop
        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollPosition}px`
        document.body.style.width = '100%'
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        if (scrollPosition) {
          window.scrollTo(0, scrollPosition)
          scrollPosition = 0
        }
      }
    }
  })

  // Touch event handling
  let touchMoveHandler: ((e: TouchEvent) => void) | null = null
  watchEffect(() => {
    if (isClient.value && sidebarScrollRef.value) {
      if (touchMoveHandler) {
        sidebarScrollRef.value.removeEventListener('touchmove', touchMoveHandler)
      }
      touchMoveHandler = (e: TouchEvent) => {
        e.stopPropagation()
      }
      sidebarScrollRef.value.addEventListener('touchmove', touchMoveHandler, { passive: false })
      return () => {
        if (sidebarScrollRef.value && touchMoveHandler) {
          sidebarScrollRef.value.removeEventListener('touchmove', touchMoveHandler)
        }
      }
    }
  })

  // Mount setup
  onMounted(() => {
    isClient.value = true
    // Restore persistent dimming state instead of resetting
    sidebarDimmed.value = persistentSidebarDimmed
    windowWidth.value = window.innerWidth

    // Only set initial load state if it's truly the first load
    if (persistentIsInitialLoad) {
      nextTick(() => {
        sidebarDimmed.value = true
        persistentSidebarDimmed = true
      })

      setTimeout(() => {
        isInitialLoad.value = false
        persistentIsInitialLoad = false
      }, 500)
    } else {
      isInitialLoad.value = false
    }

    const handleResize = () => {
      windowWidth.value = window.innerWidth
    }
    window.addEventListener('resize', handleResize)

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })
  })

  // Cleanup
  onUnmounted(() => {
    if (dimTimeout) {
      clearTimeout(dimTimeout)
    }
  })

  return {
    sections,
    sidebarOpen,
    sidebarScrollRef,
    expandedSections,
    expandedSeries,
    isClient,
    windowWidth,
    isDesktop,
    isDimmed,
    dimmedTextClass,
    headerNameClass,
    headerSubtitleClass,
    sectionButtonClass,
    sectionCountClass,
    seriesButtonClass,
    sidebarStyle,
    toggleSection,
    toggleSeries,
    isSectionExpanded,
    isSeriesExpanded,
    getHomeLinkClass,
    getArticleLinkClass,
    handleSidebarMouseEnter,
    handleSidebarMouseLeave
  }
}

