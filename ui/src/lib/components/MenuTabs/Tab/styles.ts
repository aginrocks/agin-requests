import { cva } from "@styled-system/css";

export const tab = cva({
    base: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '5px',
        transition: 'background-color .3s ease, border-color .3s ease',
        height: '30px',
        border: 'calc(var(--border-width)* 1px) solid transparent',
        flex: 1,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'var(--vscode-tab-hoverBackground)'
        }
    },
    variants: {
        active: {
            true: {
                // backgroundColor: 'color-mix(in srgb, var(--vscode-list-hoverBackground), white 1%)',
                backgroundColor: 'var(--vscode-tab-activeBackground)',
                border: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
            }
        }
    }
})