<script setup lang="ts">
import Container from "~/components/Container.vue";
</script>

<template>
    <Container tag="section" class="text-center max-w-[860px]">
        <p class="text-left font-josefin text-4xl pt-16 pb-[30%]">
            The most comprehensive Pokémon encyclopedia, guilding you through the secrets of every
            Pokémon.
        </p>

        <NuxtLink
            to="/pokemons"
            class="text-4xl px-8 py-3 text-indigo-700 transition-transform hover:scale-105"
        >
            Explore
        </NuxtLink>
    </Container>
</template>
