import { Param } from "@shared/types";
import qs from "qs";
import { v4 } from "uuid";

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
    const [path, queryString] = url.split('?');
    const urlParams = qs.parse(queryString || '');
    const paramMap = new Map<string, Param>();

    // Extract path parameters (e.g., {id} -> type: 'path')
    const pathParams = Array.from(path.matchAll(/\{([^}]+)\}/g)).map(match => match[1]);
    // TODO: Fix path variables
    pathParams.forEach(name => {
        console.log(initialParams?.find(p => p.name === name));
        if (!initialParams?.find(p => p.name === name)) paramMap.set(name, { name, value: '', enabled: true, type: 'path', id: v4() });
    });

    // Add or update query params from the URL
    Object.entries(urlParams).forEach(([name, value]) => {
        paramMap.set(name, { name, value: String(value), enabled: true, type: 'query', id: v4() });
    });

    // Merge with initialParams while keeping disabled ones
    if (initialParams) {
        initialParams.forEach(param => {
            if (!param.enabled) {
                paramMap.set(param.name, param);
            }
        });
    }

    const params = Array.from(paramMap.values());
    const lastParam = params[params.length - 1];
    if ((lastParam && (lastParam.name !== '' && lastParam.value !== '')) || params.length === 0) {
        params.push({ name: '', value: '', enabled: false, id: v4() });
    }

    return params;
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