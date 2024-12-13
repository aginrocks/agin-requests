import { css, cva } from "@styled-system/css";

export const tabs = cva({
    base: {
        border: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
        padding: '10px 15px',
        paddingBottom: '3px',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
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

export const right = css({
    position: 'absolute',
    right: '10px',
    top: '0px',
    bottom: '0px',
    display: 'flex',
    alignItems: 'center',
    zIndex: 100,
    gap: '5px'
});