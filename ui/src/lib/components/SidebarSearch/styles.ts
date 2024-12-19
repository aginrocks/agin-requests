import { css, cva } from "@styled-system/css";

export const searchContainer = cva({
    base: {
        padding: '15px',
        paddingTop: '0px',
        paddingBottom: '5px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
    variants: {
        paddingRight: {
            sm: {
                paddingRight: '10px',
            }
        }
    }
});