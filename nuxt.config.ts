// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxtjs/i18n"],
    css: ["~/assets/css/main.css", "~/assets/css/fonts.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    i18n: {
        locales: ["en", "zh-Hans", "zh-Hant", "ja", "ko"],
        defaultLocale: "en",
        vueI18n: "./i18n.config.ts",
    },
});
