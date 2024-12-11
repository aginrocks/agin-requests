import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          border: {
            value: '#E6EDF3'
          },
          methods: {
            get: {
              foreground: {
                value: '#0969ff',
              },
              background: {
                value: '#004ecd20',
              }
            },
            post: {
              foreground: {
                value: '#2bdd66',
              },
              background: {
                value: '#0bae4a20',
              }
            },
          }
        }
      }
    },
  },

  // The output directory for your css system
  outdir: "src/styled-system",
});
