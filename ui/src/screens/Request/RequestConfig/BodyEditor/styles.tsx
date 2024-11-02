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

export const tabs = cva({
    base: {
        // marginTop: '15px',
        border: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
        padding: '10px 15px',
        paddingBottom: '3px',
        borderRadius: '10px',
    },
    variants: {
        connected: {
            true: {
                borderBottomWidth: '0px',
                borderBottomRadius: '0px',
                marginBottom: '0px',
            }
        }
    }
});

export const paramsContainer = css({
    marginTop: '10px'
});