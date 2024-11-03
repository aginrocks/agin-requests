import { css } from "@styled-system/css";

export const welcome = css({
    flex: 1,
    display: 'flex',
    flexDir: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
});

export const logo = css({
    color: 'var(--vscode-disabledForeground)',
    marginBottom: '10px'
});

export const title = css({
    color: 'var(--vscode-activeForeground)',
    fontWeight: 600,
    fontSize: '18px',
});

export const subtitle = css({
    color: 'var(--vscode-disabledForeground)',
    fontSize: '14px',
});