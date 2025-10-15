// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxtjs/tailwindcss', '@nuxt/icon', '@nuxtjs/robots', 'nuxt-llms', '@nuxtjs/sitemap', '@nuxt/content', 'nuxt-gtag'],
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
  } as any, 

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
  } as any,
  gtag: {
    enabled: process.env.NODE_ENV === 'production',
    id: 'G-0C97MNN16J',
    config: {
      anonymize_ip: true,
      send_page_view: false,
      page_title: 'Hassan K. Al-Khalidi (gruceing)',
      custom_map: {
        custom_parameter_1: 'category',
        custom_parameter_2: 'reading_time'
      }
    },
    initCommands: [
      ['consent', 'default', {
        ad_user_data: 'granted',
        ad_personalization: 'granted', 
        ad_storage: 'granted',
        analytics_storage: 'granted',
        functionality_storage: 'granted',
        security_storage: 'granted',
        wait_for_update: 500
      }]
    ],
    loadingStrategy: 'async'
  } as any
})