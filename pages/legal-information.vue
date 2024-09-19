<script setup lang="ts">
import Container from "~/components/Container.vue";

const { t } = useI18n();

const legalSections = [
    { id: "terms", title: t("legal.termsOfUse.title"), content: t("legal.termsOfUse.content") },
    {
        id: "privacy",
        title: t("legal.privacyPolicy.title"),
        content: t("legal.privacyPolicy.content"),
    },
    {
        id: "disclaimer",
        title: t("legal.disclaimer.title"),
        content: t("legal.disclaimer.content"),
    },
];

useHead({
    title: t("common.legalInformation"),
    meta: [
        {
            name: "description",
            content: "Legal Information",
        },
    ],
});
</script>

<template>
    <Container tag="main" class="min-h-screen py-12">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            {{ t("common.leaglInformation") }}
        </h1>

        <nav class="mb-8">
            <ul class="flex flex-wrap gap-4">
                <li v-for="section in legalSections" :key="section.id">
                    <a
                        :href="`#${section.id}`"
                        class="text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                    >
                        {{ section.title }}
                    </a>
                </li>
            </ul>
        </nav>

        <div class="space-y-12">
            <section v-for="section in legalSections" :key="section.id" :id="section.id">
                <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {{ section.title }}
                </h2>
                <div class="prose dark:prose-invert max-w-none">
                    <p>{{ section.content }}</p>
                </div>
            </section>
        </div>
    </Container>
</template>
