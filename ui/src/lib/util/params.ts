import qs from "qs";

export type ParsedParam = {
    name: string;
    value: string;
};

export function parseParams(url: string): ParsedParam[] {
    const paramsString = url.split('?')[1];
    if (!paramsString) return [];

    const params = qs.parse(paramsString);

    const paramsArray = Object.entries(params).flatMap(([name, value]) => {
        if (Array.isArray(value)) {
            return value
                .filter((val): val is string => typeof val === 'string')
                .map(val => ({ name, value: val }));
        } else if (typeof value === 'string') {
            return [{ name, value }];
        }
        return [];
    });

    return paramsArray;
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