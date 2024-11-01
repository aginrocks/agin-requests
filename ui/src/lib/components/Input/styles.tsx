import { css, cva } from "@styled-system/css";

export const inputContainer = cva({
    base: {
        // border
        border: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
        borderRadius: '9999999px',
        height: '35px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0px',
        '&:focus-within': {
            borderColor: 'var(--vscode-focusBorder)',
        }
    },
    variants: {
        withRightBorder: {
            false: {
                borderRightWidth: 0,
            }
        },
        withLeftBorder: {
            false: {
                borderLeftWidth: 0,
            }
        },
        withLeftRadius: {
            false: {
                borderLeftRadius: 0,
            }
        },
        withRightRadius: {
            false: {
                borderRightRadius: 0,
            }
        },
        withHorizontalPadding: {
            true: {
                padding: '0 10px',
            }
        },
    }
});

export const input = css({
    flex: 1,
    height: '100%',
    outline: 'none !important',
    fontWeight: 500,
    padding: '10px',
    paddingLeft: '15px'
});