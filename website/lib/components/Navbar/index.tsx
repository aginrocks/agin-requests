import { IconDownload } from "@tabler/icons-react";
import Logo from "../Logo";
import NavbarLink from "./NavbarLink";
import { container, linksContainer, menu, menuLogo } from "./styles";

export type NavbarLink = {

}

const links: NavbarLink[] = [];

export function Navbar() {
    return (
        <div className={container}>
            <div className={menu}>
                <div className={menuLogo}>
                    <Logo size="sm" />
                </div>
                <div className={linksContainer}>
                    <NavbarLink label="Home" active />
                    <NavbarLink label="Docs" />
                    <NavbarLink label="GitHub" />
                </div>
                <NavbarLink label="Download" primary icon={IconDownload} />
            </div>
        </div>
    )
}