import { css } from "@styled-system/css";

export const mainButton = css({
    width: '100%',
    paddingTop: '2px',
    paddingBottom: '2px',
    borderRadius: '5px',
    borderRightRadius: '0px',
});

export const optionsButton = css({
    borderRadius: '5px',
    borderLeftRadius: '0px',
    flex: 1,
    '& *': {
        padding: '0px !important',
    }
});

export const buttonDivider = css({
    minWidth: '1px',
    minHeight: '100%',
    backgroundColor: 'var(--vscode-button-hoverBackground)',
});

export const buttonContainer = css({
    display: 'flex',
});

export const icon = css({
    minWidth: '16px'
});

export const optionsTarget = css({
    // TODO: Better handling
    height: '30px',
    display: 'flex',
});