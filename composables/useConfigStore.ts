import { defineStore } from "pinia";
import type { Pokemon, PokemonSpecies, PokemonTypesResponse } from "~/types/pokemon";

export const useConfigStore = defineStore("config", {
    state: () => ({
        totalCount: 0,
        currentPage: 1,
        itemsPerPage: 16,
        loading: true,
        error: shallowRef<Error | null>(null),
        pokemons: shallowRef<{ pokemon: Pokemon; species: PokemonSpecies }[]>([]),
        allUrls: shallowRef<string[]>([]),
        filteredInput: "",
        filteredTypes: shallowRef(new Set<number>()),
    }),

    getters: {
        offset(): number {
            return (this.currentPage - 1) * this.itemsPerPage;
        },
    },

    actions: {
        setFilteredInput(value: string) {
            this.filteredInput = value;
        },

        clearFilters() {
            this.filteredInput = "";
            this.filteredTypes.clear();
            this.currentPage = 1;
            this.fetchPokemons();
        },

        async fetchPokemonUrls() {
            const data = await $fetch<{
                results: { name: string; url: string }[];
                count: number;
            }>("https://pokeapi.co/api/v2/pokemon?limit=1000000");

            this.totalCount = data.count || 0;
            this.allUrls = data.results.map((i) => i.url);
        },

        async fetchPokemonUrlsByType() {
            const baseUrl = "https://pokeapi.co/api/v2/type/";
            const pokemonsUrls = Array.from(this.filteredTypes).map((type) => `${baseUrl}${type}`);

            const pokemons = await Promise.all(
                pokemonsUrls.map((url) => $fetch<PokemonTypesResponse>(url))
            );

            const urls = pokemons.flatMap((i) => i.pokemon.map((j) => j.pokemon.url));
            this.totalCount = urls.length || 0;
            this.allUrls = urls;
        },

        async fetchPokemons() {
            this.loading = true;
            this.error = null;
            try {
                if (this.filteredTypes.size > 0 || this.filteredInput !== "") {
                    await this.fetchPokemonUrlsByType();
                } else {
                    await this.fetchPokemonUrls();
                }

                await this.slicePage();
            } catch (error) {
                this.error = error instanceof Error ? error : new Error(String(error));
            } finally {
                this.loading = false;
            }
        },

        async slicePage() {
            this.loading = true;
            try {
                const chunkedUrls = this.allUrls.slice(
                    this.offset,
                    this.offset + this.itemsPerPage
                );
                const data = await fetchPokemonAndSpecies(chunkedUrls);
                this.pokemons = data.filter((pokemon) => pokemon !== null);
            } catch (error) {
                this.error = error instanceof Error ? error : new Error(String(error));
            } finally {
                this.loading = false;
            }
        },

        debouncedFetchPokemon() {
            const func = debounce(this.fetchPokemons, 300);
            func();
        },

        setCurrentPage(page: number) {
            this.currentPage = page;
            this.slicePage();
        },

        async toggleType(type: number) {
            const newTypes = new Set(this.filteredTypes);
            if (newTypes.has(type)) {
                newTypes.delete(type);
            } else {
                newTypes.add(type);
            }

            this.filteredTypes = newTypes;

            this.currentPage = 1;
            this.fetchPokemons();
        },
    },
});
