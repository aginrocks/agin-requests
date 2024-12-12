import { css, cva } from "@styled-system/css";

export const request = css({
    borderRadius: '10px',
    cursor: 'pointer',
    // padding: '10px',
    padding: '8px 10px',
    transition: 'background-color .3s ease',
    '&:hover': {
        backgroundColor: 'color-mix(in srgb, var(--vscode-list-hoverBackground), white 1%)'
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