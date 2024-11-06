import React from "react";
import { dropdownContainer, targetStyles } from "./styles";
import { OptionsList } from "./OptionsList";

export type MenuProps = {
    children: React.ReactNode,
    target: React.ReactNode,
    position?: 'bottomStart',
    opened: boolean,
    onClose: () => void,
    targetClass?: string,
}

export default function Menu({ target, children, position, opened, onClose, targetClass }: MenuProps) {
    return (
        <div className={`${targetStyles} ${targetClass}`}>
            {target}
            <div className={dropdownContainer({ position, opened })}>
                <OptionsList>
                    {children}
                </OptionsList>
            </div>
        </div>
    )
}