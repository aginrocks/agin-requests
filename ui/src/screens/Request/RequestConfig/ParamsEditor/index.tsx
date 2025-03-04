import ParamsGroup from "@lib/components/ParamsGroup";
import { useRequest } from "@lib/hooks";
import { stringifyParams } from "@lib/util";
import { Param as TParam } from "@shared/types";
import { useCallback } from "react";

export default function ParamsEditor() {
    const request = useRequest();

    const updateParams = useCallback((params: TParam[]) => {
        if (!request) return;

        const stringified = stringifyParams(params.filter(p => p.enabled && p.type !== 'path'));

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

    return (
        <ParamsGroup property="params" paramProps={{
            onNameChange: (e, i) => {
                handleParamChange(e, i, 'name');
            },
            onValueChange: (e, i) => {
                handleParamChange(e, i, 'value');
            },
            onEnabledChange: (e, i) => {
                if (!request) return;
                const updatedParams = [...request.values.params];
                if (!updatedParams) return;
                updatedParams[i].enabled = e.target.checked;
                updateParams(updatedParams);
            },
            onReorder: (reordered) => {
                updateParams(reordered);
            },
            onRemove: (toRemove) => {
                if (!request) return;
                const updatedParams = [...request.values.params].filter((x, i) => i != toRemove);
                request.removeListItem('params', toRemove);
                if (!updatedParams) return;
                updateParams(updatedParams);
            }
        }} />
    )
}