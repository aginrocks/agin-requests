import { css, cva } from "@styled-system/css";

export const eventStyles = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
    padding: '8px 18px',
});

export const eventLeft = css({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
});

export const eventDate = css({
    color: 'var(--vscode-disabledForeground)',
    fontSize: '12px',
});

export const eventName = css({
    color: 'var(--vscode-disabledForeground)',
    fontSize: '12px',
    // marginBottom: '2px',
});

export const eventContent = cva({
    base: {
        fontSize: '14px',
    },
    variants: {
        bold: {
            true: {
                fontWeight: 600,
            }
        }
    }
});