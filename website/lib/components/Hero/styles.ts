import { css } from "@/styled-system/css";

export const hero = css({
    height: '100vh',
    backgroundImage: 'radial-gradient(#ffffff10 1px, transparent 0)',
    backgroundSize: '40px 40px',
    position: 'relative', // Allows positioning of child elements
    overflow: 'hidden',
});

export const secondaryGrid = css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'radial-gradient(#ffffff20 1px, transparent 0)', // Secondary grid pattern
    backgroundSize: '40px 40px',
    maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
    // WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)', // Webkit support
    maskRepeat: 'no-repeat',
    maskSize: '400px 400px',
    // WebkitMaskRepeat: 'no-repeat',
    pointerEvents: 'none',
    zIndex: 2,
});

export const content = css({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: '40px 40px',
    display: 'flex',
    alignItems: 'center',
    flexDir: 'column',
    paddingTop: '120px',
    zIndex: 3,
});

export const heroTitle = css({
    fontSize: '35px',
    color: 'text.0',
    // textAlign: 'center',
    marginBottom: '10px',
    fontWeight: 500,
    fontFamily: 'var(--font-inter)',
});

export const heroSubtitle = css({
    fontSize: '20px',
    color: '#ffffff90',
    fontFamily: 'var(--font-inter)',
});

export const heroTextBox = css({
    maxWidth: '900px',
    paddingLeft: '30px',
    paddingRight: '30px',
});

export const screenshotContainer = css({
    flex: 1,
    height: '100%',
    width: '1200px',
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    maxW: '100vw',
    // outline: '1px solid red'
});

export const screenshot = css({
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    maxW: '100%',
});