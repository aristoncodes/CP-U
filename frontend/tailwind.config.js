/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				cpbg: '#0f172a', // slate-950-ish
				cpcard: '#111827', // gray-900
				cpprimary: '#60a5fa', // blue-400
				cpprimaryDark: '#3b82f6', // blue-500
			}
		},
	},
	darkMode: 'class',
	plugins: [],
}

