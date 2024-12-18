import { css } from "@/styled-system/css";

export const privacy = css({
    padding: {
        base: '50px 30px',
        lg: '50px 60px',
        '2xl': '50px 160px'
    },
    display: 'flex',
    flexDir: 'column',
    alignItems: 'center',
    position: 'relative',
});

export const privacyTitle = css({
    fontSize: '30px',
    color: 'text.0',
    textAlign: 'center',
    marginBottom: '10px',
    marginTop: '15px',
    fontWeight: 500,
    fontFamily: 'var(--font-inter)',
});

export const privacySubtitle = css({
    fontSize: '16px',
    color: '#ffffff90',
    fontFamily: 'var(--font-inter)',
    textAlign: 'center',
});

export const privacyHeader = css({
    maxW: '650px',
    display: 'flex',
    flexDir: 'column',
    alignItems: 'center',
    position: 'relative',
    marginBottom: '30px',
});