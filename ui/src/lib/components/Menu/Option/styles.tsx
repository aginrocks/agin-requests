import { css } from "@styled-system/css";

export const optionStyles = css({
    padding: '6px 10px',
    borderRadius: '7px',
    cursor: 'pointer',
    transition: 'background-color .3s ease',
    display: 'flex',
    // justifyContent: 'space-between',
    gap: '8px',
    alignItems: 'center',
    '&:hover': {
        backgroundColor: 'var(--vscode-list-hoverBackground)',
    }
});

export const optionLabel = css({
    fontSize: '12px',
    fontWeight: 500,
});