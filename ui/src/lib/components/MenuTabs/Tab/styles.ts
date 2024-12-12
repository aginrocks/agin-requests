import { cva } from "@styled-system/css";

export const tab = cva({
    base: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '5px',
        transition: 'background-color .3s ease',
        height: '25px',
        '&:hover': {
            backgroundColor: 'color-mix(in srgb, var(--vscode-list-hoverBackground), white 1%)'
        }
    },
    variants: {
        active: {
            true: {
                backgroundColor: 'var(--vscode-list-hoverBackground)',
            }
        }
    }
})