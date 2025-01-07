import { useContext } from "react";
import { RequestState } from "@lib/providers/RequestController";

export function useRequestController() {
    return useContext(RequestState);
}