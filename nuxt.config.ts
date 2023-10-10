// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        // 默认主屏幕图标
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Apple Touch Icon（iPhone ）
        { rel: 'apple-touch-icon', href: '/avatar.jpg' },
        // Android 主屏幕图标
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/avatar.jpg' },
        // Android Chrome 主屏幕图标
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/avatar.jpg' },
        // 字体
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400&display=swap' },
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: 'https://fonts.font.im/css?family=Barlow|Roboto+Mono|Titillium+Web',
        },
      ],
    },
  },
  css: [
    '~/assets/css/tailwind.scss',
  ],
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/image',
  ],
  colorMode: {
    classSuffix: '',
  },
  typescript: {
    strict: true,
  },
})
