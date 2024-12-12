import Event from "@lib/components/Event";
import { eventResponse } from "./styles";
import { useEventResponse } from "@lib/hooks/useEventResponse";

export default function EventResponseContent() {
    const res = useEventResponse();

    return (
        <div className={eventResponse}>
            {res.events.map((e, i) => <Event {...e} key={i} />)}
        </div>
    )
}