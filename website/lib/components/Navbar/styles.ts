import { css } from "@/styled-system/css";

export const container = css({
    position: 'fixed',
    left: '0px',
    right: '0px',
    top: '0px',
    paddingTop: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
});

export const menu = css({
    border: '1px solid token(colors.border.1)',
    borderRadius: 9999999,
    padding: '5px 7px',
    height: '46px',
    backgroundColor: '#00000050',
    backdropFilter: 'blur(20px) brightness(.8)',
    display: 'flex',
    alignItems: 'center',
});

export const menuLogo = css({
    marginLeft: '10px',
    marginRight: '10px',
});

export const linksContainer = css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5px',
});