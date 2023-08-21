// https://nuxt.com/docs/api/configuration/nuxt-config
// require("dotenv").config();
export default defineNuxtConfig({
  ssr: false,
  typescript: {
    shim: false,
  },
  build: {
    //   extractCSS: false,
    transpile: ["vuetify"],
  },
  modules: ["@pinia/nuxt"],
  vite: {
    define: {
      // "process.env.DEBUG": false,
      // global: { "window" },
    },
    build: {
      target: "ES2020" // esnext
    },
    // esbuild: {
    //   supported: {
    //     'top-level-await': true //browsers can handle top-level-await features
    //   },
    // }
  },
  nitro: {
    serveStatic: true,
  },
  devServerHandlers: [],
  hooks: {},
  runtimeConfig: {
    // The private keys which are only available within server-side
    // Keys within public, will be also exposed to the client-side
    // https://nuxt.com/docs/guide/going-further/runtime-config#environment-variables
    public: {
      apiKeyTatum: "895dddaf-26df-423e-8995-59c846188749", // process.env.NUXT_API_KEY_TATUM || 
      thirdwebPrivateKey: "EZUlOIvFRwC9LhhQJm9KhKQtTHF_2XH_4W_wnmDCDPLGeMSqpWLd02aC55atOkphWp5lGtsk1pWD82h1oZH48A", // process.env.NUXT_THIRDWEB_PRIVATE_KEY ||  
      thirdwebClientId: "df959d2b2164354dd35f4b73d56570e2", // process.env.NUXT_THIRDWEB_CLIENT_ID || 
      web3authClientID: "BPeTrfVgPsmhRzxk4Js7mMwdQuCm2nrpu0It9HoZ5-f8e-6Y6Nx6qBINcN45q8lzrvTVt2vIKpclcE8OFld8BWU", // `${import.meta.env..VITE_WEB3AUTH_CLIENT_ID}` process.env.NUXT_WEB3AUTH_CLIENT_ID ||
      personalAccountPrivateKey: "46db0fa3c77085d184e9bbb285fb061864774a61574e5b2c19a26d328b3c4e16", // process.env.NUXT_PERSONAL_ACCOUNT_PRIVATE_KEY || 
    },
  },
  // Nuxt has built-in support for loading .env files. Avoid directly importing it from nuxt.config.
  app: {
    head: {
      // meta: [

      // ],
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/images/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      // script: [{ src: "@/ethers/index.js" }],
    },
  },
});
