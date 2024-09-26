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
        'custom-radial': 'radial-gradient(circle, #37558C 0%, #334F82 10%, #0F1726 100%)',
      },

      fontFamily: {
        'mulish': ['Mulish', 'sans-serif'],
      },

      colors: {
        "ingray": "#7a8aa9",
        "authgray": "#536586",
        "tblack": "#363636",
        "tgray": "#daf1e4",
        "lgray": "#363636",
        "lbg": "#daf1e4",
        "max": "#0f1929",
      }

    },
  },
  plugins: [],
};
