import { css } from "@styled-system/css";

export const messageName = css({
    padding: '4px 8px',
    border: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
    cursor: 'pointer',
    transition: 'background-color .3s ease',
    fontSize: '10px',
    color: 'var(--vscode-disabledForeground)',
    fontWeight: 500,
    borderRadius: '999999px',
    marginRight: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    '&:hover': {
        backgroundColor: 'var(--vscode-list-hoverBackground)',
    }
});