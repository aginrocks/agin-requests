import { sva } from '@styled-system/css';

export const pendingRequestClasses = sva({
    slots: ['container'],
    base: {
        container: {
            position: 'absolute',
            left: '0px',
            right: '0px',
            top: '0px',
            bottom: '0px',
            backgroundColor: 'var(--vscode-editor-background)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDir: 'column',
            gap: '20px',
            zIndex: 9999,
            transition: 'opacity .2s ease, visibility .2s ease'
        }
    },
    variants: {
        visible: {
            true: {
                container: {
                    opacity: 1,
                    visibility: 'visible',
                },
            },
            false: {
                container: {
                    opacity: 0,
                    visibility: 'hidden',
                },
            },
        }
    }
});