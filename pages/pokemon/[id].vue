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

const localePath = useLocalePath();
const { t, locale } = useI18n();
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
            // TODO: multi-language
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

const genderRatio = computed(() => {
    if (!speciesState.value.data) return "Unknown";
    if (speciesState.value.data.gender_rate === -1) return t("pokemon.genderLess");
    const femaleRatio = (speciesState.value.data.gender_rate / 8) * 100;
    const maleRatio = 100 - femaleRatio;
    return `${maleRatio}% Male, ${femaleRatio}% Female`;
});
</script>

<template>
    <Container class="py-4">
        <UCard>
            <template #header>
                <NuxtLink
                    :to="localePath('/pokemons')"
                    class="text-primary-500 flex items-center w-fit hover:underline"
                >
                    <UIcon name="i-heroicons-arrow-left" class="mr-2" />
                    {{ t("common.backToList") }}
                </NuxtLink>
            </template>

            <div v-if="pokemonState.data" class="flex flex-col md:flex-row gap-8">
                <!-- Pokemon image and basic info -->
                <div class="w-full md:w-1/3 space-y-4">
                    <div class="relative">
                        <img
                            :src="pokemonState.data.sprites.other['official-artwork'].front_default"
                            :alt="pokemonState.data.name"
                            class="w-full object-contain bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg"
                        />
                        <PokemonCry :url="pokemonState.data.cries.latest" />
                    </div>
                    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h2 class="text-lg font-semibold mb-2">{{ t("pokemon.basicInfo") }}</h2>
                        <div class="grid grid-cols-2 gap-2 text-sm">
                            <div>
                                <strong>{{ t("pokemon.height") }}:</strong>
                                {{ (pokemonState.data.height / 10).toFixed(1) }} m
                            </div>
                            <div>
                                <strong>{{ t("pokemon.weight") }}:</strong>
                                {{ (pokemonState.data.weight / 10).toFixed(1) }} kg
                            </div>
                            <div>
                                <strong>{{ t("pokemon.baseExperience") }}:</strong>
                                {{ pokemonState.data.base_experience }}
                            </div>
                            <div>
                                <strong>{{ t("pokemon.baseHappiness") }}:</strong>
                                {{ speciesState.data?.base_happiness }}
                            </div>
                        </div>
                    </div>

                    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h2 class="text-xl font-semibold mb-2">{{ t("pokemon.genderRatio") }}</h2>
                        <p>{{ genderRatio }}</p>
                    </div>
                </div>

                <!-- Right Side: Pokemon details -->
                <div class="w-full md:w-2/3 space-y-6">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <h1 class="text-3xl font-bold capitalize">
                            {{
                                speciesState.data?.names.find(
                                    ({ language }) => language.name === locale
                                )?.name || pokemonState.data.name
                            }}
                            <span class="text-gray-500 text-xl ml-2"
                                >#{{ pokemonState.data.id.toString().padStart(3, "0") }}</span
                            >
                        </h1>
                        <div class="flex flex-wrap gap-2 mt-2 sm:mt-0">
                            <PokemonType
                                v-for="type in pokemonState.data.types"
                                :key="type.type.name"
                                :type="type.type.name"
                                size="lg"
                            />
                        </div>
                    </div>

                    <!-- Description -->
                    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h2 class="text-xl font-semibold mb-2">{{ t("pokemon.description") }}</h2>
                        <p>
                            {{
                                speciesState.data?.flavor_text_entries
                                    .find((item) => item.language.name === locale)
                                    ?.flavor_text?.replace(/\n/g, " ")
                                    .replace(/\f/g, " ")
                                    .replace(/\s+/g, " ")
                                    .trim() || "No description available"
                            }}
                        </p>
                    </div>

                    <!-- Stats -->
                    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h2 class="text-xl font-semibold mb-2">{{ t("pokemon.stats") }}</h2>
                        <div class="space-y-2">
                            <div
                                v-for="stat in pokemonState.data.stats"
                                :key="stat.stat.name"
                                class="flex items-center"
                            >
                                <span class="w-1/4 capitalize">{{ stat.stat.name }}:</span>
                                <UProgress :value="stat.base_stat" :max="255" class="w-3/4" />
                                <span class="ml-2">{{ stat.base_stat }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Moves -->
                    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h2 class="text-xl font-semibold mb-2">{{ t("pokemon.moves") }}</h2>
                        <ul class="grid grid-cols-2 md:grid-cols-3 gap-2">
                            <li
                                v-for="move in pokemonState.data.moves.slice(0, 15)"
                                :key="move.move.name"
                                class="capitalize"
                            >
                                {{ move.move.name.replace("-", " ") }}
                            </li>
                        </ul>
                        <p
                            v-if="pokemonState.data.moves.length > 15"
                            class="mt-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                            And {{ pokemonState.data.moves.length - 15 }} more...
                        </p>
                    </div>

                    <!-- Abilities -->
                    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h2 class="text-xl font-semibold mb-2">{{ t("pokemon.abilities") }}</h2>
                        <ul class="list-disc list-inside">
                            <li
                                v-for="ability in pokemonState.data.abilities"
                                :key="ability.ability.name"
                                class="capitalize"
                            >
                                {{ ability.ability.name }} {{ ability.is_hidden ? "(Hidden)" : "" }}
                            </li>
                        </ul>
                    </div>

                    <!-- Characteristics -->
                    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h2 class="text-xl font-semibold mb-2">
                            {{ t("pokemon.characteristics") }}
                        </h2>
                        <div class="grid grid-cols-2 gap-2">
                            <div>
                                <strong>{{ t("pokemon.color") }}:</strong>
                                {{ speciesState.data?.color?.name }}
                            </div>
                            <div>
                                <strong>{{ t("pokemon.shape") }}:</strong>
                                {{ speciesState.data?.shape?.name }}
                            </div>
                            <div>
                                <strong>{{ t("pokemon.habitat") }}:</strong>
                                {{ speciesState.data?.habitat?.name || "Unknown" }}
                            </div>
                            <div>
                                <strong>{{ t("pokemon.generation") }}:</strong>
                                {{ speciesState.data?.generation?.name }}
                            </div>
                        </div>
                    </div>

                    <!-- Additional Info -->
                    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h2 class="text-xl font-semibold mb-2">
                            {{ t("pokemon.additionalInfo") }}
                        </h2>
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
                    </div>

                    <!-- Evolution Chain -->
                    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h2 class="text-xl font-semibold mb-2">
                            {{ t("pokemon.evolutionChain") }}
                        </h2>
                        <USkeleton v-if="evolutionChainState.status === 'pending'" class="h-20" />
                        <div
                            v-else-if="evolutionChainState.status === 'error'"
                            class="text-red-500"
                        >
                            Error: {{ evolutionChainState.error?.message }}
                        </div>
                        <EvolutionChainDisplay
                            v-else-if="processedEvolutionChain"
                            :evolution-chain="processedEvolutionChain"
                        />
                        <p v-else>No evolution data available</p>
                    </div>
                </div>
            </div>
        </UCard>
    </Container>
</template>
