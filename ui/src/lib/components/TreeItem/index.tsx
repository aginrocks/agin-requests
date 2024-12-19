import { useDisclosure } from "@mantine/hooks";
import { tree } from "./styles";
import { createContext } from "react";
import { IconChevronDown, IconChevronRight, IconDots } from "@tabler/icons-react";
import ActionIcon from "../ActionIcon";

export type TreeItemProps = {
    children?: React.ReactNode;
    label: string;
    description?: string;
    headerComponent?: React.ReactNode;
    nestLevel?: number;
}

export const NestLevelContext = createContext<number>(0);

export default function TreeItem({ children, label, description, headerComponent, nestLevel = 0 }: TreeItemProps) {
    const [opened, { open, close, toggle }] = useDisclosure(false);

    const classes = tree({ expanded: opened });

    return (
        <NestLevelContext.Provider value={nestLevel}>
            <div>
                <div className={classes.header}>
                    <div className={classes.headerLeft}>
                        <div className={classes.icon}>
                            <ActionIcon icon={opened ? IconChevronDown : IconChevronRight} size={14} onClick={toggle} />
                        </div>
                        {/* <IconChevronRight size={14} color="var(--vscode-disabledForeground)" /> */}
                        {label}
                    </div>
                    <div className={classes.icon} data-more-actions>
                        <ActionIcon icon={IconDots} size={14} />
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.line}></div>
                    <div className={classes.children}>
                        gjwerhjkhfwebewudj
                    </div>
                </div>
            </div>
        </NestLevelContext.Provider>
    )
}