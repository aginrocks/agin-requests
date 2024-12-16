import { sva } from "@/styled-system/css";

export const featureStyles = sva({
    slots: ['container', 'label', 'description'],
    base: {
        container: {
            padding: '12px 16px',
            borderRadius: '10px',
            border: '1px solid transparent',
            cursor: 'pointer',
            transition: 'border-color .3s ease',
        },
        label: {
            fontFamily: 'var(--font-inter)',
            fontSize: '20px',
            fontWeight: 500,
            marginBottom: '3px',
        },
        description: {
            fontFamily: 'var(--font-inter)',
            fontSize: '14px',
            color: 'text.1',
        }
    },
    variants: {
        active: {
            true: {
                container: {
                    border: '1px solid token(colors.border)',
                    backgroundColor: '#ffffff05',
                }
            }
        }
    }
});