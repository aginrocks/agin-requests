import { VSCodeCheckbox } from "@vscode/webview-ui-toolkit/react";
import SimpleInput, { SimpleInputProps } from "../SimpleInput";
import { gripContainer, param } from "./styles";
import ActionIcon from "../ActionIcon";
import { useSortable } from "@dnd-kit/sortable";
import { IconGripVertical } from "@tabler/icons-react";
import { CSS } from "@dnd-kit/utilities";

export type ParamProps = {
    id?: string;
    name: string;
    onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    namePlaceholder?: string;
    valuePlaceholder?: string;
    enabled?: boolean;
    onEnabledChange: (e: any) => void;
    onRemove: () => void;
    nameProps?: SimpleInputProps;
    valueProps?: SimpleInputProps;
    isLast?: boolean;
};

export default function Param({ id, name, onNameChange, onValueChange, value, namePlaceholder, valuePlaceholder, enabled, onEnabledChange, onRemove, nameProps, valueProps, isLast = false }: ParamProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: id ?? '' });

    return (
        <div className={param} style={{
            transform: CSS.Translate.toString(transform),
            scale: '1!',
            transition: `${transition}, background-color .3s ease`,
            zIndex: isDragging ? 999999 : undefined,
        }} ref={setNodeRef}>
            <div className={gripContainer}>
                <div {...attributes} {...listeners} style={{ cursor: 'grab' }}>
                    <ActionIcon icon={IconGripVertical} size={14} disabled />
                </div>
                <VSCodeCheckbox checked={enabled} onChange={onEnabledChange} />
            </div>
            <SimpleInput value={name} onChange={onNameChange} placeholder={namePlaceholder ?? 'parameter'} {...nameProps} />
            <SimpleInput value={value} onChange={onValueChange} placeholder={valuePlaceholder ?? 'value'} {...valueProps} />
            <ActionIcon icon="close" onClick={onRemove} disabled={isLast} />
        </div>
    )
}