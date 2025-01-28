import Param from "@lib/components/Param";
import ParamsGroup from "@lib/components/ParamsGroup";
import { useRequest } from "@lib/hooks";
import { parseParams, stringifyParams } from "@lib/util";
import { Param as TParam } from "@shared/types";
import qs from "qs";
import { useCallback } from "react";

export default function ParamsEditor() {
    const request = useRequest();

    const updateParams = useCallback((params: TParam[]) => {
        if (!request) return;

        const stringified = stringifyParams(params.filter(p => p.enabled));

        request.setFieldValue('url', stringified == '' ? request.values.url.split('?')[0] : `${request.values.url.split('?')[0]}?${stringified}`);
    }, [request]);

    const handleParamChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, index: number, type: 'name' | 'value') => {
        if (!request) return;

        const params = [...request.values.params];
        if (!params) return;

        // const params = parseParams(request.values.url, request.values.params);
        if (!params[index]) {
            params[index] = {
                name: '',
                value: '',
                enabled: true,
            }
        }
        params[index][type] = e.target.value;

        updateParams(params);

        request.setFieldValue(`params.${index}.${type}`, e.target.value);
    }, [request, updateParams]);

    const onInteraction = useCallback((index: number) => {
        if (!request) return;
        if (index !== request.values.params.length - 1) return;

        request.insertListItem('params', {
            enabled: false,
            name: '',
            value: '',
        });

        request.setFieldValue(`params.${index}.enabled`, true);
    }, [request]);

    return (
        <ParamsGroup>
            {request?.values.params.map((p, i) => <Param
                key={i}
                name={p.name}
                value={p.value}
                enabled={p.enabled}
                onNameChange={(e) => {
                    onInteraction(i);
                    handleParamChange(e, i, 'name');
                }}
                onValueChange={(e) => {
                    onInteraction(i);
                    handleParamChange(e, i, 'value');
                }}
                onEnabledChange={(e) => {
                    request.setFieldValue(`params.${i}.enabled`, e.target.checked);
                    const updatedParams = [...request.values.params];
                    if (!updatedParams) return;
                    updatedParams[i].enabled = e.target.checked;
                    updateParams(updatedParams);
                }}
                onRemove={() => request.removeListItem('params', i)}
                isLast={i === request.values.params.length - 1}
            />)}
        </ParamsGroup>
    )
}