/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				myYellow: "#FFEB3B",
				myBlue: "#1E88E5",
			},
			borderRadius: {
				"my-sm": "8px",
			},
			fontSize: {
				mybase: "18px",
			},
			backgroundImage: {
				signup: "url('/src/assets/signup-bg.svg')",
			},
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				"mytheme-dark": {
					primary: "#2D63EC",
					secondary: "#ff8d00",
					accent: "#00d9ff",
					neutral: "#261919",
					"base-100": "#262626",
					"base-content": "#CFCFCF",
					info: "#005ed0",
					success: "#4ba50f",
					warning: "#ab6300",
					error: "#ff7c8c",
				},
				"mytheme-light": {
					primary: "#2D63EC",
					secondary: "#ff8d00",
					accent: "#00d9ff",
					neutral: "#261919",
					"base-100": "#fcfcff",
					"base-content": "#161616",
					info: "#005ed0",
					success: "#4ba50f",
					warning: "#ab6300",
					error: "#ff7c8c",
					txtColor: "#161616",
				},
			},
		],
	},
};
