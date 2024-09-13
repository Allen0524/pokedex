export interface Pokemon {
    id: number;
    name: string;
    type: { name: string; url: string }[];
    abilities: { name: string; url: string; is_hidden: boolean }[];
    images: {
        front_default: string;
        front_shiny: string;
        "official-front_default": string;
    };
    height: number;
    weight: number;
    stats: { base_stat: number; name: string }[];
    cries: string;
    base_experience: number;
}

export const pokemons: Pokemon[] = [
    {
        id: 1,
        name: "Bulbasaur",
        abilities: [
            { name: "overgrow", url: "https://pokeapi.co/api/v2/ability/65/", is_hidden: false },
            { name: "chlorophyll", url: "https://pokeapi.co/api/v2/ability/34/", is_hidden: true },
        ],
        type: [
            { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
            { name: "poison", url: "https://pokeapi.co/api/v2/type/4/" },
        ],
        images: {
            front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            front_shiny:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
            "official-front_default":
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        },
        height: 7,
        weight: 69,
        stats: [
            { base_stat: 45, name: "HP" },
            { base_stat: 49, name: "attack" },
            { base_stat: 49, name: "defense" },
            { base_stat: 65, name: "special-attack" },
            { base_stat: 65, name: "special-defense" },
            { base_stat: 45, name: "speed" },
        ],
        cries: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg",
        base_experience: 64,
    },
    {
        id: 4,
        name: "Charmander",
        type: [{ name: "fire", url: "https://pokeapi.co/api/v2/type/10/" }],
        abilities: [
            { name: "blaze", url: "https://pokeapi.co/api/v2/ability/66/", is_hidden: false },
            { name: "solar-power", url: "https://pokeapi.co/api/v2/ability/94/", is_hidden: true },
        ],
        images: {
            front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
            front_shiny:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/4.png",
            "official-front_default":
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
        },
        height: 6,
        weight: 85,
        stats: [
            { base_stat: 39, name: "HP" },
            { base_stat: 52, name: "attack" },
            { base_stat: 43, name: "defense" },
            { base_stat: 60, name: "special-attack" },
            { base_stat: 50, name: "special-defense" },
            { base_stat: 65, name: "speed" },
        ],
        cries: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/4.ogg",
        base_experience: 62,
    },
    {
        id: 7,
        name: "Squirtle",
        type: [{ name: "water", url: "https://pokeapi.co/api/v2/type/11/" }],
        abilities: [
            { name: "torrent", url: "https://pokeapi.co/api/v2/ability/67/", is_hidden: false },
            { name: "rain-dish", url: "https://pokeapi.co/api/v2/ability/44/", is_hidden: true },
        ],
        images: {
            front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
            front_shiny:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/7.png",
            "official-front_default":
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
        },
        height: 5,
        weight: 90,
        stats: [
            { base_stat: 44, name: "HP" },
            { base_stat: 48, name: "attack" },
            { base_stat: 65, name: "defense" },
            { base_stat: 50, name: "special-attack" },
            { base_stat: 64, name: "special-defense" },
            { base_stat: 43, name: "speed" },
        ],
        cries: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/7.ogg",
        base_experience: 63,
    },
    {
        id: 25,
        name: "Pikachu",
        type: [{ name: "electric", url: "https://pokeapi.co/api/v2/type/13/" }],
        abilities: [
            { name: "static", url: "https://pokeapi.co/api/v2/ability/9/", is_hidden: false },
            {
                name: "lightning-rod",
                url: "https://pokeapi.co/api/v2/ability/31/",
                is_hidden: true,
            },
        ],
        images: {
            front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
            front_shiny:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png",
            "official-front_default":
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
        },
        height: 4,
        weight: 60,
        stats: [
            { base_stat: 35, name: "HP" },
            { base_stat: 55, name: "attack" },
            { base_stat: 40, name: "defense" },
            { base_stat: 50, name: "special-attack" },
            { base_stat: 50, name: "special-defense" },
            { base_stat: 90, name: "speed" },
        ],
        cries: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/25.ogg",
        base_experience: 112,
    },
];
