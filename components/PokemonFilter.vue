<script setup lang="ts">
import { types } from "~/utils/typeTable";
const { t } = useI18n();

const emit = defineEmits(["filter-change"]);

const store = useConfigStore();
const { filteredInput, filteredTypes } = storeToRefs(store);
</script>

<template>
    <UCard class="bg-gray-50 dark:bg-gray-800">
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold">{{ t("common.filters") }}</h2>
                <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-x-mark-20-solid"
                    @click="store.clearFilters"
                    :label="t('common.clear')"
                />
            </div>
        </template>

        <div class="space-y-4">
            <!-- Name search -->
            <UFormGroup :label="t('common.searchByName')">
                <UInput
                    :model-value="filteredInput"
                    :placeholder="t('common.enterPokemonName')"
                    icon="i-heroicons-magnifying-glass-20-solid"
                    color="gray"
                    variant="outline"
                    @update:modelValue="store.setFilteredInput"
                />
            </UFormGroup>

            <!-- Type Filter (multi-select) -->
            <UAccordion
                :items="[
                    {
                        label: t('common.filterByType'),
                    },
                ]"
            >
                <template #item="{ item, open }">
                    <div
                        class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2"
                    >
                        <PokemonType
                            v-for="type in types"
                            :key="type.id"
                            :type="type.name"
                            size="sm"
                            selectable
                            :selected="filteredTypes.has(type.id)"
                            @click="store.toggleType(type.id)"
                        />
                    </div>
                </template>
            </UAccordion>
        </div>
    </UCard>
</template>
