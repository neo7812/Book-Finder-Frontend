import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
};
// DaisyUI configuration (add this in a separate file or here if using CommonJS)
module.exports.daisyui = {
  themes: ["light", "dark", "cupcake"],
};
