import { css, cva } from "@styled-system/css";

export const metric = css({
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
});

export const labelStyles = css({
    color: 'var(--vscode-disabledForeground)',
    fontSize: 12,
});

export const valueStyles = cva({
    base: {
        color: 'var(--vscode-activeForeground)',
        fontSize: 14,
        fontWeight: 600,
    },
    variants: {
        color: {
            green: {
                color: '#0bae4a',
            },
            red: {
                color: '#f22625',
            },
        }
    }
});