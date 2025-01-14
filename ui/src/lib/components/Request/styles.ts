import { css, cva } from "@styled-system/css";

export const request = css({
    borderRadius: '10px',
    cursor: 'pointer',
    // padding: '10px',
    padding: '6px',
    transition: 'background-color .3s ease',
    '& [data-more-actions]': {
        transition: 'opacity .3s ease, visibility .3s ease',
        opacity: 0,
        visibility: 'hidden',
    },
    '&:hover': {
        backgroundColor: 'var(--vscode-list-hoverBackground)',
        '& [data-more-actions]': {
            opacity: 1,
            visibility: 'visible',
        },
    }
});

export const requestTitle = css({
    fontSize: 13,
    // color: 'var(--vscode-disabledForeground)',
    fontWeight: 500
});

export const requestTop = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
});

export const requestTopLeft = css({
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
});

export const methodBadge = cva({
    base: {
        borderRadius: '9999px',
        padding: '4px 8px',
        fontSize: '10px',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
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
            socketio: {
                backgroundColor: 'methods.socketio.background',
                color: 'methods.socketio.foreground',
            },
        },
        type: {
            iconAndLabel: {
                paddingLeft: '4px',
            },
            onlyIcon: {
                padding: '4px',
            }
        }
    },
});

export const iconStyles = css({
    color: 'var(--vscode-disabledForeground)',
});