import { css } from "@/styled-system/css";

export const download = css({
    padding: {
        base: '50px 30px',
        lg: '50px 60px',
        '2xl': '50px 160px'
    },
    display: 'flex',
    flexDir: 'column',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    borderTop: '1px solid token(colors.border)',

});

export const blurContainer = css({
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    left: '0px',
    right: '0px',
    top: '-200px',
    // top: '0px',
    bottom: '0px',
    zIndex: -1,
});

export const blur = css({
    background: 'radial-gradient(farthest-side, #ffffff08, token(colors.background))',
    // background: 'radial-gradient(circle, red, blue)',
    // background: 'red',
    backgroundPosition: 'top',
    backgroundSize: '600px 400px',
    backgroundRepeat: 'no-repeat',
    width: '600px',
    height: '400px',
    // backgroundColor: '#ffffff30',
    // filter: 'blur(50px) brightness(.3)',
});

export const title = css({
    fontSize: '30px',
    color: 'text.0',
    textAlign: 'center',
    marginBottom: '10px',
    marginTop: '15px',
    fontWeight: 500,
    fontFamily: 'var(--font-inter)',
});

export const subtitle = css({
    fontSize: '16px',
    color: '#ffffff90',
    fontFamily: 'var(--font-inter)',
    textAlign: 'center',
});

export const header = css({
    maxW: '650px',
    display: 'flex',
    flexDir: 'column',
    alignItems: 'center',
    position: 'relative',
    marginBottom: '30px',
});

export const actions = css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
});