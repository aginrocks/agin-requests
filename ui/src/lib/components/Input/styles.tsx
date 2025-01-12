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
        pos: 'relative',
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
        radius: {
            sm: {
                borderRadius: '10px',
            }
        },
        variant: {
            compact: {
                height: '30px',
                borderRadius: '10px',
                fontSize: '12px',
            }
        }
    }
});

export const input = css({
    flex: 1,
    height: '100%',
    outline: 'none !important',
    fontWeight: 500,
    padding: '10px',
    paddingLeft: '12px'
});

export const rightSectionStyles = css({
    position: 'absolute',
    right: '0px',
    top: '0px',
    bottom: '0px',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '3px'
});

export const labelStyles = cva({
    base: {
        fontSize: '12px',
        fontWeight: 500,
        marginBottom: '3px',
    },
    variants: {
        separate: {
            true: {
                marginBottom: '6px',
            }
        }
    }
});

export const containerStyles = css({
    width: '100%',
});