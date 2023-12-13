/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  corePlugins: {
    preflight: false,
  },
  content: ["./src/components/**/*.{js,jsx,ts,tsx}", "./src/pages/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "celeste-light-2": "#d7edfd",
        "celeste-inactivo": "#84A4B9",
        "celeste-newcall": "#1890FF",
        "azul-oscuro": "#003A58",
        "gris-D6D6D6": "#D6D6D6",
        "gris-BBBBBB": "#BBBBBB",
        "gris-E1E1E1": "#E1E1E1",
        "gris-F2F2F2": "#F2F2F2",
        "negro-base": "#111111",
        "rojo-FF6363": "#FF6363",
      },
      fontFamily: {
        sans: ["Titillium Web", "sans-serif"],
      },
    },
  },
  plugins: [],
};
