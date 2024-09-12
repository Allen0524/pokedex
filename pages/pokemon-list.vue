<script setup lang="ts">
const generationOptions = [
    { label: "Generation-i", value: 1, url: "https://pokeapi.co/api/v2/generation/1" },
    { label: "Generation-ii", value: 2, url: "https://pokeapi.co/api/v2/generation/2" },
    { label: "Generation-iii", value: 3, url: "https://pokeapi.co/api/v2/generation/3" },
    { label: "Generation-iv", value: 4, url: "https://pokeapi.co/api/v2/generation/4" },
    { label: "Generation-v", value: 5, url: "https://pokeapi.co/api/v2/generation/5" },
    { label: "Generation-vi", value: 6, url: "https://pokeapi.co/api/v2/generation/6" },
    { label: "Generation-vii", value: 7, url: "https://pokeapi.co/api/v2/generation/7" },
    { label: "Generation-viii", value: 8, url: "https://pokeapi.co/api/v2/generation/8" },
    { label: "Generation-ix", value: 9, url: "https://pokeapi.co/api/v2/generation/9" },
];
</script>

<template>
    <UContainer>
        <h2 class="text-2xl font-bold">Pokemon List</h2>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" />
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            <USelect placeholder="Select Generation" :options="generationOptions" />
        </div>
    </UContainer>
</template>
