<script setup lang="ts">
import type { ProcessedEvolutionStage } from "~/types/pokemon";

defineProps<{
    evolutionChain: ProcessedEvolutionStage;
}>();
</script>

<template>
    <div class="flex justify-center">
        <div class="flex flex-col items-center md:flex-row">
            <img
                :src="evolutionChain.image"
                :alt="evolutionChain.name"
                class="w-20 h-20 object-contain"
            />
            <span class="text-sm font-semibold mt-1 capitalize">{{ evolutionChain.name }}</span>
            <template v-if="evolutionChain.evolvesTo.length > 0">
                <div class="flex flex-col md:flex-row items-center">
                    <span class="hidden md:block text-2xl md:text-4xl md:mx-4"> → </span>
                    <span class="block md:hidden text-2xl md:text-4xl md:mx-4"> ↓ </span>
                    <div
                        class="flex flex-col md:flex-row flex-wrap justify-center gap-4 mt-2 md:mt-0"
                    >
                        <EvolutionChainDisplay
                            v-for="nextStage in evolutionChain.evolvesTo"
                            :key="nextStage.id"
                            :evolution-chain="nextStage"
                        />
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
