import { css } from "@styled-system/css";

export const inputContainer = css({
    // border
    border: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
    borderRadius: '9999999px',
    height: '35px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0px',
    paddingLeft: '10px',
    '&:focus-within': {
        borderColor: 'var(--vscode-focusBorder)',
    }
});

export const input = css({
    flex: 1,
    height: '100%',
    outline: 'none !important',
    fontWeight: 500,
    padding: '10px'
});