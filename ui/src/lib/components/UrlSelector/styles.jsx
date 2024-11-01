import { css } from "@styled-system/css";

export const container = css({
    padding: '15px',
});

export const inputGroup = css({
    display: 'flex',
    height: '35px',
    // gap: '5px',
});

export const input = css({
    // height: '35px',
    '& input': {
        height: '100%',
        backgroundColor: '#FF0000'
    }
});

export const sendButton = css({
    borderRadius: '9999999px',
    borderLeftRadius: '0px',
    padding: '10px 5px',
    paddingRight: '8px',
    height: '100%'
});

export const methodSelector = css({
    display: 'flex',
    height: '100%',
    gap: '10px',
})