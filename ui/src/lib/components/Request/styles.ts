import { css, cva } from "@styled-system/css";

export const request = css({
    borderRadius: '10px',
    cursor: 'pointer',
    // padding: '10px',
    padding: '6px',
    transition: 'background-color .3s ease',
    '&:hover': {
        backgroundColor: 'var(--vscode-list-hoverBackground)'
    }
});

export const requestTitle = css({
    fontSize: 13,
    // color: 'var(--vscode-disabledForeground)',
    fontWeight: 500
});

export const requestTop = css({
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
    // TODO
});

export const methodBadge = cva({
    base: {
        borderRadius: '9999px',
        padding: '4px 8px',
        fontSize: '10px',
        fontWeight: 600,
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
            put: {
                backgroundColor: 'methods.put.background',
                color: 'methods.put.foreground',
            },
            patch: {
                backgroundColor: 'methods.patch.background',
                color: 'methods.patch.foreground',
            },
            delete: {
                backgroundColor: 'methods.delete.background',
                color: 'methods.delete.foreground',
            },
            head: {
                backgroundColor: 'methods.head.background',
                color: 'methods.head.foreground',
            },
            options: {
                backgroundColor: 'methods.options.background',
                color: 'methods.options.foreground',
            },
            ws: {
                backgroundColor: 'methods.ws.background',
                color: 'methods.ws.foreground',
            },
        }
    }
});