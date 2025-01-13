import { cva } from '@styled-system/css';

export const searchContainer = cva({
    base: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
    variants: {
        paddingRight: {
            sm: {
                paddingRight: '10px',
            }
        },
        withPaddings: {
            true: {
                padding: '15px',
                paddingTop: '0px',
                paddingBottom: '5px',
            }
        }
    },
    defaultVariants: {
        withPaddings: true,
    }
});