import { css, cva } from "@styled-system/css";

export const targetStyles = css({
    position: 'relative',
});

export const dropdownContainer = cva({
    base: {
        position: 'absolute',
        visibility: 'hidden',
        transition: 'scale .3s ease, opacity .3s ease, visibility .3s ease, width .3s ease',
        // transformOrigin: 'top right',
        scale: .95,
        opacity: 0,
        zIndex: 999999,
        minW: 'max-content',
    },
    variants: {
        // position: {
        //     bottomEnd: {
        //         bottom: '0px',
        //         transform: 'translateY(calc(100% + 3px))',
        //         right: 0,
        //         width: 'max-content'
        //     },
        //     bottomStart: {
        //         bottom: '0px',
        //         transform: 'translateY(calc(100% + 3px))',
        //         left: 0,
        //         width: 'max-content'
        //     },
        // },
        opened: {
            true: {
                scale: 1,
                opacity: 1,
                visibility: 'visible',
            }
        }
    },
    defaultVariants: {
        // position: 'bottomEnd',
    }
});