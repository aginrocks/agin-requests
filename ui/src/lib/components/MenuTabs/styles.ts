import { css, cva } from "@styled-system/css";

export const menuTabs = cva({
    base: {
        display: 'flex',
        flexGrow: 'grow',
        alignItems: 'center',
    },
    variants: {
        variant: {
            default: {
                marginTop: '10px',
                padding: '0 20px',
                gap: '2px',
            },
            compact: {
                border: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
                borderRadius: '99999px',
                padding: '2px',
                gap: '0px',
            }
        }
    },
    defaultVariants: {
        variant: 'default',
    }
});