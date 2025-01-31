import { css } from '@styled-system/css';

export const subtleButton = css({
    color: 'var(--button-primary-background)',
    fontSize: '14px',
    fontWeight: 600,
    padding: '6px',
    cursor: 'pointer',
    transition: 'color .3s ease',
    '&:hover': {
        color: 'var(--button-primary-hover-background)',
    }
});