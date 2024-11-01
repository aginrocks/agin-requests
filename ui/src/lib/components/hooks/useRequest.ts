import { useContext } from "react";
import { RequestConfigContext } from "../providers/RequestConfigProvider";

export function useRequest() {
    return useContext(RequestConfigContext);
}