import { defineStore } from "pinia";
import type { Pokemon, PokemonSpecies, PokemonTypesResponse } from "~/types/pokemon";

interface FilterState {
    name: string;
    types: Set<number>;
}

export const useConfigStore = defineStore("config", {
    state: () => ({
        totalCount: 0,
        currentPage: 1,
        itemsPerPage: 16,
        pokemons: [] as { pokemon: Pokemon; species: PokemonSpecies }[],
        allUrls: [] as string[],
        filters: {
            name: "",
            types: new Set(),
        } as FilterState,
        loading: true,
        error: null as string | null,
    }),

    getters: {
        offset(): number {
            return (this.currentPage - 1) * this.itemsPerPage;
        },
        pokemonUrls(): string[] {
            const startId = (this.currentPage - 1) * this.itemsPerPage + 1;
            const endId = startId + this.itemsPerPage - 1;
            return Array.from(
                { length: this.itemsPerPage },
                (_, index) => `https://pokeapi.co/api/v2/pokemon/${startId + index}`
            );
        },
        chunkedUrls(): string[] {
            // slice means from start to end(not included)
            return this.allUrls.slice(this.offset, this.offset + this.itemsPerPage);
        },
    },

    actions: {
        setFilters(newFilters: FilterState) {
            this.filters = { ...this.filters, ...newFilters };
        },
        clearFilters() {
            this.filters.name = "";
            this.filters.types.clear();
        },

        async fetchTotalCount() {
            if (this.totalCount === 0) {
                const { data } = await useFetch<{ count: number }>(
                    "https://pokeapi.co/api/v2/pokemon?limit=1"
                );
                if (data.value) {
                    this.totalCount = data.value.count;
                }
            }
        },

        async getAllPokemonUrls() {
            const data = await $fetch<{
                results: { name: string; url: string }[];
                count: number;
            }>("https://pokeapi.co/api/v2/pokemon?limit=1000000");

            this.totalCount = data.count || 0;
            this.allUrls = data.results.map((i) => i.url);
        },

        async getUrlsByTypeFilters() {
            const baseUrl = "https://pokeapi.co/api/v2/type/";
            const pokemonsUrls = Array.from(this.filters.types).map((type) => `${baseUrl}${type}`);

            const pokemons = await Promise.all(
                pokemonsUrls.map((url) => $fetch<PokemonTypesResponse>(url))
            );

            let urls = [] as string[];
            pokemons.forEach((i) => {
                const k = i.pokemon.map((j) => j.pokemon.url);
                urls = [...urls, ...k];
            });
            this.totalCount = urls.length || 0;
            this.allUrls = urls;
        },

        async fetchPokemons() {
            this.loading = true;
            try {
                if (this.filters.types.size > 0 || this.filters.name !== "") {
                    await this.getUrlsByTypeFilters();
                    const data = await fetchPokemonAndSpecies(this.chunkedUrls);
                    this.pokemons = data.filter((pokemon) => pokemon !== null);
                } else {
                    await this.getAllPokemonUrls();
                    const data = await fetchPokemonAndSpecies(this.chunkedUrls);
                    this.pokemons = data.filter((pokemon) => pokemon !== null);
                }
            } catch (error) {
                this.error = error as string;
            } finally {
                this.loading = false;
            }
        },

        setCurrentPage(page: number) {
            this.currentPage = page;
            this.fetchPokemons();
        },

        toggleType(type: number) {
            if (this.filters.types.has(type)) {
                this.filters.types.delete(type);
            } else {
                this.filters.types.add(type);
            }

            this.currentPage = 1;
            this.fetchPokemons();
        },
    },
});
