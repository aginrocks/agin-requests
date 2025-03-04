import { css, cva } from "@styled-system/css";

export const themeCheckboxIconContainer = cva({
    base: {
        width: '26px',
        height: '26px',
        borderRadius: '99999px',
        // backgroundColor: 'color-mix(in srgb, var(--vscode-list-hoverBackground), var(--vscode-editor-background) 80%)',
        // color: 'var(--button-primary-background)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    variants: {
        iconColor: {
            theme: {
                backgroundColor: 'color-mix(in srgb, var(--button-primary-background), var(--vscode-editor-background) 80%)',
                color: 'var(--button-primary-background)',
            }
        },
        clickable: {
            true: {
                cursor: 'pointer',
            }
        }
    }
});