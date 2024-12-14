import { sva } from "@styled-system/css";

export const tooltip = sva({
    slots: ['container', 'tooltip'],
    base: {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'opacity .3s ease, visibility .3s ease, scale .3s ease',
            transformOrigin: 'top',
            textWrap: 'nowrap',
            zIndex: 999999999,
        },
        tooltip: {
            borderRadius: '8px',
            border: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
            padding: '6px 8px',
            backgroundColor: 'var(--vscode-editor-background)',
            fontSize: '11px',
        }
    },
    variants: {
        opened: {
            true: {
                container: {
                    opacity: 1,
                    visibility: 'visible',
                    scale: 1,
                }
            },
            false: {
                container: {
                    opacity: 0,
                    visibility: 'hidden',
                    scale: .95,
                }
            }
        }
    }
})