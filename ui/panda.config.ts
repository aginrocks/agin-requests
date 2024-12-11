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
