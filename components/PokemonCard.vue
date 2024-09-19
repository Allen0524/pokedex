<script setup lang="ts">
const localePath = useLocalePath();
const props = defineProps<{
    id?: number;
    name?: string;
    order?: number;
    imagePath?: string;
    types?: { type: { name: string; url: string } }[];
}>();

function formatPokedexNumber(number: number): string {
    return number.toString().padStart(3, "0");
}
</script>

<template>
    <NuxtLink
        :key="props.id"
        :to="localePath(`/pokemon/${props.id}`)"
        prefetch-on="interaction"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
    >
        <div class="relative">
            <img
                :src="props.imagePath"
                :alt="props.name"
                class="w-full h-48 object-contain object-center bg-gray-100 dark:bg-gray-700"
            />
            <span
                class="absolute top-2 left-2 bg-gray-800 dark:bg-gray-200 bg-opacity-70 dark:bg-opacity-70 text-white dark:text-gray-800 px-2 py-1 rounded-full text-xs font-semibold"
                ># {{ props?.order ? formatPokedexNumber(props.order) : "" }}</span
            >
        </div>
        <div class="p-4 flex flex-col justify-between flex-grow">
            <span class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{{
                props.name
            }}</span>
            <div class="flex flex-wrap gap-2 justify-center">
                <PokemonType
                    v-for="type in props.types"
                    :key="type.type.name"
                    :type="type.type.name"
                    size="sm"
                />
            </div>
        </div>
    </NuxtLink>
</template>
