import { cva } from "@/styled-system/css";

export const title = cva({
    base: {
        fontWeight: 600,
        color: 'text.0',
    },
    variants: {
        size: {
            xxs: { fontSize: 12 },
            xs: { fontSize: 14 },
            sm: { fontSize: 16 },
            md: { fontSize: 18 },
            lg: { fontSize: 24 },
            xl: { fontSize: 30 },
        },
        weight: {
            100: { fontWeight: 100 },
            200: { fontWeight: 200 },
            300: { fontWeight: 300 },
            400: { fontWeight: 400 },
            500: { fontWeight: 500 },
            600: { fontWeight: 600 },
            700: { fontWeight: 700 },
            800: { fontWeight: 800 },
            900: { fontWeight: 900 },
        },
        color: {
            red: { color: 'red.4' },
            inherit: { color: 'inherit' },
        }
    }
});