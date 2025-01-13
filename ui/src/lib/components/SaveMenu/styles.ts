import { sva } from '@styled-system/css';

export const saveMenu = sva({
    slots: ['container', 'header', 'title', 'subtitle', 'searchBar', 'actions', 'button', 'buttonText', 'menu', 'tree'],
    base: {
        container: {
            width: '300px',
            padding: '10px',
            paddingBottom: '5px',
        },
        header: {
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        title: {
            fontSize: '16px',
            fontWeight: 600,
        },
        subtitle: {
            fontSize: '11px',
            color: 'var(--vscode-disabledForeground)',
        },
        searchBar: {
            marginTop: '10px',
        },
        actions: {
            padding: '10px',
            paddingTop: '5px',
            display: 'flex',
            justifyContent: 'flex-end',
        },
        button: {
            height: '30px',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText: {
            fontWeight: 600,
            fontSize: '13px',
        },
        menu: {
            // maxHeight: '600px'
        },
        tree: {
            maxHeight: '400px',
            overflowX: 'hidden',
            overflowY: 'auto',
        }
    },
});