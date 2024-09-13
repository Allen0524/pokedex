<script setup lang="ts">
import type { Pokemon } from "@/mockup/pokemons";
const props = defineProps<{ pokemons: Pokemon[] }>();

function formatPokedexNumber(number: number): string {
    return number.toString().padStart(3, "0");
}
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
            v-for="pokemon in pokemons"
            :key="pokemon.id"
            class="bg-white rounded-lg shadow-md p-4 overflow-hidden"
        >
            <div class="relative">
                <img
                    :src="pokemon.images['official-front_default']"
                    :alt="pokemon.name"
                    class="w-full h-48 object-contain object-center bg-gray-100"
                />
                <span
                    class="text-white absolute top-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded-full text-xs font-semibold"
                    ># {{ formatPokedexNumber(pokemon.id) }}</span
                >
            </div>
            <span class="text-xl font-semibold mb-2">{{ pokemon.name }}</span>
            <div class="flex flex-wrap gap-2 justify-center">
                <PokemonType v-for="type in pokemon.type" :key="type.name" :type="type.name" />
            </div>
        </div>
    </div>
</template>
