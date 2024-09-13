<script setup lang="ts">
const props = defineProps<{ class?: string; tag?: string }>();
const { tag = "div" } = props;
</script>

<template>
    <component :is="tag" :class="['container mx-auto px-4', props.class]">
        <slot />
    </component>
</template>
