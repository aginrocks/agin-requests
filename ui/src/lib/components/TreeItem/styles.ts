import { sva } from "@styled-system/css";

export const tree = sva({
    slots: ['header', 'headerLeft', 'icon', 'line', 'children'],
    base: {
        header: {
            borderRadius: '10px',
            cursor: 'pointer',
            padding: '8px 10px',
            transition: 'background-color .3s ease',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            '& [data-more-actions]': {
                transition: 'opacity .3s ease, visibility .3s ease',
                opacity: 0,
                visibility: 'hidden',
            },
            '&:hover': {
                // backgroundColor: 'color-mix(in srgb, var(--vscode-list-hoverBackground), white 1%)',
                backgroundColor: 'var(--vscode-list-hoverBackground)',
                '& [data-more-actions]': {
                    opacity: 1,
                    visibility: 'visible',
                },
            }
        },
        headerLeft: {
            fontSize: '13px',
            // color: 'var(--vscode-disabledForeground)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
        },
        icon: {
            color: 'var(--vscode-disabledForeground)',
        }
    },
    variants: {
        expanded: {
            true: {

            }
        }
    }
});