import Logo from "../Logo";
import { footer, footerLabel } from "./styles";

export function Footer() {
    return (
        <div className={footer}>
            <div>
                <Logo size="lg" />
                <div className={footerLabel}>Open-source on GitHub. Built in Poland.</div>
            </div>
        </div>
    )
}