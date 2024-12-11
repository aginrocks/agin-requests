import Param from "@lib/components/Param";
import ParamsGroup from "@lib/components/ParamsGroup";
import { useRequest } from "@lib/hooks";
import { parseParams, stringifyParams } from "@lib/util";
import qs from "qs";
import { useCallback } from "react";

export default function ParamsEditor() {
    const request = useRequest();

    const handleParamChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, index: number, type: 'name' | 'value') => {
        if (!request) return;

        const params = parseParams(request.values.url);
        if (!params[index]) {
            params[index] = {
                name: '',
                value: '',
            }
        }
        params[index][type] = e.target.value;

        const stringified = stringifyParams(params);

        request.setFieldValue('url', stringified == '' ? request.values.url.split('?')[0] : `${request.values.url.split('?')[0]}?${stringified}`);
        request.setFieldValue(`params.${index}.${type}`, e.target.value);
    }, [request]);

    return (
        <ParamsGroup>
            {request?.values.params.map((p, i) => <Param
                key={i}
                name={p.name}
                value={p.value}
                enabled={p.enabled}
                onNameChange={(e) => handleParamChange(e, i, 'name')}
                onValueChange={(e) => handleParamChange(e, i, 'value')}
                onEnabledChange={(e) => request.setFieldValue(`params.${i}.enabled`, e.target.checked)}
                onRemove={() => request.removeListItem('params', i)}
            />)}
        </ParamsGroup>
    )
}