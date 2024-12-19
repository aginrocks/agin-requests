import { useDisclosure } from "@mantine/hooks";
import { tree } from "./styles";
import { createContext } from "react";
import { Icon, IconChevronDown, IconChevronRight, IconDots } from "@tabler/icons-react";
import ActionIcon from "../ActionIcon";

export type TreeItemProps = {
    children?: React.ReactNode;
    label: string;
    description?: string;
    headerComponent?: React.ReactNode;
    nestLevel?: number;
    icon?: Icon;
}

// export const NestLevelContext = createContext<number>(0);

// TODO: Fix line hiding
export default function TreeItem({ children, label, icon: Icon, description, headerComponent }: TreeItemProps) {
    const [opened, { open, close, toggle }] = useDisclosure(false);

    const classes = tree({ expanded: opened });

    return (
        <div className={classes.base}>
            <div className={classes.header}>
                <div className={classes.headerLeft}>
                    <div className={classes.icon}>
                        <ActionIcon icon={opened ? IconChevronDown : IconChevronRight} size={14} onClick={toggle} />
                    </div>
                    {Icon && <div className={classes.icon}>
                        <Icon size={14} />
                    </div>}
                    {/* <IconChevronRight size={14} color="var(--vscode-disabledForeground)" /> */}
                    {label}
                </div>
                <div className={classes.icon} data-more-actions>
                    <ActionIcon icon={IconDots} size={14} />
                </div>
            </div>
            <div className={classes.contentContainer}>
                <div className={classes.content} style={{ paddingLeft: 6 + 12 + 1 + 3 }}>
                    <div className={classes.line} style={{ left: 6 + 12 }} data-line></div>
                    <div className={classes.children}>
                        {/* <NestLevelContext.Provider value={nestLevel}> */}
                        {children}
                        {/* </NestLevelContext.Provider> */}
                    </div>
                </div>
            </div>
        </div>
    )
}