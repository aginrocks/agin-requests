import { css, cva } from "@styled-system/css";

export const actionIcon = cva({
    base: {
        width: '24px',
        height: '24px',
        minWidth: '24px',
        minHeight: '24px',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-color .3s ease',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'color-mix(in srgb, var(--vscode-list-hoverBackground), white 5%)',
        },
    },
    variants: {
        disabled: {
            true: {
                color: 'var(--vscode-disabledForeground)',
                pointerEvents: 'none',
            }
        }
    }
});
