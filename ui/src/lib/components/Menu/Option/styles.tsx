import { css, cva } from "@styled-system/css";

export const optionStyles = cva({
    base: {
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
        },
    },
    variants: {
        optionColor: {
            'methods.get.foreground': {
                color: 'methods.get.foreground',
            },
            'methods.post.foreground': {
                color: 'methods.post.foreground',
            },
            'methods.patch.foreground': {
                color: 'methods.patch.foreground',
            },
            'methods.put.foreground': {
                color: 'methods.put.foreground',
            },
            'methods.delete.foreground': {
                color: 'methods.delete.foreground',
            },
            'methods.head.foreground': {
                color: 'methods.head.foreground',
            },
            'methods.options.foreground': {
                color: 'methods.options.foreground',
            },
            'methods.ws.foreground': {
                color: 'methods.ws.foreground',
            },
            'danger.foreground': {
                color: 'danger.foreground',
            }
        }
    }
});

export const optionLabel = css({
    fontSize: '12px',
    fontWeight: 500,
});