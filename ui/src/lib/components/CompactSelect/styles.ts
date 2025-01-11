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
        },
        radius: {
            default: {
                borderRadius: '99999px',
            },
            sm: {
                borderRadius: '5px',
            },
            md: {
                borderRadius: '10px',
            },
        },
        size: {
            sm: {
                padding: '5px 10px',
                fontSize: '10px',
            }
        },
        padding: {
            none: {
                padding: '0px',
            }
        }
    }
});