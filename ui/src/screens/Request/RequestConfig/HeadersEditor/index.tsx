import Param from "@lib/components/Param";
import ParamsGroup from "@lib/components/ParamsGroup";
import { useRequest } from "@lib/hooks";
import { useCallback } from "react";

export default function HeadersEditor() {
    const request = useRequest();

    return (
        <ParamsGroup property="headers" />
    )
}