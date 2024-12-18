import React from "react";
import { dropdownContainer, targetStyles } from "./styles";
import { OptionsList } from "./OptionsList";

type ContainerVariants = Exclude<Parameters<typeof dropdownContainer>[0], undefined>;

export interface MenuProps extends ContainerVariants {
    children: React.ReactNode,
    target: React.ReactNode,
    opened: boolean,
    onClose: () => void,
    targetClass?: string,
}

// TODO: Change to a portal
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