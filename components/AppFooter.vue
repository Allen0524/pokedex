<template>
    <footer class="container mx-auto px-4 py-10">
        <!-- Mobile Layout -->
        <ul class="md:hidden flex items-center justify-between text-xs">
            <li>
                <NuxtLink class="underline underline-offset-2" to="/legal-information"
                    >Legal Information</NuxtLink
                >
            </li>
            <li>
                <NuxtLink class="underline underline-offset-2" to="/about">About</NuxtLink>
            </li>
            <li>
                <NuxtLink class="underline underline-offset-2" to="/site-map">Site Map</NuxtLink>
            </li>
        </ul>
        <div class="flex items-center justify-between">
            <p class="text-center text-sm">© 2024 PokéDict</p>
            <!-- Desktop Layout -->
            <ul class="hidden md:flex items-center justify-between gap-16 text-xs">
                <li>
                    <NuxtLink class="underline underline-offset-2" to="/legal-information"
                        >Legal Information</NuxtLink
                    >
                </li>
                <li>
                    <NuxtLink class="underline underline-offset-2" to="/about">About</NuxtLink>
                </li>
                <li>
                    <NuxtLink class="underline underline-offset-2" to="/site-map"
                        >Site Map</NuxtLink
                    >
                </li>
            </ul>
            <div class="flex items-center gap-7">
                <a
                    target="_blank"
                    href="https://github.com/Allen0524/pokedex"
                    rel="noopener noreferrer"
                    class="p-1"
                >
                    <img src="/images/github.svg" alt="GitHub" class="w-4 h-4" />
                </a>
                <a href="mailto:william0318563@gmail.com" class="p-1">
                    <img src="/images/gmail.svg" alt="Gmail" class="w-4 h-4" />
                </a>
            </div>
        </div>
    </footer>
</template>
