import { cva } from "@styled-system/css";

export const tab = cva({
    base: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'calc(var(--border-width)* 1px) solid transparent',
        cursor: 'pointer',
    },
    variants: {
        active: {
            true: {
            }
        },
        variant: {
            default: {
                height: '30px',
                flex: 1,
                borderRadius: '5px',
                '&:hover': {
                    backgroundColor: 'var(--vscode-tab-hoverBackground)'
                }
            },
            compact: {
                padding: '4px 10px',
                borderRadius: '999999px',
                fontWeight: 600,
                fontSize: '12px',
                color: 'var(--vscode-disabledForeground)',
                '&:hover': {
                    color: 'var(--vscode-activeForeground)'
                }
            }
        },
        withAnimation: {
            true: {
                transition: 'background-color .3s ease, border-color .3s ease, color .3s ease',
            }
        }
    },
    compoundVariants: [
        {
            active: true,
            variant: 'default',
            css: {
                backgroundColor: 'var(--vscode-tab-activeBackground)',
                border: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
            },
        },
        {
            active: true,
            variant: 'compact',
            css: {
                backgroundColor: 'var(--vscode-list-hoverBackground)',
                border: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
                color: 'var(--vscode-activeForeground)',
            },
        },
    ],
    defaultVariants: {
        variant: 'default',
        withAnimation: true,
    }
})