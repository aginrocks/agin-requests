import { css } from "@styled-system/css";

export const metricsStyles = css({
    margin: '18px',
    marginTop: '22px',
    marginBottom: '15px',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',

    border: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
    padding: '10px 15px',
    // paddingBottom: '3px',
    borderRadius: '10px',
    position: 'relative'


    // height: 'calc(33px + 18px + 22px)'
});

export const metricsLeftStyles = css({
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
});

export const metricsRightStyles = css({
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    paddingRight: '15px',
    paddingTop: '10px',
    paddingBottom: '3px',
});