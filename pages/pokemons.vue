<script setup lang="ts">
import type { Pokemon } from "@/mockup/pokemons";
const { data } = await useFetch<Pokemon[]>("/api/pokemons");
</script>

<template>
    <Container>
        <h1>Pokémon Directory</h1>
        <div class="flex flex-col md:flex-row gap-8">
            <!-- Left side - Filter -->
            <div>
                <PokemonFilter />
            </div>

            <!-- Right side - List -->
            <div v-if="data">
                <PokemonList :pokemons="data" />
            </div>
            <div v-else>
                <p>no results</p>
            </div>
        </div>
    </Container>
</template>
