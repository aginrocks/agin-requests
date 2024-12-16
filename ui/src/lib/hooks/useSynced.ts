import { useContext, useEffect } from "react";
import { useVsCodeApi } from "./useVsCodeApi";
import { SyncedStateContext } from "@lib/providers/SycnedStateProvider";

export default function useSynced(key: string, value: any, setValue: (value: any) => void) {
    const synced = useContext(SyncedStateContext);

    useEffect(() => {
        synced.set(key, value);
    }, [key, value]);


    useEffect(() => {
        if (!synced.isLoaded || !synced?.values?.[key]) return;

        setValue(synced.values[key]);
    }, [synced.isLoaded]);
}