<script setup lang="ts">
import type { ProcessedEvolutionStage } from "~/types/pokemon";

defineProps<{
    evolutionChain: ProcessedEvolutionStage;
}>();
</script>

<template>
    <div class="flex flex-col items-center lg:flex-row lg:justify-center gap-5">
        <div class="flex flex-col items-center p-4">
            <img
                :src="evolutionChain.image"
                :alt="evolutionChain.name"
                class="w-20 h-20 object-contain"
            />
            <span class="text-sm font-semibold mt-2 capitalize text-center">{{
                evolutionChain.name
            }}</span>
        </div>
        <template v-if="evolutionChain.evolvesTo.length > 0">
            <div class="my-4">
                <UIcon name="i-heroicons-arrow-down" class="text-3xl lg:hidden" />
                <UIcon name="i-heroicons-arrow-right" class="text-3xl hidden lg:block" />
            </div>
            <div class="flex flex-col lg:flex-row gap-4 items-center">
                <EvolutionChainDisplay
                    v-for="nextStage in evolutionChain.evolvesTo"
                    :key="nextStage.id"
                    :evolution-chain="nextStage"
                />
            </div>
        </template>
    </div>
</template>
