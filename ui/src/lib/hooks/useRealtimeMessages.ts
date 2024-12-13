import { RealtimeMessagesContext } from "@lib/providers/RealtimeMessagesProvider";
import { useContext } from "react";

export function useRealtimeMessages() {
    return useContext(RealtimeMessagesContext);
}