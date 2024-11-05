import { cva } from "@styled-system/css";

export const divider = cva({
    base: {
        backgroundColor: 'var(--dropdown-border)',
    },
    variants: {
        vertical: {
            true: {
                minW: '1px',
                minH: '100%',
            },
            false: {
                minW: '100%',
                minH: '1px',
            }
        },
        isMainDivider: {
            true: {
                lgDown: {
                    minW: '100%!',
                    minH: '1px!',
                }
            }
        },
        withMargin: {
            // TODO: Add support for vertical dividers
            true: {
                marginTop: '5px',
                marginBottom: '5px',
            }
        }
    },
    defaultVariants: {
        vertical: false,
    }
});