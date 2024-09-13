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
                comforter: ["Comforter Brush", "cursive"],
                josefin: ["Josefin Sans", "sans-serif"],
                spline: ["Spline Sans Mono", "monospace"],
            },
            colors: {
                "primary-ivory": "#fffff0",
            },
        },
    },
    plugins: [],
};
