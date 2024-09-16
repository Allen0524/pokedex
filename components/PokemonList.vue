<script setup lang="ts">
import { storeToRefs } from "pinia";

const { locale } = useI18n();
const store = useConfigStore();
const { loading, currentPage, pokemons, itemsPerPage, totalCount } = storeToRefs(store);

onMounted(() => {
    if (pokemons.value.length === 0) {
        store.fetchPokemons();
    }
});
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <template v-if="loading">
            <div
                v-for="i in itemsPerPage"
                :key="i"
                class="bg-white rounded-lg shadow-md overflow-hidden"
            >
                <USkeleton class="h-48 w-full" />
                <div class="p-4 flex flex-col justify-between flex-grow">
                    <USkeleton class="h-6 w-3/4 mb-2" />
                    <div class="flex gap-2">
                        <USkeleton class="h-7 w-16 rounded-full" />
                        <USkeleton class="h-6 w-16 rounded-full" />
                    </div>
                </div>
            </div>
        </template>
        <template v-else-if="pokemons">
            <PokemonCard
                v-for="pokemon in pokemons"
                :key="pokemon.id"
                :id="pokemon.id"
                :name="
                    pokemon.names.find((name) => name.language.name === locale)?.name ||
                    pokemon.name
                "
                :order="pokemon.order"
                :imagePath="pokemon.sprites.other['official-artwork'].front_default"
                :types="pokemon.types"
            />
        </template>
        <p v-else>No pokemons found.</p>
    </div>
    <UPagination
        :prev-button="{
            icon: 'i-heroicons-arrow-small-left-20-solid',
            label: 'Prev',
            color: 'gray',
        }"
        :next-button="{
            icon: 'i-heroicons-arrow-small-right-20-solid',
            label: 'Next',
            trailing: true,
            color: 'gray',
        }"
        v-model="currentPage"
        :page-count="itemsPerPage"
        :total="totalCount"
        :ui="{ wrapper: 'mt-4 flex justify-center' }"
        @update:modelValue="store.setCurrentPage"
    />
</template>
