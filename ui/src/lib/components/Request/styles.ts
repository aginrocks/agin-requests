import { css, cva } from "@styled-system/css";

export const request = css({
    borderRadius: '10px',
    cursor: 'pointer',
    padding: '12px',
    '&:hover': {
        backgroundColor: 'var(--vscode-list-hoverBackground)'
    }
});

export const requestTitle = css({
    fontSize: 14,
    // color: 'var(--vscode-disabledForeground)',
    fontWeight: 500
});

export const requestTop = css({
    display: 'flex',
    gap: '8px',
    // TODO
});

export const methodBadge = cva({
    base: {
        borderRadius: '9999999px',
        padding: '8px 12px',
    },
    variants: {
        method: {
            get: {
                backgroundColor: 'methods.get.background',
                color: 'methods.get.foreground',
            },
            post: {
                backgroundColor: 'methods.post.background',
                color: 'methods.post.foreground',
            },
        }
    }
});