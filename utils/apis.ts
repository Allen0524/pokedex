import type { Pokemon, PokemonSpecies } from "~/types/pokemon";

export async function fetchPokemonAndSpecies(urls: string[]) {
    const pokemonAndSpeciesPromise = urls.map((url) => {
        return $fetch<Pokemon>(url).then((pokemon) =>
            $fetch<PokemonSpecies>(pokemon.species.url).then((species) => ({
                pokemon,
                species,
            }))
        );
    });

    return Promise.all(pokemonAndSpeciesPromise);
}
