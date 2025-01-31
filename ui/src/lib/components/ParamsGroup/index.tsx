import { RequestConfig } from "@shared/types";
import { group } from "./styles";
import Param, { ParamProps } from "../Param";
import { useRequest } from "@lib/hooks";
import { useCallback } from "react";
import Container from "./Container";

export type ParamExtendedProps = {
    onNameChange?: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void;
    onValueChange?: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void;
    onEnabledChange?: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void;
    onRemove?: (i: number) => void;
    valueProps?: ParamProps['valueProps'];
}

export type ParamsGroupProps = {
    property: 'headers' | 'params' | 'requestBody';
    paramProps?: ParamExtendedProps;
}

export default function ParamsGroup({ property, paramProps }: ParamsGroupProps) {
    const request = useRequest();

    const onInteraction = useCallback((index: number) => {
        if (!request) return;
        if (index !== (request?.values?.[property]?.length ?? 0) - 1) return;

        request.insertListItem(property, {
            enabled: false,
            name: '',
            value: '',
        });

        request.setFieldValue(`${property}.${index}.enabled`, true);
    }, [request, property]);

    if (typeof request?.values[property] === 'string') return null;

    return (
        <Container>
            {request?.values[property]?.map((p, i) => <Param
                {...paramProps}
                key={i}
                name={p.name}
                value={p.value}
                enabled={p.enabled}
                onNameChange={(e) => {
                    paramProps?.onNameChange?.(e, i);
                    onInteraction(i);
                    if (paramProps?.onNameChange) return;
                    request.setFieldValue(`${property}.${i}.name`, e.target.value);
                }}
                onValueChange={(e) => {
                    paramProps?.onValueChange?.(e, i);
                    onInteraction(i);
                    if (paramProps?.onValueChange) return;
                    request.setFieldValue(`${property}.${i}.value`, e.target.value);
                }}
                onEnabledChange={(e) => {
                    paramProps?.onEnabledChange?.(e, i);
                    if (paramProps?.onEnabledChange) return;
                    request.setFieldValue(`${property}.${i}.enabled`, e.target.checked);
                }}
                onRemove={() => {
                    paramProps?.onRemove?.(i);
                    if (paramProps?.onRemove) return;
                    request.removeListItem(property, i);
                }}
                isLast={i === (request?.values?.[property]?.length ?? 0) - 1}
            />)}
        </Container>
    )
}