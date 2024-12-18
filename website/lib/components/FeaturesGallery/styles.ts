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

export const galleryTitle = css({
    fontSize: '25px',
    color: 'text.0',
    marginBottom: '10px',
    marginTop: '15px',
    fontWeight: 500,
    fontFamily: 'var(--font-inter)',
});

export const gallerySubtitle = css({
    fontSize: '15px',
    color: '#ffffff90',
    fontFamily: 'var(--font-inter)',
});

export const featuresHeader = css({
    marginBottom: '10px',
});

export const features = css({
    width: '400px',
    minWidth: '400px',
    display: 'flex',
    flexDir: 'column',
    gap: '5px'
});

export const imageContainer = css({
    flex: 1,
    maxH: '100%',
    marginRight: '-200px',
    position: 'relative',
    // backgroundColor: 'red',
    height: '100%',
    xl: {
        marginRight: '0px',
    }
});

export const image = css({
    objectFit: 'contain',
    position: 'absolute',
    left: '0px',
    right: '0px',
    top: '0px',
    bottom: '0px',
    width: '100%',
    height: '100%',
});