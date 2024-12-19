import React from "react";
import Input from "../Input";
import { searchContainer } from "./styles";

type ContainerVariants = Exclude<Parameters<typeof searchContainer>[0], undefined>;

export interface SidebarSearchProps extends ContainerVariants {
    rightSection?: React.ReactNode;
}

export default function SidebarSearch({ rightSection, paddingRight }: SidebarSearchProps) {
    return (
        <div className={searchContainer({ paddingRight })}>
            <Input placeholder="Search..." variant="compact" />
            {rightSection}
        </div>
    )
}