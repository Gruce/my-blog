import transformerDirective from '@unocss/transformer-directives'

// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  extends: ['content-wind', '@nuxt-themes/typography'],

  css: ['@/assets/style.scss'],

  modules: [
    '@unocss/nuxt',
    '@nuxthq/studio'
  ],

  unocss: {
    transformers: [
      transformerDirective(),
    ],
  },

})
