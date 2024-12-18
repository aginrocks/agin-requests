import { css } from "@styled-system/css";

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

export const requestName = css({
    fontWeight: 600,
    fontSize: '14px',
});

export const right = css({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
});