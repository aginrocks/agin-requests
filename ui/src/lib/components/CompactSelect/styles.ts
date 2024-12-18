import { cva } from "@styled-system/css";

export const compactSelect = cva({
    base: {
        border: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
        borderRadius: '99999px',
        padding: '7px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12px',
        transition: 'background-color .3s ease',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'var(--vscode-list-hoverBackground)'
        }
    }
});