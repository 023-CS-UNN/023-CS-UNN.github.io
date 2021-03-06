import colors from "vuetify/es5/util/colors";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - class_list",
    title: "class_list",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { property: "og:site_name", content: "UNN 200 LEVEL STUDENTS" },
      { property: "og:title", content: "Class list generator app" },
      { property: "og:description", content: "The App for generating class lists" },
      { property: "og:image", itemprop:"image", content: "https://avatars.githubusercontent.com/u/82499169?s=200&v=4" },
      { property: "og:type", content: "website" },
      { property: "og:updated_time", content: Date.now() },
    ],
    script: [
      { src: "https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js" },

      { src: "https://www.gstatic.com/firebasejs/8.4.1/firebase-analytics.js" },
      
      { src: "https://www.gstatic.com/firebasejs/8.4.1/firebase-auth.js" },
      { src: "https://www.gstatic.com/firebasejs/8.4.1/firebase-firestore.js" },
      { src: "/firebase-init.js" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      // dark: true,'
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // publicPath: "_nuxt/dist",
    // buildDir :"_nuxt/dist"
  },
  router:{
    // base: '/023-CS-UNN.github.io/'
  },
  generate: {
    exclude: [
      /^\/courseId\//,
    ]
  },
};