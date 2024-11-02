import { css, cva } from "@styled-system/css";

export const container = cva({
    base: {
        padding: '0 20px',
        display: 'flex',
        flexDir: 'column',
    },
    variants: {
        full: {
            true: {
                flex: 1,
            }
        }
    },
    defaultVariants: {
        full: true,
    }
});

export const paramsContainer = css({
    marginTop: '10px'
});