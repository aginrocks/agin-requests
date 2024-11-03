import { IconFlame } from "@tabler/icons-react";
import { logo, subtitle, title, welcome } from "./styles";

export default function Welcome() {
    return (
        <div className={welcome}>
            <IconFlame size={50} stroke={1.4} className={logo} />
            <div className={title}>Welcome to Agin Requests!</div>
            <div className={subtitle}>Set request details and press Send.</div>
        </div>
    )
}