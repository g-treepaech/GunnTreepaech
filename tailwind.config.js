/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#2563eb',
                    dark: '#60a5fa',
                },
                bg: {
                    light: '#f8fafc',
                    dark: '#0f172a',
                }
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                prompt: ['Prompt', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
