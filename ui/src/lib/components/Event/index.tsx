import { ServerEvent } from "@shared/types/ServerEvent";
import { Icon, IconArrowDown, IconArrowUp, IconPlug, IconX } from "@tabler/icons-react";
import { eventCodeContainer, eventContent, eventDate, eventIcon, eventInner, eventLeft, eventName, eventStyles, seeMore, seeMoreButton, seeMoreInside } from "./styles";
import ThemeIcon from "../ThemeIcon";
import { formatDateToTime } from "@lib/util";
import Highlight from "../Highlight";
import { useMemo, useState } from "react";

type Color = 'green' | 'red' | 'blue';

export default function Event({ data, receivedAt, type, event }: ServerEvent<any>) {
    const [icon, color]: [Icon, Color] = type == 'connected' ? [IconPlug, 'green'] : type == 'incoming' ? [IconArrowDown, 'blue'] : type == 'outgoing' ? [IconArrowUp, 'green'] : [IconX, 'red'];

    const lang = useMemo(() => {
        let lang = typeof data == 'object' ? data.type : 'text';
        try {
            JSON.parse(typeof data == 'object' ? data.data : data);
            lang = 'json';
        } catch (error) {
        }
        return lang;
    }, [data]);
    const code = typeof data == 'object' ? data.data : data;

    // FIXME: Not accounting for line breaks
    const overflowing = code.split('\n').length > 6;

    const [expanded, setExpanded] = useState(false);

    return (
        <div className={eventStyles}>
            <div className={eventInner}>
                <div className={eventLeft}>
                    <div className={eventIcon}>
                        <ThemeIcon icon={icon} iconColor={color} />
                    </div>
                    <div>
                        {event && <div className={eventName}>{event}</div>}
                        {type == 'connected' || type == 'disconnected' ? <>
                            <div className={eventContent({ bold: true })}>{data}</div>
                        </> : <div className={eventCodeContainer({ expanded: overflowing ? expanded : true })}>
                            <Highlight language={lang} code={code} />
                        </div>}
                    </div>
                </div>
                <div className={eventLeft}>
                    <div className={eventDate}>{formatDateToTime(receivedAt)}</div>
                </div>
            </div>
            {overflowing && <div className={seeMore({ visible: overflowing && !expanded })}>
                <div className={seeMoreButton} onClick={() => setExpanded(e => !e)}>
                    <div className={seeMoreInside}>See {expanded ? 'Less' : 'More'}</div>
                </div>
            </div>}
        </div>
    )
}