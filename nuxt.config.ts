// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    ZoomVideoSDKKey: process.env.ZOOM_SDK_KEY,
    ZoomVideoSDKSecret: process.env.ZOOM_SDK_SECRET,
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      script: [
        { src: '/coi-serviceworker.js', }
      ],
    }
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'video-player-container'
    }
  },

  compatibilityDate: '2024-10-21',
})