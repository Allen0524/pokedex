/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            fontFamily: {
                comforter: ["var(--font-comforter)"],
                josefin: ["var(--font-josefin)"],
                spline: ["var(--font-spline)"],
            },
            colors: {
                "primary-ivory": "#fffff0",
            },
        },
    },
    plugins: [],
};
