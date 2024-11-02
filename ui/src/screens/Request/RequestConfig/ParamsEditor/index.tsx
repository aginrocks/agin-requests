import Param from "@lib/components/Param";
import ParamsGroup from "@lib/components/ParamsGroup";
import { useRequest } from "@lib/hooks";

export default function ParamsEditor() {
    const request = useRequest();

    return (
        <ParamsGroup>
            {request?.values.params.map((p, i) => <Param
                key={i}
                name={p.name}
                value={p.value}
                enabled={p.enabled}
                onNameChange={(e) => request.setFieldValue(`params.${i}.name`, e.target.value)}
                onValueChange={(e) => request.setFieldValue(`params.${i}.value`, e.target.value)}
                onEnabledChange={(e) => request.setFieldValue(`params.${i}.enabled`, e.target.checked)}
                onRemove={() => request.removeListItem('params', i)}
            />)}
        </ParamsGroup>
    )
}