import { cva } from '@styled-system/css';

export const listStyles = cva({
    base: {
        border: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
        padding: '5px',
        backgroundColor: 'var(--vscode-editor-background)',
    },
    variants: {
        radius: {
            md: {
                borderRadius: '10px',
            },
            lg: {
                borderRadius: '15px',
            },
        }
    },
    defaultVariants: {
        radius: 'md',
    },
});