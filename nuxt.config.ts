import stylelintPlugin from "vite-plugin-stylelint";
import en from "./locales/en";
import cn from "./locales/cn";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "en"
      },
      link: [
        // 默认主屏幕图标
        { rel: "icon", type: "image/x-icon", href: "/avatar.jpg" },
        // Apple Touch Icon（iPhone ）
        { rel: "apple-touch-icon", href: "/avatar.jpg" },
        // Android 主屏幕图标
        { rel: "icon", type: "image/png", sizes: "192x192", href: "/avatar.jpg" },
        // Android Chrome 主屏幕图标
        { rel: "icon", type: "image/png", sizes: "512x512", href: "/avatar.jpg" }
      ]
    }
  },
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
  modules: ["@pinia/nuxt", "@nuxtjs/i18n", "@vueuse/nuxt", "@unocss/nuxt", "@nuxt/image-edge", "nuxt-purgecss"],
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
      mode: "client"
    }
  ]
});
