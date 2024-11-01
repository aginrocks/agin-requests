import { useContext } from "react";
import { RequestConfigContext } from "@lib/providers/RequestConfigProvider";

export function useRequest() {
    return useContext(RequestConfigContext);
}