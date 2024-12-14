import { css } from "@styled-system/css";

export const messagesList = css({
    padding: '20px',
    paddingTop: '0px',
    display: 'flex',
    flexDir: 'column',
    flex: 1,
    maxH: '100%',
    gap: '10px',
    overflow: 'scroll',
});

export const messagesListInner = css({
    display: 'flex',
    flexDir: 'column',
    gap: '10px',
});