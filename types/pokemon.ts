export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    order: number;
    base_experience: number;
    sprites: {
        other: {
            front_default: string;
            "official-artwork": {
                front_default: string;
            };
        };
    };
    species: { name: string; url: string };
    types: { type: { name: string; url: string } }[];
    abilities: { ability: { name: string; url: string }; is_hidden: boolean }[];
    stats: { base_stat: number; effort: number; stat: { name: string; url: string } }[];
    cries: { latest: string };
}

export interface PokemonSpecies {
    id: number;
    name: string;
    gender_rate: number;
    capture_rate: number;
    base_happiness: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    has_gender_differences: boolean;
    forms_switchable: boolean;
    growth_rate: { name: string; url: string };
    color: { name: string; url: string };
    shape: { name: string; url: string };
    evolution_chain: { url: string };
    habitat: { name: string; url: string };
    generation: { name: string; url: string };
    genera: { genus: string; language: { name: string; url: string } }[];
}

export interface EvolutionChainLink {
    baby_trigger_item: { name: string; url: string } | null;
    chain: EvolutionChain;
    id: number;
}

export interface EvolutionChain {
    evolution_details: any[];
    evolves_to: EvolutionChain[];
    is_baby: boolean;
    species: { name: string; url: string };
}

export interface ProcessedEvolutionStage {
    id: number;
    name: string;
    image: string;
    evolvesTo: ProcessedEvolutionStage[];
}
