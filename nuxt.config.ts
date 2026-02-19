// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@pinia/nuxt'],
  ssr: false,

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    public: {
      googleClientId: process.env.GOOGLE_CLIENT_ID || '',
      siteUrl: process.env.SITE_URL || 'http://localhost:4242',
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || ''
    }
  },

  routeRules: {
    '/': { prerender: true }
  },
  devServer: {
    port: 4242
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
