/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'node_modules/flowbite-react/lib/esm/**/*.js',
	],
	theme: {
		container: {
			center: true,
		},
		extend: {
			keyframes: {
				fadein: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				fadeout: {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' },
				},
			},
			animation: {
				fadein: 'fadein 1s ease-in-out',
				fadeout: 'fadeout 1s ease-in-out',
			},
		},
	},
	// eslint-disable-next-line no-undef
	plugins: [require('daisyui'), require('flowbite/plugin')],
};
