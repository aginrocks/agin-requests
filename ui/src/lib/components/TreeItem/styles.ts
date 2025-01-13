import { sva } from "@styled-system/css";

export const tree = sva({
    slots: ['base', 'header', 'headerLeft', 'icon', 'line', 'content', 'contentContainer', 'children'],
    base: {
        base: {
            '& [data-line]': {
                opacity: 1,
            }
        },
        header: {
            borderRadius: '10px',
            cursor: 'pointer',
            padding: '6px',
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
                backgroundColor: 'var(--vscode-list-hoverBackground)',
                '& [data-more-actions]': {
                    opacity: 1,
                    visibility: 'visible',
                },
            }
        },
        headerLeft: {
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
        },
        icon: {
            color: 'var(--vscode-disabledForeground)',
        },
        content: {
            display: 'flex',
            alignItems: 'flex-start',
            position: 'relative',
            overflow: 'hidden',
        },
        line: {
            height: '100%',
            width: '1px',
            borderRight: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
            position: 'absolute',
            left: '0px',
            top: '0px',
            bottom: '0px',
            opacity: 0,
            transition: 'opacity .3s ease',
        },
        children: {
            flex: 1,
        },
        contentContainer: {
            display: 'grid',
            overflow: 'hidden',
            transition: 'opacity .2s ease, visibility .2s ease, grid-template-rows .2s ease',
        }
    },
    variants: {
        expanded: {
            true: {
                contentContainer: {
                    gridTemplateRows: '1fr',
                    opacity: 1,
                    visibility: 'visible',
                },
            },
            false: {
                contentContainer: {
                    gridTemplateRows: '0fr',
                    opacity: 0,
                    visibility: 'hidden',
                },
            },
        },
        selected: {
            true: {
                header: {
                    backgroundColor: 'var(--vscode-list-hoverBackground)',
                }
            }
        }
    }
});