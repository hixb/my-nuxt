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
  }
});
