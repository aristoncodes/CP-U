/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // Enable dark mode with class strategy
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"JetBrains Mono"', 'monospace'],
                heading: ['"Rubik Glitch"', 'cursive'],
                retro: ['"Press Start 2P"', 'cursive'],
                pixel: ['"VT323"', 'monospace'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            colors: {
                core: 'var(--bg-core)',
                panel: 'var(--bg-panel)',
                accent: 'var(--accent)',
                primary: 'var(--text-primary)',
                muted: 'var(--text-muted)',
                secondary: 'var(--text-secondary)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
