import { Param as TParam, RequestConfig } from "@shared/types";
import { group } from "./styles";
import Param, { ParamProps } from "../Param";
import { useRequest } from "@lib/hooks";
import { useCallback } from "react";
import Container from "./Container";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { v4 } from "uuid";

export type ParamExtendedProps = {
    onNameChange?: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void;
    onValueChange?: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void;
    onEnabledChange?: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void;
    onRemove?: (i: number) => void;
    onReorder?: (reordered: any[]) => void;
    valueProps?: ParamProps['valueProps'];
}

export type ParamsGroupProps = {
    property: 'headers' | 'params' | 'requestBody';
    paramProps?: ParamExtendedProps;
}

function reorderArray<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= arr.length || toIndex >= arr.length) {
        throw new Error('Invalid indices');
    }

    const newArr = [...arr];
    const [movedItem] = newArr.splice(fromIndex, 1);
    newArr.splice(toIndex, 0, movedItem);

    return newArr;
}

export default function ParamsGroup({ property, paramProps }: ParamsGroupProps) {
    const request = useRequest();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
    );

    const onInteraction = useCallback((index: number) => {
        if (!request) return;
        if (index !== (request?.values?.[property]?.length ?? 0) - 1) return;

        request.insertListItem(property, {
            id: v4(),
            enabled: false,
            name: '',
            value: '',
        });

        request.setFieldValue(`${property}.${index}.enabled`, true);
    }, [request, property]);

    if (typeof request?.values[property] === 'string') return null;

    return (
        <Container>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={({ active, over }) => {
                    if (!request || typeof request.values[property] === 'string') return;

                    console.log({ active, over });
                    if (active.id === over?.id || !over) return;

                    const from = request.values[property]?.findIndex(x => x.id === active.id) ?? -1;
                    const to = request.values[property]?.findIndex(x => x.id === over.id) ?? -1;

                    const reordered = reorderArray(request.values[property] as TParam[], from, to);
                    request.setFieldValue(property, reordered);
                    paramProps?.onReorder?.(reordered);
                }}
            >
                <SortableContext
                    items={request?.values[property]?.map((a, i) => a.id ?? '') ?? []}
                    strategy={verticalListSortingStrategy}
                >
                    {request?.values[property]?.map((p, i) => <Param
                        {...paramProps}
                        key={p.id}
                        id={p.id}
                        name={p.name}
                        value={p.value}
                        enabled={p.enabled}
                        onNameChange={(e) => {
                            paramProps?.onNameChange?.(e, i);
                            onInteraction(i);
                            if (paramProps?.onNameChange) return;
                            request.setFieldValue(`${property}.${i}.name`, e.target.value);
                        }}
                        onValueChange={(e) => {
                            paramProps?.onValueChange?.(e, i);
                            onInteraction(i);
                            if (paramProps?.onValueChange) return;
                            request.setFieldValue(`${property}.${i}.value`, e.target.value);
                        }}
                        onEnabledChange={(e) => {
                            paramProps?.onEnabledChange?.(e, i);
                            if (paramProps?.onEnabledChange) return;
                            request.setFieldValue(`${property}.${i}.enabled`, e.target.checked);
                        }}
                        onRemove={() => {
                            paramProps?.onRemove?.(i);
                            if (paramProps?.onRemove) return;
                            request.removeListItem(property, i);
                        }}
                        isLast={i === (request?.values?.[property]?.length ?? 0) - 1}
                    />)}
                </SortableContext>
            </DndContext>
        </Container>
    )
}