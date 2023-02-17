import stylelintPlugin from "vite-plugin-stylelint";
import en from "./locales/en";
import cn from "./locales/cn";

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
    },
    plugins: [stylelintPlugin()]
  },
  modules: ["@pinia/nuxt", "@nuxtjs/i18n", "@vueuse/nuxt"],
  i18n: {
    vueI18n: {
      legacy: false,
      globalInjection: true,
      fallbackLocale: "cn",
      warnHtmlMessage: false,
      messages: { "zh-CN": cn, en },
      fallbackWarn: false
    }
  },
  plugins: [
    {
      src: "@/plugins/index.ts",
      ssr: false,
      mode: "client"
    }
  ]
});
