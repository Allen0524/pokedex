<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<template>
    <div class="min-h-[100dvh] grid grid-rows-[auto_1fr_auto] bg-gray-50 dark:bg-gray-900">
        <AppHeader />
        <NuxtPage />
        <AppFooter />
    </div>
</template>
