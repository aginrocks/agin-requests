import { Param } from "@shared/types";
import qs from "qs";

export type ParsedParam = {
    name: string;
    value: string;
};

export type ParamsObjectValue = {
    enabled: boolean;
    value: string;
};
export type ParamsObject = Record<string, ParamsObjectValue>;

export function parseParams(url: string, initialParams?: Param[]): Param[] {
    const paramsString = url.split('?')[1];
    if (!paramsString) return initialParams || [];

    const rawParams = qs.parse(paramsString);
    const initialParamsObject = initialParams?.reduce<ParamsObject>((acc, param) => {
        acc[param.name] = { enabled: param.enabled, value: param.value };
        return acc;
    }, {}) || {};

    const params: ParamsObject = {
        ...initialParamsObject,
        ...Object.entries(rawParams).reduce<ParamsObject>((acc, [name, value]) => {
            acc[name] = { enabled: true, value: value as string };
            return acc;
        }, {}),
    };

    return Object.entries<ParamsObjectValue>(params).flatMap(([name, value]) => {
        if (Array.isArray(value.value)) {
            return value.value.map(val => ({ name, enabled: value.enabled, value: val }));
        } else if (typeof value.value === 'string') {
            return [{ name, enabled: value.enabled, value: value.value }];
        }
        return [];
    });
}

export function stringifyParams(params: ParsedParam[]): string {
    const result: Record<string, string | string[]> = {};

    params.forEach(({ name, value }) => {
        if (result[name]) {
            result[name] = Array.isArray(result[name])
                ? [...result[name], value]
                : [result[name], value];
        } else {
            result[name] = value;
        }
    });

    return qs.stringify(result);
}