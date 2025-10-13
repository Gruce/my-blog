<template>
  <!-- Keep this to fetch `default` slot in metadata -->
  <slot v-if="false" />
  <pre ref="el" :style="{ display: rendered ? 'block' : 'none' }" class="not-prose">
    {{ mermaidSyntax }}
  </pre>
</template>

<script setup>
import { nodeTextContent } from '@nuxtjs/mdc/runtime/utils/node'

const el = ref(null)
const rendered = ref(false)
const rerenderCounter = ref(1)
const slots = useSlots()

const mermaidSyntax = computed(() => {
  // Trick to force re-render when the slot content changes (for preview inside studio)
  rerenderCounter.value

  const defaultSlot = slots.default?.()[0]
  if (!defaultSlot) {
    return ''
  }

  // Old syntax with text node
  if (typeof defaultSlot.children === 'string') {
    return defaultSlot.children
  }

  // New syntax with code node
  const codeChild = defaultSlot.children?.default()[0]
  if (codeChild.type !== 'code') {
    return ''
  }

  // New syntax without highlight
  if (typeof codeChild.children === 'string') {
    return codeChild.children
  }

  // New syntax with highlight
  return nodeTextContent(codeChild.children)
})

 async function render() {
   if (!el.value) {
     return
   }
   if (el.value.querySelector('svg')) {
     // Already rendered
     return
   }

   // // Iterate children to remove comments
   for (const child of el.value.childNodes) {
     if (child.nodeType === Node.COMMENT_NODE) {
       el.value.removeChild(child)
     }
   }
   const { default: mermaid } = await import("mermaid")
   
   // Initialize mermaid with dark theme
   mermaid.initialize({
     startOnLoad: false,
     theme: 'dark',
     themeVariables: {
       primaryColor: '#3b82f6',
       primaryTextColor: '#f8fafc',
       primaryBorderColor: '#475569',
       lineColor: '#64748b',
       secondaryColor: '#1e293b',
       tertiaryColor: '#0f172a',
       background: '#0f172a',
       mainBkg: '#1e293b',
       secondBkg: '#334155',
       tertiaryBkg: '#475569',
       nodeBkg: '#1e293b',
       nodeBorder: '#475569',
       clusterBkg: '#0f172a',
       clusterBorder: '#334155',
       defaultLinkColor: '#64748b',
       titleColor: '#f8fafc',
       edgeLabelBackground: '#1e293b',
       edgeLabelColor: '#f8fafc',
       actorBkg: '#1e293b',
       actorBorder: '#475569',
       actorTextColor: '#f8fafc',
       actorLineColor: '#64748b',
       messageColor: '#f8fafc',
       messageBkgColor: '#1e293b',
       messageLineColor: '#64748b',
       labelBoxBkgColor: '#1e293b',
       labelBoxBorderColor: '#475569',
       labelTextColor: '#f8fafc',
       loopTextColor: '#f8fafc',
       activationBkgColor: '#3b82f6',
       activationBorderColor: '#1d4ed8',
       sequenceNumberColor: '#f8fafc',
       sectionBkgColor: '#1e293b',
       altSectionBkgColor: '#334155',
       gridColor: '#475569',
       taskBkgColor: '#1e293b',
       taskTextColor: '#f8fafc',
       taskTextLightColor: '#f8fafc',
       taskTextOutsideColor: '#f8fafc',
       taskTextClickableColor: '#3b82f6',
       activeTaskBkgColor: '#3b82f6',
       activeTaskBorderColor: '#1d4ed8',
       gridColor: '#475569',
       section0: '#1e293b',
       section1: '#334155',
       section2: '#475569',
       section3: '#64748b',
       altSection: '#0f172a',
       pieTitleTextSize: '16px',
       pieTitleTextColor: '#f8fafc',
       pieSectionTextSize: '14px',
       pieSectionTextColor: '#f8fafc',
       pieLegendTextSize: '12px',
       pieLegendTextColor: '#f8fafc',
       pieStrokeColor: '#475569',
       pieStrokeWidth: '2px',
       pieOuterStrokeWidth: '2px',
       pieOuterStrokeColor: '#475569',
       pieOpacity: '0.8'
     },
     flowchart: {
       nodeSpacing: 50,
       rankSpacing: 50,
       curve: 'basis',
       padding: 20
     },
     sequence: {
       diagramMarginX: 50,
       diagramMarginY: 10,
       actorMargin: 50,
       width: 150,
       height: 65,
       boxMargin: 10,
       boxTextMargin: 5,
       noteMargin: 10,
       messageMargin: 35,
       messageAlign: 'center',
       mirrorActors: true,
       bottomMarginAdj: 1,
       useMaxWidth: true,
       rightAngles: false,
       showSequenceNumbers: false
     },
     gantt: {
       titleTopMargin: 25,
       barHeight: 20,
       fontFamily: '"Open-Sans", "sans-serif"',
       fontSize: 11,
       gridLineStartPadding: 35,
       bottomPadding: 25,
       leftPadding: 75,
       rightPadding: 75,
       numberSectionStyles: 4
     }
   })
   
   el.value.classList.add('mermaid')
   rendered.value = true
   await mermaid.run({ nodes: [el.value] })
 }

onBeforeUpdate(() => {
  rerenderCounter.value++
})

onMounted(() => {
  render()
})
</script>

<style>
/* Container styling */
.not-prose {
  @apply bg-zinc-900 border border-zinc-800 rounded-lg p-6 overflow-x-auto my-6;
  text-align: center;
}

/* Center the Mermaid SVG */
.not-prose .mermaid {
  display: inline-block;
  text-align: center;
}

.not-prose .mermaid svg {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .not-prose {
    @apply p-4;
  }
}
</style>
