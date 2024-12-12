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
          red: {
            0: { value: "#ffe8e9" },
            1: { value: "#ffd1d1" },
            2: { value: "#fba0a0" },
            3: { value: "#f76d6d" },
            4: { value: "#f44141" },
            5: { value: "#f22625" },
            6: { value: "#f21616" },
            7: { value: "#d8070b" },
            8: { value: "#c10007" },
            9: { value: "#a90003" }
          },
          blue: {
            0: { value: "#e5f3ff" },
            1: { value: "#cde2ff" },
            2: { value: "#9ac2ff" },
            3: { value: "#64a0ff" },
            4: { value: "#3884fe" },
            5: { value: "#1d72fe" },
            6: { value: "#0969ff" },
            7: { value: "#0058e4" },
            8: { value: "#004ecd" },
            9: { value: "#0043b5" }
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
            },
            red: {
              0: { value: "#ffe8e920" },
              1: { value: "#ffd1d120" },
              2: { value: "#fba0a020" },
              3: { value: "#f76d6d20" },
              4: { value: "#f4414120" },
              5: { value: "#f2262520" },
              6: { value: "#f2161620" },
              7: { value: "#d8070b20" },
              8: { value: "#c1000720" },
              9: { value: "#a9000320" }
            },
            blue: {
              0: { value: "#e5f3ff20" },
              1: { value: "#cde2ff20" },
              2: { value: "#9ac2ff20" },
              3: { value: "#64a0ff20" },
              4: { value: "#3884fe20" },
              5: { value: "#1d72fe20" },
              6: { value: "#0969ff20" },
              7: { value: "#0058e420" },
              8: { value: "#004ecd20" },
              9: { value: "#0043b520" }
            },
          },
          methods: {
            get: {
              foreground: {
                value: '#0969ff',
              },
              background: {
                value: '#0969ff20',
              }
            },
            post: {
              foreground: {
                value: '#2bdd66',
              },
              background: {
                value: '#2bdd6620',
              }
            },
            put: {
              foreground: {
                value: '#fc8c0c',
              },
              background: {
                value: '#fc8c0c20',
              }
            },
            patch: {
              foreground: {
                value: '#d9d02f',
              },
              background: {
                value: '#d9d02f20',
              }
            },
            delete: {
              foreground: {
                value: '#f21616',
              },
              background: {
                value: '#f2161620',
              }
            },
            head: {
              foreground: {
                value: 'var(--vscode-disabledForeground)',
              },
              background: {
                value: 'color-mix(in srgb, var(--vscode-list-hoverBackground), white 5%)',
              }
            },
            options: {
              foreground: {
                value: 'var(--vscode-disabledForeground)',
              },
              background: {
                value: 'color-mix(in srgb, var(--vscode-list-hoverBackground), white 5%)',
              }
            },
            ws: {
              foreground: {
                value: '#6bd731',
              },
              background: {
                value: '#6bd7320',
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
