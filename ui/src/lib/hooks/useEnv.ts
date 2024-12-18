import { EnvContext } from "@lib/providers/EnvProvider";
import { useContext } from "react";

export function useEnv() {
    return useContext(EnvContext);
}