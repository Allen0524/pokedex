<script setup lang="ts">
import Container from "~/components/Container.vue";
import { useI18n } from "vue-i18n";

const localePath = useLocalePath();
const { t } = useI18n();

useHead({
    title: "Pokédex",
    meta: [
        {
            name: "description",
            content:
                "The most comprehensive Pokémon encyclopedia, guilding you through the secrets of every Pokémon.",
        },
    ],
});
</script>

<template>
    <Container tag="main" class="text-center max-w-[860px]">
        <h1 class="text-left font-josefin text-4xl pt-16 pb-[30%] text-gray-900 dark:text-gray-100">
            The most comprehensive Pokémon encyclopedia, guilding you through the secrets of every
            Pokémon.
        </h1>

        <NuxtLink
            :to="localePath('/pokemons')"
            :aria-label="t('common.explore')"
            class="inline-flex items-center px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
        >
            <span class="mr-2">{{ t("common.explore") }}</span>
            <UIcon name="i-heroicons-arrow-right-20-solid" />
        </NuxtLink>
    </Container>
</template>
