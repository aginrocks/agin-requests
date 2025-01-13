import React from "react";
import Input, { InputProps } from "../Input";
import { searchContainer } from "./styles";

type ContainerVariants = Exclude<Parameters<typeof searchContainer>[0], undefined>;

export interface SidebarSearchProps extends ContainerVariants, InputProps {
    rightSection?: React.ReactNode;
}

export default function SidebarSearch({ rightSection, paddingRight, withPaddings = true, ...props }: SidebarSearchProps) {
    return (
        <div className={searchContainer({ paddingRight, withPaddings })}>
            <Input placeholder="Search..." variant="compact" {...props} />
            {rightSection}
        </div>
    )
}