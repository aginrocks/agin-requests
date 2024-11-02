import { VSCodeCheckbox } from "@vscode/webview-ui-toolkit/react";
import SimpleInput from "../SimpleInput";
import { param } from "./styles";
import ActionIcon from "../ActionIcon";

export default function Param({ name, onNameChange, onValueChange, value, namePlaceholder, valuePlaceholder, enabled, onEnabledChange, onRemove }: { name: string, onNameChange: (e: any) => void, onValueChange: (e: any) => void, value: string, namePlaceholder?: string, valuePlaceholder?: string, enabled?: boolean, onEnabledChange: (e: any) => void, onRemove: () => void }) {
    return (
        <div className={param}>
            <VSCodeCheckbox checked={enabled} onChange={onEnabledChange} />
            <SimpleInput value={name} onChange={onNameChange} placeholder={namePlaceholder ?? 'parameter'} />
            <SimpleInput value={value} onChange={onValueChange} placeholder={valuePlaceholder ?? 'value'} />
            <ActionIcon icon="close" onClick={onRemove} />
        </div>
    )
}