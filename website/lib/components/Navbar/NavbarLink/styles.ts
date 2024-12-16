import { sva } from "@/styled-system/css";

export const link = sva({
    slots: ['link'],
    base: {
        link: {
            padding: '6px 10px',
            borderRadius: '9999999px',
            fontSize: '12px',
            color: 'text.1',
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'color .3s ease, background-color .3s ease, border .3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            '&:hover': {
                color: 'text.0',
            }
        }
    },
    variants: {
        active: {
            true: {
                link: {
                    border: '1px solid token(colors.border)',
                    backgroundColor: '#ffffff10',
                    color: 'text.0',
                }
            }
        },
        primary: {
            true: {
                link: {
                    backgroundColor: 'primary',
                    color: 'text.0',
                    fontWeight: 600,
                    '&:hover': {
                        backgroundColor: 'primary.dark',
                    }
                }
            }
        }
    }
})