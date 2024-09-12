<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<template>
    <div class="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
        <AppHeader />
        <main class="">
            <NuxtPage />
        </main>
        <AppFooter />
    </div>
</template>
