import { sva } from "@/styled-system/css";

export const featureIcon = sva({
    slots: ['container'],
    base: {
        container: {
            border: '1px solid token(colors.border)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '15px',
            backgroundColor: '#00000050',
            backdropFilter: 'blur(20px) brightness(.8)',
            color: 'primary',
        }
    },
    variants: {
        size: {
            sm: {
                container: {
                    width: '50px',
                    height: '50px',
                }
            },
            md: {
                container: {
                    width: '60px',
                    height: '60px',
                }
            }
        },
        variant: {
            gradient: {
                container: {
                    background: 'radial-gradient(circle, #ffffff10, #00000050)',
                    backgroundPosition: '-25px 25px',
                    backgroundSize: '75px 75px',
                    backgroundRepeat: 'no-repeat'
                }
            }
        }
    },
    defaultVariants: {
        size: 'md',
    }
})