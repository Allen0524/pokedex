<script setup lang="ts">
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
        :to="`/pokemon/${props.id}`"
        prefetch-on="interaction"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
        <div class="relative">
            <img
                :src="props.imagePath"
                :alt="props.name"
                class="w-full h-48 object-contain object-center bg-gray-100"
            />
            <span
                class="text-white absolute top-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded-full text-xs font-semibold"
                ># {{ props?.order ? formatPokedexNumber(props.order) : "" }}</span
            >
        </div>
        <div class="p-4 flex flex-col justify-between flex-grow">
            <span class="text-xl font-semibold mb-2">{{ props.name }}</span>
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
