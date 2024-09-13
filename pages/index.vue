<script setup lang="ts"></script>

<template>
    <section class="container mx-auto px-4 text-center max-w-[860px]">
        <p class="text-left font-josefin text-4xl pt-16 pb-[30%]">
            The most comprehensive Pokémon encyclopedia, guilding you through the secrets of every
            Pokémon.
        </p>

        <NuxtLink
            to="/pokemons"
            class="text-4xl px-8 py-3 text-indigo-700 transition-transform hover:scale-105"
        >
            <!-- <UButton
                size="xl"
                variant="solid"
                class="text-xl px-8 py-3 transition-transform hover:scale-105"
                ></UButton
            > -->
            Explore
        </NuxtLink>
    </section>
</template>
