import { Icon, IconFlame } from "@tabler/icons-react";
import { logo, subtitleStyles, titleStyles, welcome } from "./styles";
import { useRequest } from "@lib/hooks";

export type WelcomeProps = {
    title?: string;
    subtitle?: string;
    icon?: Icon;
    color?: 'red';
    size?: 'sm';
}

export default function Welcome({ title, subtitle, icon, color, size }: WelcomeProps) {
    const Icon = icon ?? IconFlame;

    const request = useRequest();

    return (
        <div className={welcome}>
            <Icon size={size == 'sm' ? 40 : 50} stroke={1.4} className={logo({ color })} />
            <div className={titleStyles({ size })}>{title ?? 'Welcome to Agin Requests!'}</div>
            <div className={subtitleStyles({ size })}>{subtitle ?? `Set request details and press ${(request?.values.type == 'sse' || request?.values.type == 'ws' || request?.values.type == 'socketio') ? 'Connect' : 'Send'}.`}</div>
        </div>
    )
}