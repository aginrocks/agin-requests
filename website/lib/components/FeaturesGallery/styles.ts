import { css } from "@/styled-system/css";

export const gallery = css({
    height: '800px',
    borderTop: '1px solid token(colors.border)',
    // padding: '80px 120px',
    paddingTop: '80px',
    paddingBottom: '80px',
    paddingLeft: '60px',
    paddingRight: 0,
    overflow: 'hidden',

    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    '2xl': {
        gap: '0px',
        paddingLeft: '160px',
    },
    // mdDown: {
    //     paddingLeft: '20px',
    //     paddingRight: '20px',
    // }
});

export const features = css({
    width: '400px',
    minWidth: '400px',
    display: 'flex',
    flexDir: 'column',
    gap: '5px'
});

// TODO: In a smaller breakpoint, overflow the image to the right
export const image = css({
    flex: 1,
    objectFit: 'contain',
    maxH: '100%',
    marginRight: '-200px',
    xl: {
        marginRight: '0px',
    }
});