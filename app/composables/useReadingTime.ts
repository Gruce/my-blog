import { computed, type Ref } from 'vue'

export function useReadingTime(page: Ref<any>) {
  const readingTime = computed(() => {
    if (!page.value) return 0

    // Extract text from minimark structure
    const extractText = (node: any): string => {
      if (!node) return ''
      if (typeof node === 'string') return node
      if (Array.isArray(node)) {
        return node.map(extractText).join(' ')
      }
      if (node.children && Array.isArray(node.children)) {
        return node.children.map(extractText).join(' ')
      }
      if (node.value) {
        return extractText(node.value)
      }
      return ''
    }

    let content = ''
    if (page.value.body?.value) {
      content = extractText(page.value.body.value)
    }

    if (!content) return 0

    const words = content
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((word: string) => word.length > 0)

    // Average reading speed: 200 words per minute
    return Math.ceil(words.length / 200)
  })

  return { readingTime }
}

