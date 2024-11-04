export type CheckableField = {
    name: string,
    value: string,
    enabled: boolean,
}

export type ConvertOptions = {
    lowerCase?: boolean,
    urlencodedMode?: boolean,
}

export function convertCheckableFields(fields: CheckableField[], options: ConvertOptions = {}) {
    const { lowerCase = false, urlencodedMode = false } = options;

    const result: Record<string, any> = {};

    fields.filter(f => f.enabled).forEach(({ name, value }) => {
        const formattedName = lowerCase ? name.toLowerCase() : name;

        if (urlencodedMode) {
            const keys = formattedName.split(/[\[\]]+/).filter(Boolean); // Split the name into keys
            let current = result;

            // Iterate over keys to create nested structure
            keys.forEach((key, index) => {
                if (index === keys.length - 1) {
                    // Last key, assign the value
                    if (Array.isArray(current[key])) {
                        current[key].push(value);
                    } else if (current[key] !== undefined) {
                        current[key] = [current[key], value]; // Convert to array if it was already set
                    } else {
                        current[key] = value; // Set the value directly
                    }
                } else {
                    // Not the last key, create nested object if it doesn't exist
                    if (!current[key]) {
                        current[key] = {};
                    }
                    current = current[key]; // Move deeper into the object
                }
            });
        } else {
            result[formattedName] = value; // Direct assignment for non-urlencoded mode
        }
    });

    return result;
}
