<script setup lang="ts">
import type {
    EvolutionChain,
    EvolutionChainLink,
    Pokemon,
    PokemonSpecies,
    ProcessedEvolutionStage,
} from "~/types/pokemon";

interface FetchState<T> {
    status: "pending" | "success" | "error";
    error: Error | null;
    data: T | null;
}

const route = useRoute();
const pokemonId = Number(route.params.id);

const pokemonState = ref<FetchState<Pokemon>>({ data: null, error: null, status: "pending" });
const speciesState = ref<FetchState<PokemonSpecies>>({
    data: null,
    error: null,
    status: "pending",
});
const evolutionChainState = ref<FetchState<EvolutionChainLink>>({
    data: null,
    error: null,
    status: "pending",
});

async function fetchPokemon() {
    const pokemon = await fetchData<Pokemon>(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
        pokemonState
    );
    if (!pokemon) return;

    const species = await fetchData<PokemonSpecies>(pokemon.species.url, speciesState);
    if (!species) return;

    const evolutionChain = await fetchData<EvolutionChainLink>(
        species.evolution_chain.url,
        evolutionChainState
    );
    if (!evolutionChain) return;
}

const fetchData = async <T>(url: string, state: Ref<FetchState<T>>): Promise<T | null> => {
    try {
        state.value.status = "pending";
        const data = (await $fetch<T>(url)) as T;
        state.value = { data, error: null, status: "success" };
        return data;
    } catch (e) {
        state.value = {
            data: null,
            error: e instanceof Error ? e : new Error(String(e)),
            status: "error",
        };
        return null;
    }
};

const processedEvolutionChain = computed(() => {
    if (!evolutionChainState.value.data) return null;
    const processStage = (stage: EvolutionChain): ProcessedEvolutionStage => {
        const id = extractIdFromUrl(stage.species.url);
        return {
            id,
            name: stage.species.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            evolvesTo: stage.evolves_to.map(processStage),
        };
    };
    return processStage(evolutionChainState.value.data.chain);
});

const extractIdFromUrl = (url: string): number => {
    const parts = url.split("/");
    return parseInt(parts[parts.length - 2]);
};

onMounted(() => {
    fetchPokemon();
});
</script>

<template>
    <Container>
        <UCard>
            <template #header>
                <NuxtLink to="/pokemons" class="text-blue-500 hover:underline"
                    >&larr; Back to list</NuxtLink
                >
            </template>

            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Pokemon image -->
                <div class="w-full md:w-1/3">
                    <USkeleton v-if="pokemonState.status === 'pending'" class="w-full h-full" />
                    <div v-else-if="pokemonState.status === 'error'" class="text-red-500">
                        Error: {{ pokemonState.error?.message }}
                    </div>
                    <img
                        v-else-if="pokemonState.data"
                        :src="pokemonState.data.sprites.other['official-artwork'].front_default"
                        :alt="pokemonState.data?.name"
                        class="w-full object-contain bg-gray-100 rounded-lg"
                    />
                </div>

                <!-- Pokemon details -->
                <div class="w-full lg:w-2/3">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                        <h1 class="text-3xl font-bold capitalize mb-4">
                            {{ pokemonState.data?.name }}
                            <span class="text-gray-500 ml-2"
                                ># {{ pokemonState.data?.id?.toString().padStart(3, "0") }}</span
                            >
                        </h1>
                        <!-- Types -->
                        <div class="flex flex-wrap gap-2 mt-2 sm:mt-0">
                            <PokemonType
                                v-for="type in pokemonState.data?.types"
                                :key="type.type.name"
                                :type="type.type.name"
                                size="md"
                            />
                        </div>
                    </div>
                    <!-- Basic Info -->
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <strong>Height:</strong>
                            {{
                                pokemonState.data?.height
                                    ? (pokemonState.data.height / 10).toFixed(1)
                                    : "N/A"
                            }}
                            m
                        </div>
                        <div>
                            <strong>Weight:</strong>
                            {{
                                pokemonState.data?.weight
                                    ? (pokemonState.data.weight / 10).toFixed(1)
                                    : "N/A"
                            }}
                            kg
                        </div>
                        <div>
                            <strong>Base Experience:</strong>
                            {{
                                pokemonState.data?.base_experience
                                    ? pokemonState.data.base_experience
                                    : "N/A"
                            }}
                        </div>
                        <div>
                            <strong>Base Happiness:</strong>
                            {{
                                speciesState.data?.base_happiness
                                    ? speciesState.data.base_happiness
                                    : ""
                            }}
                        </div>
                        <div>
                            <strong>Capture Rate:</strong>
                            {{
                                speciesState.data?.capture_rate
                                    ? speciesState.data.capture_rate
                                    : ""
                            }}
                        </div>
                        <div>
                            <strong>Growth Rate:</strong>
                            {{
                                speciesState.data?.growth_rate?.name
                                    ? speciesState.data.growth_rate.name
                                    : ""
                            }}
                        </div>
                    </div>
                    <!-- Characteristics -->
                    <div class="mb-4">
                        <h2 class="text-xl font-semibold mb-2">Characteristics</h2>
                        <div class="grid grid-cols-2 gap-2">
                            <div>
                                <strong>Color:</strong>
                                {{
                                    speciesState.data?.color?.name
                                        ? speciesState.data.color.name
                                        : ""
                                }}
                            </div>
                            <div>
                                <strong>Shape:</strong>
                                {{
                                    speciesState.data?.shape?.name
                                        ? speciesState.data.shape.name
                                        : ""
                                }}
                            </div>
                            <div>
                                <strong>Habitat:</strong>
                                {{
                                    speciesState.data?.habitat?.name
                                        ? speciesState.data.habitat.name
                                        : ""
                                }}
                            </div>
                            <div>
                                <strong>Generation:</strong>
                                {{
                                    speciesState.data?.generation?.name
                                        ? speciesState.data.generation.name
                                        : ""
                                }}
                            </div>
                        </div>
                    </div>
                    <!-- Description -->
                    <!-- <p class="mb-4">{{  pokemon.  }}</p> -->

                    <!-- Stats -->

                    <!-- Abilities -->
                    <section class="mb-4">
                        <h2 class="text-xl font-semibold mb-2">Abilities</h2>
                        <ul class="list-disc list-inside">
                            <li
                                v-for="ability in pokemonState.data?.abilities"
                                :key="ability.ability.name"
                                class="capitalize"
                            >
                                {{ ability.ability.name }} {{ ability.is_hidden ? "(Hidden)" : "" }}
                            </li>
                        </ul>
                    </section>

                    <!-- Additional Info -->
                    <section>
                        <h2 class="text-xl font-semibold mb-2">Additional Info</h2>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                            <div>
                                <strong>Is Baby:</strong>
                                {{ speciesState.data?.is_baby ? "Yes" : "No" }}
                            </div>
                            <div>
                                <strong>Is Legendary:</strong>
                                {{ speciesState.data?.is_legendary ? "Yes" : "No" }}
                            </div>
                            <div>
                                <strong>Is Mythical:</strong>
                                {{ speciesState.data?.is_mythical ? "Yes" : "No" }}
                            </div>
                            <div>
                                <strong>Has Gender Differences:</strong>
                                {{ speciesState.data?.has_gender_differences ? "Yes" : "No" }}
                            </div>
                            <div>
                                <strong>Forms Switchable:</strong>
                                {{ speciesState.data?.forms_switchable ? "Yes" : "No" }}
                            </div>
                        </div>
                    </section>

                    <!-- Evolution Chain -->
                    <section class="w-full mt-6">
                        <h2 class="text-xl font-semibold mb-4">Evolution Chain</h2>
                        <EvolutionChainDisplay
                            v-if="processedEvolutionChain"
                            :evolution-chain="processedEvolutionChain"
                        />
                        <p v-else>No evolution data available</p>
                    </section>
                </div>
            </div>
        </UCard>
    </Container>
</template>
