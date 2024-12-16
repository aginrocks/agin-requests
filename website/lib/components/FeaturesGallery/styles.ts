import { css } from "@/styled-system/css";

export const gallery = css({
    height: '800px',
    borderTop: '1px solid token(colors.border)',
    // padding: '80px 120px',
    padding: '80px 180px',
    paddingRight: 0,
    display: 'flex',
    alignItems: 'center',
});

export const features = css({
    width: '400px',
    display: 'flex',
    flexDir: 'column',
    gap: '5px'
});

// TODO: In a smaller breakpoint, overflow the image to the right
export const image = css({
    flex: 1,
    objectFit: 'contain',
    maxH: '100%',
});