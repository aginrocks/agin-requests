import { Icon, IconFlame } from "@tabler/icons-react";
import { logo, subtitleStyles, titleStyles, welcome } from "./styles";

export type WelcomeProps = {
    title?: string;
    subtitle?: string;
    icon?: Icon;
    color?: 'red';
}

export default function Welcome({ title, subtitle, icon, color }: WelcomeProps) {
    const Icon = icon ?? IconFlame;

    return (
        <div className={welcome}>
            <Icon size={50} stroke={1.4} className={logo({ color })} />
            <div className={titleStyles}>{title ?? 'Welcome to Agin Requests!'}</div>
            <div className={subtitleStyles}>{subtitle ?? 'Set request details and press Send.'}</div>
        </div>
    )
}