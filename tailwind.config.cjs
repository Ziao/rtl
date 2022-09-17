/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css,scss}"],
    theme: {
        container: {
            center: true,
        },
        extend: {},
    },
    plugins: [require("daisyui")],
};
