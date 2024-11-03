export type CheckableField = {
    name: string,
    value: string,
    enabled: boolean,
}

export function convertCheckableFields(fields: CheckableField[], lowerCase?: boolean) {
    return fields.filter(f => f.enabled == true).reduce((acc: any, { name, value }) => {
        acc[lowerCase ? name.toLowerCase() : name] = value;
        return acc;
    }, {});
}