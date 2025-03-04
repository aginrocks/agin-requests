import { VSCodeCheckbox } from "@vscode/webview-ui-toolkit/react";
import SimpleInput, { SimpleInputProps } from "../SimpleInput";
import { gripContainer, param } from "./styles";
import ActionIcon from "../ActionIcon";
import { useSortable } from "@dnd-kit/sortable";
import { IconCurrencyDollar, IconGripVertical } from "@tabler/icons-react";
import { CSS } from "@dnd-kit/utilities";
import { Param as TParam } from "@shared/types";
import ThemeIcon from "../ThemeIcon";

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
    type?: TParam['type'];
};

export default function Param({ id, name, onNameChange, onValueChange, value, namePlaceholder, valuePlaceholder, enabled, onEnabledChange, onRemove, nameProps, valueProps, isLast = false, type = 'query' }: ParamProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: id ?? '' });

    const isDraggable = !(isLast || type === 'path');

    return (
        <div className={param} style={{
            transform: CSS.Translate.toString(transform),
            scale: '1!',
            transition: `${transition}, background-color .3s ease`,
            zIndex: isDragging ? 999999 : undefined,
        }} ref={isDraggable ? setNodeRef : null}>
            <div className={gripContainer}>
                <div {...attributes} {...listeners} style={!isDraggable ? { pointerEvents: 'none', opacity: .5 } : { cursor: 'grab' }}>
                    <ActionIcon icon={IconGripVertical} size={14} disabled />
                </div>
                {type === 'path' ? <ThemeIcon icon={IconCurrencyDollar} iconColor="blue" /> : <VSCodeCheckbox checked={enabled} onChange={onEnabledChange} />}
            </div>
            <SimpleInput value={name} onChange={onNameChange} placeholder={namePlaceholder ?? 'parameter'} {...nameProps} />
            <SimpleInput value={value} onChange={onValueChange} placeholder={valuePlaceholder ?? 'value'} {...valueProps} />
            <ActionIcon icon="close" onClick={onRemove} disabled={isLast || type === 'path'} />
        </div>
    )
}