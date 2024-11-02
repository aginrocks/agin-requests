import { css, cva } from "@styled-system/css";

export const simpleInputContainer = css({
    borderBottom: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
    // height: '35px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0px',
    '&:focus-within': {
        borderBottomColor: 'var(--vscode-focusBorder)',
    }
});

export const input = css({
    flex: 1,
    height: '100%',
    outline: 'none !important',
    fontWeight: 500,
    padding: '8px',
    paddingLeft: '10px'
});