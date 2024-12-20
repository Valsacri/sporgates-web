import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: '#FCFCFC',
				'primary-light': '#E6EAF0',
				primary: '#3A5E8C',
				'primary-dark': '#2C4A72',
				'accent-light': '#F9EDEB',
				accent: '#EF8E4E',
				'accent-dark': '#D96A3E',
				'secondary-light': '#F9F9F9',
				secondary: '#F5F5F5',
				'secondary-dark': '#BFBFBF',
				'success-light': '#E6F4E6',
				success: '#86C786',
				'success-dark': '#5E9A5E',
				'warning-light': '#FFF4E6',
				warning: '#F3B07A',
				'warning-dark': '#D99C6A',
				'info-light': '#E6F4F9',
				info: '#6AB2F5',
				'info-dark': '#4A8ACB',
				'danger-light': '#FCEDEB',
				danger: '#FA7F75',
				'danger-dark': '#D96A5E',
				heading: '#174455',
				text: '#333333',
				'text-secondary': '#777777',
				'text-secondary-dark': '#555555',
			},
		},
		fontFamily: {
			sans: ['var(--font-poppins)'],
			handwritting: ['var(--font-caveat)'],
		},
		animation: {
			'infinite-scroll': 'infinite-scroll 25s linear infinite',
			'animation-spin': 'spin 1s linear infinite',
			'animation-bounce': 'bounce 1.2s infinite',
			ripple: 'ripple 0.6s ease-out',
		},
		keyframes: {
			'infinite-scroll': {
				from: { transform: 'translateX(0)' },
				to: { transform: 'translateX(-100%)' },
			},
			spin: {
				from: {
					transform: 'rotate(0deg)',
				},
				to: {
					transform: 'rotate(360deg)',
				},
			},
			bounce: {
				'0%': {
					transform: 'translateY(-30%)',
					animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
				},
				'50%': {
					transform: 'translateY(0)', // Ball touches the button
					animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
				},
				'100%': {
					transform: 'translateY(-30%)',
				},
			},
			ripple: {
				'0%': { transform: 'scale(0)', opacity: '0.5' },
				'100%': { transform: 'scale(4)', opacity: '0' },
			},
		},
	},
	plugins: [],
};
export default config;
