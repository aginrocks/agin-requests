import { RequestSaverContext } from "@lib/providers/RequestSaverProvider";
import { useContext } from "react";

export function useRequestSaver() {
    return useContext(RequestSaverContext);
}