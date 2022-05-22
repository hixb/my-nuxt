const { head } = require("./nuxt_config/head");

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "my-nuxt",
    ...head
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/css/icon/iconfont.css",
    "@/assets/css/icon/vueasx_icon.css",
    "vuesax/dist/vuesax.css",
    "@/assets/css/theme.less"
  ],

  // Global less
  styleResources: {
    less: [
      "@/assets/css/global.less",
      "@/assets/css/common.less",
      "@/assets/css/public.less"
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/components",
    "@/middleware/auth",
    "@/plugins/index",
    {
      src: "@/plugins/gPlugins",
      mode: "client"
    },
    {
      src: "@/plugins/utils",
      mode: "client"
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
    // style-resources
    "@nuxtjs/style-resources"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    proxyHeaders: true,
    prefix: "/api",
    credentials: true
  },

  proxy: {
    "/api": {
      target: "http://localhost:2521",
      pathRewrite: {
        changeOrigin: true
      }
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // server
  server: {
    host: "127.0.0.1"
  }
};
