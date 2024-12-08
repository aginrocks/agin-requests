import { css, cva } from "@styled-system/css";

export const targetStyles = css({
    position: 'relative',
});

export const dropdownContainer = cva({
    base: {
        position: 'absolute',
        visibility: 'hidden',
        transition: 'scale .3s ease, opacity .3s ease, visibility .3s ease',
        // transformOrigin: 'top right',
        scale: .95,
        opacity: 0,
    },
    variants: {
        position: {
            bottomStart: {
                bottom: '0px',
                transform: 'translateY(calc(100% + 3px))',
                right: 0,
                width: 'max-content'
            }
        },
        opened: {
            true: {
                scale: 1,
                opacity: 1,
                visibility: 'visible',
            }
        }
    },
    defaultVariants: {
        position: 'bottomStart',
    }
});