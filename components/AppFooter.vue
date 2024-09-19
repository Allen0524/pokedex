<script setup lang="ts">
const localePath = useLocalePath();
const { t } = useI18n();
</script>

<template>
    <footer class="container mx-auto px-4 py-10">
        <!-- Mobile Layout -->
        <ul class="md:hidden flex items-center justify-between text-xs">
            <li>
                <NuxtLink
                    class="underline underline-offset-2"
                    :to="localePath('/legal-information')"
                    >{{ t("common.leaglInformation") }}</NuxtLink
                >
            </li>
            <li>
                <NuxtLink class="underline underline-offset-2" :to="localePath('/about')">{{
                    t("common.about")
                }}</NuxtLink>
            </li>
            <li>
                <NuxtLink class="underline underline-offset-2" :to="localePath('/site-map')">{{
                    t("common.siteMap")
                }}</NuxtLink>
            </li>
        </ul>
        <div class="flex items-center justify-between">
            <p class="text-center text-sm">© 2024 PokéDict</p>
            <!-- Desktop Layout -->
            <ul class="hidden md:flex items-center justify-between gap-16 text-xs">
                <li>
                    <NuxtLink
                        class="underline underline-offset-2"
                        :to="localePath('/legal-information')"
                        >{{ t("common.leaglInformation") }}</NuxtLink
                    >
                </li>
                <li>
                    <NuxtLink class="underline underline-offset-2" :to="localePath('/about')">{{
                        t("common.about")
                    }}</NuxtLink>
                </li>
                <li>
                    <NuxtLink class="underline underline-offset-2" :to="localePath('/site-map')">{{
                        t("common.siteMap")
                    }}</NuxtLink>
                </li>
            </ul>
            <div class="flex items-center gap-7">
                <a
                    href="https://github.com/Allen0524/pokedex"
                    aria-label="GitHub link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-300"
                >
                    <img src="/images/github.svg" alt="GitHub" class="w-4 h-4" />
                </a>
                <a
                    href="mailto:william0318563@gmail.com"
                    class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-300"
                    aria-label="Gmail link"
                >
                    <img src="/images/gmail.svg" alt="Gmail" class="w-4 h-4" />
                </a>
            </div>
        </div>
    </footer>
</template>
