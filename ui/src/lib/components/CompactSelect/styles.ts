import { cva } from "@styled-system/css";

export const compactSelect = cva({
    base: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '12px',
        cursor: 'pointer',
    },
    variants: {
        variant: {
            default: {
                border: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
                borderRadius: '99999px',
                padding: '7px 12px',
                gap: '6px',
                transition: 'background-color .3s ease',
                '&:hover': {
                    backgroundColor: 'var(--vscode-list-hoverBackground)'
                }
            },
            subtle: {
                gap: '4px',
            }
        }
    }
});