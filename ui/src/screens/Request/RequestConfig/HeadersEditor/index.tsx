import Param from "@lib/components/Param";
import ParamsGroup from "@lib/components/ParamsGroup";
import { useRequest } from "@lib/hooks";

export default function HeadersEditor() {
    const request = useRequest();

    return (
        <ParamsGroup>
            {request?.values.headers.map((p, i) => <Param
                key={i}
                name={p.name}
                value={p.value}
                enabled={p.enabled}
                onNameChange={(e) => request.setFieldValue(`headers.${i}.name`, e.target.value)}
                onValueChange={(e) => request.setFieldValue(`headers.${i}.value`, e.target.value)}
                onEnabledChange={(e) => request.setFieldValue(`headers.${i}.enabled`, e.target.checked)}
                onRemove={() => request.removeListItem('headers', i)}
            />)}
        </ParamsGroup>
    )
}