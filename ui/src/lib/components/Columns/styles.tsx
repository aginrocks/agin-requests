import { css } from "@styled-system/css";

export const base = css({
    display: 'flex',
    width: '100%',
    height: '100vh',
    maxHeight: '100vh',
    flex: 1,
    lgDown: {
        flexDir: 'column',
    },
});

export const col = css({
    flex: 1,
    overflow: 'auto',
    maxWidth: '100%',
    overflowX: 'hidden'
});