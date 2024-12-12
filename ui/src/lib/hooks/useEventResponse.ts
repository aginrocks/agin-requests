import { EventResponseContext } from "@lib/providers/EventResponseProvider";
import { useContext } from "react";

export function useEventResponse() {
    return useContext(EventResponseContext);
}