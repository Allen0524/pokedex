import { defineStore } from "pinia";
import type { Pokemon, PokemonSpecies } from "~/types/pokemon";

export const useConfigStore = defineStore("config", {
    state: () => ({
        totalCount: 0,
        currentPage: 1,
        itemsPerPage: 16,
        pokemons: [] as Pokemon[],
        loading: true,
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
    },

    actions: {
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

        async fetchPokemons() {
            this.loading = true;
            try {
                const { data: listData } = await useFetch<{
                    results: { name: string; url: string }[];
                    count: number;
                }>(
                    `https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${this.itemsPerPage}`
                );
                if (listData.value) {
                    this.totalCount = listData.value.count;

                    const pokemonAndSpeciesPromise = listData.value.results.map((item) => {
                        return $fetch<Pokemon>(item.url).then((pokemon) =>
                            $fetch<PokemonSpecies>(pokemon.species.url).then((species) => ({
                                ...pokemon,
                                names: species.names,
                            }))
                        );
                    });

                    const datas = await Promise.all(pokemonAndSpeciesPromise);

                    this.pokemons = datas.filter((pokemon) => pokemon !== null);
                }
            } finally {
                this.loading = false;
            }
        },

        setCurrentPage(page: number) {
            this.currentPage = page;
            this.fetchPokemons();
        },
    },
});
