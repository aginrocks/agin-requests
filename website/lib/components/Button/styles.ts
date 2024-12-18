import { sva } from "@/styled-system/css";

export const button = sva({
    slots: ['button'],
    base: {
        button: {
            padding: '12px 18px',
            borderRadius: '99999px',
            cursor: 'pointer',
            transition: 'background-color .3s ease, color .3s ease, outline-color .3s ease',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'var(--font-inter)',
            fontSize: '16px',
            gap: '10px',
        },
    },
    variants: {
        variant: {
            primary: {
                button: {
                    color: 'text.0',
                    backgroundColor: 'primary',
                    fontWeight: 600,
                    _hover: {
                        backgroundColor: 'primary.dark',
                    }
                }
            },
            secondary: {
                button: {
                    outline: '1px solid token(colors.border)',
                    _hover: {
                        outline: '1px solid token(colors.border.1)',
                    }
                }
            },
        }
    },
    defaultVariants: {
        variant: 'secondary',
    }
});