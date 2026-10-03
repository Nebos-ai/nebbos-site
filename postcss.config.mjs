// Tailwind v4 runs through its own PostCSS plugin (lightningcss handles
// prefixing). Only app/tailwind.css opts in; every other stylesheet passes
// through untouched.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
