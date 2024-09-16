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
        error: null as Error | null,
    }),

    getters: {
        offset(): number {
            return (this.currentPage - 1) * this.itemsPerPage;
        },
        chunkedUrls(): string[] {
            // slice means from start to end(not included)
            return this.allUrls.slice(this.offset, this.offset + this.itemsPerPage);
        },
    },

    actions: {
        clearFilters() {
            this.filters = {
                name: "",
                types: new Set(),
            };
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

            let urls = pokemons.flatMap((i) => i.pokemon.map((j) => j.pokemon.url));
            this.totalCount = urls.length || 0;
            this.allUrls = urls;
        },

        async fetchPokemons() {
            this.loading = true;
            this.error = null;
            try {
                if (this.filters.types.size > 0 || this.filters.name !== "") {
                    await this.getUrlsByTypeFilters();
                } else {
                    await this.getAllPokemonUrls();
                }
                const data = await fetchPokemonAndSpecies(this.chunkedUrls);
                this.pokemons = data.filter((pokemon) => pokemon !== null);
            } catch (error) {
                this.error = error instanceof Error ? error : new Error(String(error));
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
