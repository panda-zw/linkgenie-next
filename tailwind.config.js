/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        'oval-gradient': 'radial-gradient(ellipse 30% 20% at center, var(--tw-gradient-stops))',
        "gradient-conic":
          "conic-gradient(from 180deg at 20% 0%, var(--tw-gradient-stops))",
      },

      fontFamily: {
        'mulish': ['Mulish', 'sans-serif'],
      },

      colors: {
        "ingray": "#7a8aa9",
        "authgray": "#536586"
      }

    },
  },
  plugins: [],
};
