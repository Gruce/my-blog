// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxtjs/tailwindcss', '@nuxt/icon', '@nuxtjs/robots', 'nuxt-llms', '@nuxtjs/sitemap', '@nuxt/content'],
  runtimeConfig: {
    public: {
      siteUrl: 'https://gruceing.dev'
    }
  },
  robots: {
    groups: [{ userAgent: '*', allow: '/' }]
  },
  llms: {
    domain: 'https://gruceing.dev',
    title: 'Hassan K. Al-Khalidi (gruceing) - Engineering, Design & Events',
    description: 'Software engineer, technical writer, and developer advocate specializing in modern web technologies and engineering practices.',
    sections: [
      {
        title: 'Engineering Articles',
        description: 'Technical insights, architecture patterns, and best practices for software engineering',
        contentCollection: 'blog',
        contentFilters: [
          { field: 'category', operator: '=', value: 'tech' },
          { field: 'extension', operator: '=', value: 'md' }
        ]
      },
      {
        title: 'Design Content',
        description: 'User experience principles, design systems, and interface design insights',
        contentCollection: 'blog',
        contentFilters: [
          { field: 'category', operator: '=', value: 'design' },
          { field: 'extension', operator: '=', value: 'md' }
        ]
      },
      {
        title: 'Event Coverage',
        description: 'Conference insights, workshops, and industry events coverage',
        contentCollection: 'blog',
        contentFilters: [
          { field: 'category', operator: '=', value: 'events' },
          { field: 'extension', operator: '=', value: 'md' }
        ]
      }
    ]
  },
  nitro: {
    preset: 'cloudflare_pages',
  },
  content: {
    highlight: {
      theme: {
        default: 'github-dark',
        dark: 'github-dark',
        light: 'github-light'
      },
      preload: ['typescript', 'javascript', 'vue', 'html', 'css', 'json', 'bash', 'yaml']
    },
    markdown: {
      mdc: true
    }
  }, 

  site: {
    url: 'https://gruceing.dev',
    name: 'Hassan K. Al-Khalidi (gruceing)'
  },
  sitemap: {
    sources: [
      '/api/__sitemap__/urls'
    ],
    discoverImages: false,
    xsl: false,
    hostname: process.env.NODE_ENV === 'production' 
      ? 'https://gruceing.dev' 
      : 'http://localhost:3000'
  }
})