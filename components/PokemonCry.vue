<script setup lang="ts">
const props = defineProps<{ url: string }>();

const audio = ref(new Audio(props.url));
const volume = ref(0.3);

function play() {
    audio.value.volume = volume.value;
    audio.value.play();
}
</script>

<template>
    <div
        class="absolute top-2 right-2 flex items-center bg-white dark:bg-gray-800 rounded-full shadow-md p-1"
    >
        <button
            @click="play"
            class="w-8 h-8 flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label="Play Pokémon cry"
        >
            <UIcon name="i-heroicons-speaker-wave" class="text-lg" />
        </button>
    </div>
</template>
