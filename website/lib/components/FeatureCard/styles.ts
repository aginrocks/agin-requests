import { sva } from "@/styled-system/css";

export const card = sva({
    slots: ['card', 'icon', 'label', 'description'],
    base: {
        card: {
            borderRadius: '15px',
            padding: '16px 20px',
            paddingLeft: '25px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flex: 1,
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
        }
    }
});