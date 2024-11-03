import { useContext } from "react";
import { RequestConfigContext } from "@lib/providers/RequestConfigProvider";
import { RequestState } from "@lib/providers/RequestController";

export function useRequestController() {
    return useContext(RequestState);
}