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

					info: "#005ed0",

					success: "#4ba50f",

					warning: "#ab6300",

					error: "#ff7c8c",

					"primary-txt": "#CFCFCF",
				},
				"mytheme-light": {
					primary: "#2D63EC",

					secondary: "#ff8d00",

					accent: "#00d9ff",

					neutral: "#261919",

					"base-100": "#fcfcff",

					info: "#005ed0",

					success: "#4ba50f",

					warning: "#ab6300",

					error: "#ff7c8c",

					"primary-txt": "#161616",
				},
			},
		],
	},
};
