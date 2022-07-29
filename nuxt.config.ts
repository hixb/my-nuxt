import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import \"assets/css/common/index.scss\";"
        }
      }
    }
  },
  modules: [ "@intlify/nuxt3" ],
  // config for `@intlify/nuxt3`
  intlify: {
    localeDir: "locales", // set the `locales` directory at source directory of your Nuxt application
    vueI18n: {},
  },
});
