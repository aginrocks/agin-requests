import { css, cva } from "@styled-system/css";

export const welcome = css({
    flex: 1,
    display: 'flex',
    flexDir: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '100%',
});

export const logo = cva({
    base: {
        color: 'var(--vscode-disabledForeground)',
        marginBottom: '10px'
    },
    variants: {
        color: {
            red: {
                color: '#d8070b',
            }
        }
    }
});

export const titleStyles = cva({
    base: {
        color: 'var(--vscode-activeForeground)',
        fontWeight: 600,
        fontSize: '18px',
        textAlign: 'center',
    },
    variants: {
        size: {
            sm: {
                fontSize: '15px',
            }
        }
    }
});

export const subtitleStyles = cva({
    base: {
        color: 'var(--vscode-disabledForeground)',
        fontSize: '14px',
        textAlign: 'center',
    },
    variants: {
        size: {
            sm: {
                fontSize: '11px',
            }
        }
    }
});