import { ServerEvent } from "@lib/types/ServerEvent";
import { Icon, IconArrowDown, IconArrowUp, IconCheck, IconCircleCheck, IconCircleX, IconPlug, IconX } from "@tabler/icons-react";
import { eventContent, eventDate, eventLeft, eventName, eventStyles } from "./styles";
import ThemeIcon from "../ThemeIcon";
import { formatDateToTime } from "@lib/util";
import ActionIcon from "../ActionIcon";

type Color = 'green' | 'red' | 'blue';

export default function Event({ data, receivedAt, type, event }: ServerEvent<any>) {
    const [icon, color]: [Icon, Color] = type == 'connected' ? [IconPlug, 'green'] : type == 'incoming' ? [IconArrowDown, 'blue'] : type == 'outgoing' ? [IconArrowUp, 'blue'] : [IconX, 'red'];

    return (
        <div className={eventStyles}>
            <div className={eventLeft}>
                <ThemeIcon icon={icon} iconColor={color} />
                <div>
                    {event && <div className={eventName}>{event}</div>}
                    <div className={eventContent({ bold: type == 'connected' || type == 'disconnected' })}>{data}</div>
                </div>
            </div>
            <div className={eventLeft}>
                <div className={eventDate}>{formatDateToTime(receivedAt)}</div>
            </div>
        </div>
    )
}