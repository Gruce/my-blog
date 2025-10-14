// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    // '@nuxtjs/sitemap',
    '@nuxt/icon',
    '@nuxtjs/robots',
  ],
  runtimeConfig: {
    public: {
      siteUrl: 'https://gruceing.dev'
    }
  },
  // sitemap: {
  //   defaults: { changefreq: 'weekly', priority: 0.6 },
  // },
  robots: {
    groups: [{ userAgent: '*', allow: '/' }]
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
  }
})