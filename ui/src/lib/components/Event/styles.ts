import { css, cva } from "@styled-system/css";

export const eventStyles = css({
    borderBottom: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
    // padding: '8px 18px',
    padding: '0px 18px',
    position: 'relative'
});

export const eventInner = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const eventLeft = css({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
});

export const eventDate = css({
    color: 'var(--vscode-disabledForeground)',
    fontSize: '12px',
});

export const eventName = cva({
    base: {
        color: 'var(--vscode-disabledForeground)',
        fontSize: '12px',
        // marginBottom: '2px',
    },
    variants: {
        argsDisplayed: {
            true: {
                marginTop: '8px',
            }
        }
    }
});

export const eventContent = cva({
    base: {
        fontSize: '14px',
        padding: '8px 0',
    },
    variants: {
        bold: {
            true: {
                fontWeight: 600,
            }
        }
    }
});

export const eventIcon = css({
    padding: '8px 0',
});

export const eventCodeContainer = cva({
    base: {
        '& *': {
            whiteSpace: 'pre-wrap',
        }
    },
    variants: {
        expanded: {
            false: {
                maxHeight: '125px',
                overflow: 'hidden',
                paddingTop: '8px',
            },
            true: {
                padding: '8px 0',
            }
        }
    }
});

export const seeMore = cva({
    base: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: '10px',
    },
    variants: {
        visible: {
            true: {
                background: 'linear-gradient(transparent, var(--vscode-editor-background))',
                position: 'absolute',
                left: '0px',
                right: '0px',
                bottom: '0px',
                height: '80px',
            }
        }
    }
});

export const seeMoreButton = css({
    backgroundColor: 'var(--vscode-editor-background)',
});

export const seeMoreInside = css({
    padding: '6px 10px',
    border: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
    cursor: 'pointer',
    transition: 'background-color .3s ease',
    fontSize: '11px',
    color: 'var(--vscode-disabledForeground)',
    fontWeight: 500,
    borderRadius: '999999px',
    '&:hover': {
        backgroundColor: 'var(--vscode-list-hoverBackground)',
    }
});

export const seeMoreSpacer = css({

})

export const argsList = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    paddingTop: '3px',
    paddingBottom: '8px',
});