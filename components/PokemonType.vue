<script setup lang="ts">
const props = defineProps<{ type: string }>();

const typeColors: { [key: string]: string } = {
    normal: "bg-gray-400 text-white",
    fighting: "bg-red-600 text-white",
    flying: "bg-indigo-300 text-black",
    poison: "bg-purple-500 text-white",
    ground: "bg-yellow-700 text-black",
    rock: "bg-yellow-900 text-white",
    bug: "bg-green-500 text-white",
    ghost: "bg-indigo-900 text-white",
    steel: "bg-gray-500 text-white",
    fire: "bg-red-500 text-white",
    water: "bg-blue-500 text-white",
    grass: "bg-green-600 text-white",
    electric: "bg-yellow-500 text-black",
    psychic: "bg-pink-500 text-white",
    ice: "bg-blue-300 text-black",
    dragon: "bg-indigo-700 text-white",
    dark: "bg-gray-800 text-white",
    fairy: "bg-pink-300 text-black",
    stellar: "bg-purple-300 text-black",
    unknown: "bg-gray-600 text-white",
};
</script>

<template>
    <span class="px-3 py-1 text-xs rounded-md uppercase" :class="typeColors[props.type]">
        {{ type }}
    </span>
</template>
