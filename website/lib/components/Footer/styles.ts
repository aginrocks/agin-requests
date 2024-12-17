import { css } from "@/styled-system/css";

export const footer = css({
    padding: {
        base: '50px 30px',
        lg: '50px 60px',
        '2xl': '50px 160px'
    },
    borderTop: '1px solid token(colors.border)',
    backgroundImage: 'radial-gradient(#ffffff10 1px, transparent 0)',
    backgroundSize: '40px 40px',
});

export const footerLabel = css({
    fontFamily: 'var(--font-inter)',
    fontSize: '12px',
    color: 'text.1',
    marginTop: '20px',
});