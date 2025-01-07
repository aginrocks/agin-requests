import { css, cva } from "@styled-system/css";

export const messageName = cva({
    base: {
        border: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
        color: 'var(--vscode-disabledForeground)',
        fontWeight: 500,
        borderRadius: '999999px',
        display: 'flex',
        alignItems: 'center',
        gap: '3px',
    },
    variants: {
        size: {
            sm: {
                padding: '4px 8px',
                fontSize: '10px',
            },
            xs: {
                padding: '2px 6px',
                fontSize: '9px',
            }
        },
        withMargin: {
            true: {
                marginRight: '5px',
            }
        },
        clickable: {
            true: {
                cursor: 'pointer',
                transition: 'background-color .3s ease',
                '&:hover': {
                    backgroundColor: 'var(--vscode-list-hoverBackground)',
                }
            }
        }
    },
    defaultVariants: {
        size: 'sm',
        withMargin: true,
        clickable: true,
    }
});