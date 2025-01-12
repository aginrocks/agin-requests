import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { dropdownContainer, targetStyles } from "./styles";
import { OptionsList, OptionsListProps } from "./OptionsList";
import { useClickOutside, useMergedRef } from "@mantine/hooks";

type ContainerVariants = Exclude<Parameters<typeof dropdownContainer>[0], undefined>;

export interface MenuProps extends ContainerVariants {
    children: React.ReactNode,
    target: React.ReactNode,
    opened: boolean,
    onClose: () => void,
    targetClass?: string,
    position: 'bottomEnd' | 'bottomStart',
    radius?: OptionsListProps['radius'],
}

export default function Menu({ target, children, position, opened, onClose, targetClass, radius }: MenuProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [dropdownPosition, setDropdownPosition] = useState<{ top: number, left?: number, right?: number } | null>(null);
    const dropdownOutsideRef = useClickOutside(onClose);

    const dropdownMerged = useMergedRef(dropdownRef, dropdownOutsideRef);

    useEffect(() => {
        const node = targetRef.current;
        if (!node) return;

        const rect = node.getBoundingClientRect();

        const MENU_MARGIN = 3;

        if (position === 'bottomEnd') {
            setDropdownPosition({
                top: rect.bottom + window.scrollY + MENU_MARGIN,
                right: document.documentElement.clientWidth - rect.right - window.scrollX,
            });
        } else if (position === 'bottomStart') {
            setDropdownPosition({
                top: rect.bottom + window.scrollY + MENU_MARGIN,
                left: rect.left + window.scrollX,
            });
        }

    }, [opened, position]);

    return (
        <>
            {React.isValidElement(target) && React.cloneElement(target as React.ReactElement<any>, {
                ref: targetRef,
            })}
            {dropdownPosition && createPortal(
                <div className={dropdownContainer({ opened })} style={{
                    top: dropdownPosition.top,
                    left: dropdownPosition.left,
                    right: dropdownPosition.right,
                }} ref={dropdownMerged}>
                    <OptionsList radius={radius}>
                        {children}
                    </OptionsList>
                </div>,
                document.body
            )}
        </>
    )
}