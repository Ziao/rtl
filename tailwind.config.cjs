/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css,scss}"],
    theme: {
        container: {
            center: true,
        },
        extend: {
            fontFamily: {
                sans: ["Roboto", "sans-serif"],
                display: ["Roboto Condensed", "sans-serif"],
            },
        },
    },
    daisy: {},
    plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
};
