<script setup lang="ts">
import { storeToRefs } from "pinia";

const { locale } = useI18n();
const store = useConfigStore();
const { loading, currentPage, pokemons, itemsPerPage, totalCount } = storeToRefs(store);

onMounted(() => {
    store.fetchPokemons();
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
        <template v-else-if="pokemons.length > 0">
            <PokemonCard
                v-for="{ pokemon, species } in pokemons"
                :key="pokemon.id"
                :id="pokemon.id"
                :name="
                    species.names.find((name) => name.language.name === locale)?.name ||
                    pokemon.name
                "
                :order="pokemon.order"
                :imagePath="pokemon.sprites.other['official-artwork'].front_default"
                :types="pokemon.types"
            />
        </template>
        <div
            v-else
            class="col-span-full flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg"
        >
            <UIcon name="i-heroicons-face-frown" class="text-6xl text-gray-400 mb-4" />
            <h3 class="text-xl font-semibold text-gray-700 mb-2">
                {{ $t("common.noPokemonsFound") }}
            </h3>
        </div>
    </div>
    <UPagination
        v-if="pokemons.length > 0"
        :prev-button="{
            icon: 'i-heroicons-arrow-small-left-20-solid',
            label: '',
            color: 'gray',
        }"
        :next-button="{
            icon: 'i-heroicons-arrow-small-right-20-solid',
            label: '',
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
