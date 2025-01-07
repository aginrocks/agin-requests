import { css, cva } from "@styled-system/css";

export const typeSelector = css({
    border: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
    borderRadius: '6px',
    maxWidth: 'max-content',
    marginRight: '10px',
});

export const container = css({
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const left = css({
    display: 'flex',
    alignItems: 'center',
});

export const requestName = cva({
    base: {
        fontWeight: 600,
        fontSize: '14px',
    },
    variants: {
        isDraft: {
            true: {
                color: 'var(--vscode-disabledForeground)',
            }
        }
    }
});

export const requestNameContainer = css({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
});

export const right = css({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
});