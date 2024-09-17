<script setup lang="ts">
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const languages = [
    [{ label: "English", value: "en" }],
    [{ label: "简体中文", value: "zh-Hans" }],
    [{ label: "繁體中文", value: "zh-Hant" }],
    [{ label: "日本語", value: "ja" }],
    [{ label: "한국어", value: "ko" }],
];

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

const toggleDarkMode = () => {
    colorMode.preference = isDark.value ? "light" : "dark";
};
</script>

<template>
    <header
        class="container sticky top-0 bg-gray-50 dark:bg-gray-900 mx-auto px-4 flex items-center z-50 justify-between py-10 transition-colors duration-300"
    >
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="flex items-center gap-3">
            <img src="/images/logo.webp" alt="PokéDex Logo" class="h-16 w-auto" />
            <span class="text-3xl font-bold font-comforter text-gray-800 dark:text-gray-100"
                >PokeDict</span
            >
        </NuxtLink>

        <!-- Naigation -->
        <div class="flex items-center gap-4">
            <UDropdown :items="languages">
                <UButton variant="ghost" class="p-2">
                    <UIcon
                        name="i-heroicons-globe-alt"
                        class="w-6 h-6 text-gray-600 dark:text-gray-300"
                    />
                </UButton>

                <template #item="{ item }">
                    <NuxtLink :to="switchLocalePath(item.value)">{{ item.label }}</NuxtLink>
                </template>
            </UDropdown>
            <UButton
                :icon="isDark ? 'i-heroicons:moon' : 'i-heroicons:sun'"
                variant="ghost"
                aria-label="Toggle dark mode"
                @click="toggleDarkMode"
                class="text-gray-700 dark:text-gray-300 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full"
            />
        </div>
    </header>
</template>
