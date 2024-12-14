import { sva } from "@styled-system/css";

export const drawer = sva({
    slots: ['drawer', 'header', 'title', 'subtitle'],
    base: {
        // background: {
        //     backgroundColor: '#00000050',
        //     transition: 'opacity .3s ease, visibility .3s ease',
        //     position: 'fixed',
        //     left: '0px',
        //     right: '0px',
        //     top: '0px',
        //     bottom: '0px',
        //     zIndex: 9999998,
        // },
        drawer: {
            position: 'fixed',
            right: '0px',
            top: '0px',
            bottom: '0px',
            backgroundColor: 'var(--vscode-editor-background)',
            borderLeft: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
            borderTopLeftRadius: '15px',
            borderBottomLeftRadius: '15px',
            transform: 'translateX(0%)',
            transition: 'visibility .3s ease, transform .3s ease',
            width: '400px',
            zIndex: 9999999,
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
            display: 'flex',
            flexDir: 'column',
        },
        header: {
            padding: '20px',
            paddingBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        title: {
            fontSize: '18px',
            fontWeight: 600,
        },
        subtitle: {
            fontSize: '12px',
            color: 'var(--vscode-disabledForeground)',
            marginTop: '2px',
        },
    },
    variants: {
        opened: {
            false: {
                drawer: {
                    // opacity: 0,
                    visibility: 'hidden',
                    transform: 'translateX(100%)',
                }
            }
        },
        withLine: {
            true: {
                header: {
                    paddingBottom: '15px',
                    borderBottom: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
                }
            }
        }
    },
    defaultVariants: {
        opened: false,
    }
});