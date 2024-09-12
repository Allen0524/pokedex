<script setup lang="ts">
const languages = [
    [{ label: "English", value: "en", click: () => switchLanguage("en") }],
    [{ label: "繁體中文", value: "zh-TW", click: () => switchLanguage("zh-TW") }],
    [{ label: "日本語", value: "ja", click: () => switchLanguage("ja") }],
];

const switchLanguage = (value: string) => {
    console.log(value);
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
    <header class="container mx-auto px-4 flex items-center justify-between py-10">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3">
            <img src="/images/logo.webp" alt="PokéDex Logo" class="h-16 w-auto" />
            <span class="text-2xl font-bold">PokeDict</span>
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
