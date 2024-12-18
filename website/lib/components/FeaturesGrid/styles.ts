import { css } from "@/styled-system/css";

export const featuresGrid = css({
    display: 'grid',
    gridTemplateColumns: {
        base: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
    },
    gap: '15px',
});