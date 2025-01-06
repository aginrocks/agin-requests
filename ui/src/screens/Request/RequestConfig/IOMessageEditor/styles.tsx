import { css, cva } from "@styled-system/css";

export const container = cva({
    base: {
        padding: '0 20px',
        display: 'flex',
        flexDir: 'column',
    },
    variants: {
        full: {
            true: {
                flex: 1,
            }
        }
    },
    defaultVariants: {
        full: true,
    }
});

export const paramsContainer = css({
    marginTop: '10px'
});

export const editor = css({
    flex: 1,
});

export const secondaryActions = css({
    display: 'flex',
    alignItems: 'center',
});

export const argumentsList = css({
    display: 'flex',
    flexDir: 'column',
    gap: '10px',
    marginTop: '10px',
});

export const addArgument = css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px',
});

export const addArgumentButton = css({
    height: '30px',
    borderRadius: '99999px',
});

export const addArgumentButtonText = css({
    fontWeight: 600,
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
});