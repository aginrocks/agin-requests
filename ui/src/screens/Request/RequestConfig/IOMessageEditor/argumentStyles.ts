import { css } from '@styled-system/css';
import { cva } from '@styled-system/css/cva.mjs';

export const container = css({
    border: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
    borderRadius: '10px',
    overflow: 'hidden',
});

export const containerLeft = css({
    display: 'flex',
    alignItems: 'center',
});

export const containerActions = css({
    display: 'flex',
    alignItems: 'center',
});

export const editorContainer = cva({
    base: {
        overflow: 'hidden',
    },
    variants: {
        type: {
            long: {
                height: '100px',
            },
            short: {
                height: '18px',
            }
        }
    },
    defaultVariants: {
        type: 'long',
    }
});

export const header = css({
    display: 'flex',
    height: '34px',
    borderBottom: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
    alignItems: 'center',
    paddingLeft: '12px',
    paddingRight: '4px',
    justifyContent: 'space-between',
});