/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
	],
	darkMode: 'class',
	theme: {
		extend: {},
		screens: {
			'mobile': '0px',
			'tablet': '640px',
			'laptop': '1024px',
			'desktop': '1280px',
			'bigDesktop': '1536px',
		},
	},
	plugins: [],
}
