<script setup lang="ts">
const emit = defineEmits(["filter-change"]);

const searchName = ref("");
const selectedTypes = ref<Set<string>>(new Set());

const types = [
    "Normal",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dragon",
    "Dark",
    "Steel",
    "Fairy",
    "Unknown",
    "Stellar",
];

const toggleType = (type: string) => {
    if (selectedTypes.value.has(type)) {
        selectedTypes.value.delete(type);
    } else {
        selectedTypes.value.add(type);
    }
};

const clearFilters = () => {
    searchName.value = "";
    selectedTypes.value.clear();
};

const isTypeSelected = (type: string): boolean => {
    return selectedTypes.value.has(type);
};

watch(
    [selectedTypes, searchName],
    () => {
        emit("filter-change", {
            name: searchName.value,
            type: Array.from(selectedTypes.value),
        });
    },
    { immediate: true }
);
</script>

<template>
    <UCard>
        <template #header>
            <h2 class="textxl font-bold mb-4">Filters</h2>
            <UButton
                color="gray"
                icon="i-heroicons-x-mark-20-solid"
                variant="ghost"
                @click="clearFilters"
            >
                Clear
            </UButton>
        </template>

        <div class="space-y-4">
            <!-- Name search -->
            <UFormGroup label="Search by name">
                <UInput
                    v-model="searchName"
                    placeholder="Enter Pokémon name"
                    icon="i-heroicons-magnifying-glass-20-solid"
                />
            </UFormGroup>

            <!-- Type Filter (multi-select) -->
            <UFormGroup label="Filter by type">
                <div class="flex flex-wrap gap-2">
                    <PokemonType
                        v-for="type in types"
                        :key="type"
                        :type="type"
                        size="sm"
                        selectable
                        :selected="isTypeSelected(type)"
                        @click="toggleType(type)"
                    />
                </div>
            </UFormGroup>
        </div>
    </UCard>
</template>
