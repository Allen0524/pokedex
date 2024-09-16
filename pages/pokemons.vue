<script setup lang="ts">
const { t } = useI18n();

const filters = ref({
    name: "",
    types: [] as string[],
});

// const filteredPokemons = computed(() => {
//     return pokemons.value.filter((pokemon) => {
//         const nameMatch = pokemon.name.toLowerCase().includes(filters.value.name.toLowerCase());
//         const typeMatch =
//             filters.value.types.length === 0 ||
//             pokemon.types.some((type) => filters.value.types.includes(type.name));
//         return nameMatch && typeMatch;
//     });
// });

const applyFilter = (newFilters: { name: string; types: string[]; generations: number[] }) => {
    filters.value = newFilters;
};
</script>

<template>
    <Container>
        <h1>{{ t("common.pokemons") }}</h1>
        <div class="flex flex-col md:flex-row gap-8">
            <!-- Left side - Filter -->
            <div class="w-full md:w-1/3 lg:w-1/4">
                <PokemonFilter @filter-change="applyFilter" />
            </div>

            <!-- Right side - List -->
            <div class="w-full md:w-2/3 lg:w-3/4">
                <PokemonList />
            </div>
        </div>
    </Container>
</template>
