import { css } from "@styled-system/css";

export const base = css({
    display: 'flex',
    width: '100%',
    height: '100vh',
    flex: 1,
    lgDown: {
        flexDir: 'column',
    }
});

export const col = css({
    flex: 1,
});