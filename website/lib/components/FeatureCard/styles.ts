import { sva } from "@/styled-system/css";

export const card = sva({
    slots: ['card', 'icon', 'label', 'description', 'border', 'blur'],
    base: {
        card: {
            borderRadius: '15px',
            padding: '16px 20px',
            paddingLeft: '25px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            overflow: 'hidden',
            position: 'relative',
            transition: 'transform .5s ease',
            _hover: {
                transform: 'scale(1.01)',
            }
        },
        border: {
            position: 'absolute',
            left: '0px',
            right: '0px',
            top: '0px',
            bottom: '0px',
            borderRadius: '15px',
            border: '1px solid token(colors.border)',
            pointerEvents: 'none',
        },
        icon: {
            minW: '30px',
        },
        label: {
            fontFamily: 'var(--font-inter)',
            fontSize: '18px',
            fontWeight: 500,
            marginBottom: '3px',
        },
        description: {
            fontFamily: 'var(--font-inter)',
            fontSize: '14px',
            color: 'text.1',
        },
        blur: {
            width: '200px',
            height: '150px',
            backgroundColor: '#ffffff40',
            position: 'absolute',
            filter: 'blur(50px) brightness(.3)',
            transition: 'opacity 1s ease',
            zIndex: -1,
        }
    }
});