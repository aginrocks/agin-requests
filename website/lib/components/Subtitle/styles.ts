import { cva } from "@/styled-system/css";

export const subtitle = cva({
    base: {
        color: 'text.1',
    },
    variants: {
        size: {
            xs: { fontSize: 10 },
            sm: { fontSize: 12 },
            md: { fontSize: 14 },
            lg: { fontSize: 16 },
            xl: { fontSize: 28 },
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
        }
    }
});