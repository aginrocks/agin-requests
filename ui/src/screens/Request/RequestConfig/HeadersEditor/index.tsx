import Param from "@lib/components/Param";
import ParamsGroup from "@lib/components/ParamsGroup";
import { useRequest } from "@lib/hooks";
import { useCallback } from "react";

export default function HeadersEditor() {
    const request = useRequest();

    const onInteraction = useCallback((index: number) => {
        if (!request) return;
        if (index !== request.values.headers.length - 1) return;

        request.insertListItem('headers', {
            enabled: false,
            name: '',
            value: '',
        });

        request.setFieldValue(`headers.${index}.enabled`, true);
    }, [request]);

    return (
        <ParamsGroup>
            {request?.values.headers.map((p, i) => <Param
                key={i}
                name={p.name}
                value={p.value}
                enabled={p.enabled}
                onNameChange={(e) => {
                    onInteraction(i);
                    request.setFieldValue(`headers.${i}.name`, e.target.value);
                }}
                onValueChange={(e) => {
                    onInteraction(i);
                    request.setFieldValue(`headers.${i}.value`, e.target.value);
                }}
                onEnabledChange={(e) => {
                    request.setFieldValue(`headers.${i}.enabled`, e.target.checked);
                }}
                onRemove={() => request.removeListItem('headers', i)}
                isLast={i === request.values.headers.length - 1}
            />)}
        </ParamsGroup>
    )
}