import { sva } from "@styled-system/css";

export const tab = sva({
    slots: ['container', 'optionContainer', 'text', 'line'],
    base: {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
        },
        optionContainer: {
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
        },
        text: {
            fontSize: 14,
            color: 'var(--vscode-disabledForeground)',
            fontWeight: 400
        },
        line: {
            backgroundColor: 'var(--button-primary-background)',
            transition: 'width .3s ease, opacity .3s ease',
            width: '50%',
            height: '3px',
            opacity: 0,
            borderRadius: '999999px',
            '&:hover': {
                backgroundColor: 'var(--button-primary-hover-background)',
            }
        }
    },
    variants: {
        active: {
            true: {
                line: {
                    width: 'calc(100% - 4px)',
                    opacity: 1,
                },
                optionContainer: {

                },
                text: {
                    fontWeight: 600,
                    color: 'var(--vscode-activeForeground)',
                }
            }
        }
    }
})