const colors = require('tailwindcss/colors');

module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		screens: {
			xxl: { max: '1650px' },
			xl: { max: '1450px' },
			lg: { max: '1100px' },
			md: { max: '750px' },
			sm: { max: '475px' },
			xs: { max: '375px' },
		},
		colors: {
			gray: colors.gray,
			white: colors.white,

			primary: {
				100: '#d6ccf4',
				200: '#ad99e9',
				300: '#8466de',
				400: '#5b33d3',
				500: '#3200c8',
				600: '#2800a0',
				700: '#1e0078',
				800: '#140050',
				900: '#0a0028',
			},
			black: {
				100: '#d0cfd4',
				200: '#a09ea8',
				300: '#716e7d',
				400: '#413d51',
				500: '#120d26',
				600: '#0e0a1e',
				700: '#0b0817',
				800: '#07050f',
				900: '#040308',
			},
			background: {
				100: '#fdfefe',
				200: '#fcfdfe',
				300: '#fafcfd',
				400: '#f9fbfd',
				500: '#f7fafc',
				600: '#c6c8ca',
				700: '#949697',
				800: '#636465',
				900: '#313232',
			},
		},
		extend: {
			fontFamily: {
				nunito: ['Nunito Sans', 'sans - serif'],
				prodisplay: ['SF Pro Display', 'sans - serif'],
				inter: ['Inter', 'sans-serif'],
			},
			backgroundImage: {
				'success-pattern': "url('/public/Background.svg')",
			},
		},
	},
	plugins: [require('tailwind-scrollbar-hide')],
};
