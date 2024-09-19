<script setup lang="ts">
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const { locale } = useI18n();
const LANGUAGES = [
    { label: "English", value: "en" },
    { label: "简体中文", value: "zh-Hans" },
    { label: "繁體中文", value: "zh-Hant" },
    { label: "日本語", value: "ja" },
    { label: "한국어", value: "ko" },
];

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

const toggleDarkMode = () => {
    colorMode.preference = isDark.value ? "light" : "dark";
};
</script>

<template>
    <header
        class="container sticky top-0 mx-auto px-4 flex items-center z-50 justify-between py-10 bg-gray-50 dark:bg-gray-900"
    >
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="flex items-center gap-3" aria-label="Go to homepage">
            <img src="/images/logo.webp" alt="PokéDex Logo" class="h-16 w-auto" />
            <span class="text-3xl font-bold font-comforter text-gray-800 dark:text-gray-100"
                >PokeDict</span
            >
        </NuxtLink>

        <!-- Naigation -->
        <div class="flex items-center gap-4">
            <!-- TODO: Change another component for better accessibility -->
            <UPopover :popper="{ placement: 'bottom-end' }" aria-label="Select language">
                <UButton
                    variant="ghost"
                    icon="i-heroicons-globe-alt"
                    class="p-2 text-gray-600 dark:text-gray-300"
                    aria-label="Change language"
                />

                <template #panel>
                    <div class="py-1 bg-white dark:bg-gray-800 rounded-md shadow-lg">
                        <NuxtLink
                            v-for="item in LANGUAGES"
                            :key="item.value"
                            :to="switchLocalePath(item.value)"
                            class="block px-6 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap"
                            :class="{
                                'bg-gray-100 dark:bg-gray-700 font-semibold': item.value === locale,
                            }"
                            >{{ item.label }}</NuxtLink
                        >
                    </div>
                </template>
            </UPopover>
            <UButton
                :icon="isDark ? 'i-heroicons:moon' : 'i-heroicons:sun'"
                variant="ghost"
                aria-label="Toggle dark mode"
                @click="toggleDarkMode"
                class="text-gray-700 dark:text-gray-300 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            />
        </div>
    </header>
</template>
