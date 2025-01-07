import { sva } from "@styled-system/css";

export const savedMessage = sva({
    slots: ['message', 'top', 'label', 'event', 'argsCount', 'labelContainer'],
    base: {
        message: {
            padding: '10px',
            border: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
            borderRadius: '10px',
            transition: 'border-color .3s ease',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
                borderColor: 'color-mix(in srgb, var(--dropdown-border), white 10%)',
                // backgroundColor: 'var(--vscode-list-hoverBackground)',
            }
        },
        top: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '5px',
        },
        label: {
            fontSize: '14px',
            fontWeight: 600,
        },
        labelContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
        },
        event: {
            fontSize: '12px',
            color: 'var(--vscode-disabledForeground)',
            // marginTop: '2px',
        },
        argsCount: {
            paddingLeft: '5px',
            paddingRight: '5px',
            height: '25px',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'var(--vscode-list-hoverBackground)',
            fontSize: '9px',
            fontWeight: 600,
            color: 'var(--vscode-disabledForeground)'
        }
    },
    variants: {
        selected: {
            true: {
                message: {
                    border: 'calc(var(--border-width)* 1px) solid transparent',
                    outline: 'calc(var(--border-width)* 2px) solid var(--button-primary-background)',
                    outlineOffset: 'calc(var(--border-width)* -2px)',
                }
            }
        },
        overflowing: {
            true: {
                message: {
                    maxHeight: '120px',
                }
            }
        }
    }
})