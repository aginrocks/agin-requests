import { sva } from "@styled-system/css";

export const breadcrumbsClasses = sva({
    slots: ['label', 'divider', 'container'],
    base: {
        label: {
            fontWeight: 500,
            fontSize: '14px',
            color: 'var(--vscode-disabledForeground)',
            transition: 'color .3s ease',
            cursor: 'pointer',
            '&:hover': {
                color: 'color-mix(in srgb, var(--vscode-disabledForeground), white 20%)'
            }
        },
        container: {
            display: 'flex',
            gap: '6px',
            alignItems: 'center',
        },
        divider: {
            color: 'var(--vscode-disabledForeground)',
            fontSize: '14px',
            fontWeight: 400,
        }
    }
});