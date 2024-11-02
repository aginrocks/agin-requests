import { cva } from "@styled-system/css";

export const tabs = cva({
    base: {
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