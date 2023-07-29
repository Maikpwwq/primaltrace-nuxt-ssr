// https://nuxt.com/docs/api/configuration/nuxt-config
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
      "process.env.DEBUG": false,
    },
  },
  nitro: {
    serveStatic: true,
  },
  devServerHandlers: [],
  hooks: {},
  runtimeConfig: {
    // The private keys which are only available within server-side
    // Keys within public, will be also exposed to the client-side
    public: {
      apiKeyTatum: process.env.NUXT_API_KEY_TATUM || "",
      apiKeyThirdWeb: process.env.NUXT_THIRDWEB_PRIVATE_KEY || "",
      clientIdThirdWeb: process.env.VITE_THIRDWEB_CLIENT_ID || "",
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
      script: [{ src: "@/ethers/index.js" }],
    },
  },
});
