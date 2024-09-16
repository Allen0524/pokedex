<script setup lang="ts">
const { locale } = useI18n();
const languages = [
    [{ label: "English", value: "en", click: () => switchLanguage("en") }],
    [{ label: "简体中文", value: "zh-Hans", click: () => switchLanguage("zh-Hans") }],
    [{ label: "繁體中文", value: "zh-Hant", click: () => switchLanguage("zh-Hant") }],
    [{ label: "日本語", value: "ja", click: () => switchLanguage("ja") }],
    [{ label: "한국어", value: "ko", click: () => switchLanguage("ko") }],
];

const switchLanguage = (value: string) => {
    locale.value = value;
};

const colorMode = useColorMode();
const isDark = computed({
    get() {
        return colorMode.value === "dark";
    },
    set() {
        colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    },
});
</script>

<template>
    <header
        class="container sticky top-0 bg-white mx-auto px-4 flex items-center z-50 justify-between py-10"
    >
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3">
            <img src="/images/logo.webp" alt="PokéDex Logo" class="h-16 w-auto" />
            <span class="text-3xl font-bold font-comforter">PokeDict</span>
        </NuxtLink>

        <!-- Naigation -->
        <div class="flex items-center gap-4">
            <UDropdown :items="languages">
                <UButton variant="ghost" class="p-2">
                    <img src="/images/globe.svg" alt="Switch Language" class="w-6 h-6" />
                </UButton>
            </UDropdown>
            <UButton
                :icon="isDark ? 'i-heroicons:moon-solid' : 'i-heroicons:sun-solid'"
                variant="ghost"
                aria-label="Theme"
                @click="isDark = !isDark"
                class="text-gray-500 p-2"
            />
        </div>
    </header>
</template>
