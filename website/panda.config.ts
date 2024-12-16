import { defineConfig, defineGlobalStyles } from "@pandacss/dev";

const globalCss = defineGlobalStyles({
  'html, body': {
    backgroundColor: 'background',
    fontFamily: 'var(--font-poppins)',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    color: 'text.0',
    maxW: '100vw',
  }
});

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./lib/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./mdx-components.tsx"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          background: {
            value: '#0A0A0B',
          },
          tile: {
            0: { value: '#121212' },
            1: { value: '#242424' },
          },
          green: {
            0: { value: '#e6ffee' },
            1: { value: '#d3f9e0' },
            2: { value: '#a8f2c0' },
            3: { value: '#7aea9f' },
            4: { value: '#54e382' },
            5: { value: '#3bdf70' },
            6: { value: '#2bdd66' },
            7: { value: '#1bc455' },
            8: { value: '#0bae4a' },
            9: { value: '#00973c' },
          },
          text: {
            0: { value: '#E9ECEF' },
            1: { value: '#A1A1AA' },
            2: { value: '#898989' },
            3: { value: '#7A7A7A' },
          },
          border: {
            value: '#ffffff10',
          },
          dimmed: {
            green: {
              0: { value: '#e6ffee20' },
              1: { value: '#d3f9e020' },
              2: { value: '#a8f2c020' },
              3: { value: '#7aea9f20' },
              4: { value: '#54e38220' },
              5: { value: '#3bdf7020' },
              6: { value: '#2bdd6620' },
              7: { value: '#1bc45520' },
              8: { value: '#0bae4a20' },
              9: { value: '#00973c20' },
            }
          }
        }
      },
    }
  },

  // The output directory for your css system
  outdir: "styled-system",

  globalCss,
});