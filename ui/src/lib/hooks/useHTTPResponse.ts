import { useContext } from "react";
import { HTTPResponseContext } from "@lib/providers/HTTPResponseProvider";

export function useHTTPResponse() {
    return useContext(HTTPResponseContext);
}