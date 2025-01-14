import { useDisclosure } from "@mantine/hooks";
import { tree } from "./styles";
import { createContext, useEffect, useRef, useState } from "react";
import { Icon, IconArrowLeft, IconChevronDown, IconChevronRight, IconCopy, IconDots, IconFolderPlus, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import ActionIcon from "../ActionIcon";
import Menu from "../Menu";
import { Option } from "../Menu/Option";
import { useWorkspace } from "@lib/hooks";
import { AnimatePresence, motion } from "motion/react";
import { RequestOptions } from "../MenuButton";
import Divider from "../Divider";

export type TreeItemProps = {
    children?: React.ReactNode;
    label: string;
    description?: string;
    headerComponent?: React.ReactNode;
    nestLevel?: number;
    icon?: Icon;
    selected?: boolean;
    rightSection?: React.ReactNode;
    path?: string;
    slug?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

// export const NestLevelContext = createContext<number>(0);

// TODO: Fix line hiding
export default function TreeItem({ children, label, icon: Icon, selected = false, rightSection, path, slug, onClick, description, headerComponent }: TreeItemProps) {
    const [opened, { open, close, toggle }] = useDisclosure(false);

    const classes = tree({ expanded: opened, selected });

    const workspace = useWorkspace();

    const [menuOpened, menu] = useDisclosure(false);

    const [direction, setDirection] = useState<1 | -1>(1);
    const [menuTab, setMenuTab] = useState<'main' | 'requestTypes'>('main');

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!opened) setMenuTab('main');
    }, [opened]);

    return (
        <div className={classes.base}>
            <div className={classes.header} onClick={onClick} ref={ref}>
                <div className={classes.headerLeft}>
                    <div className={classes.icon}>
                        <ActionIcon icon={opened ? IconChevronDown : IconChevronRight} size={14} onClick={(e) => {
                            e.stopPropagation();
                            toggle();
                        }} />
                    </div>
                    {Icon && <div className={classes.icon}>
                        <Icon size={14} />
                    </div>}
                    {/* <IconChevronRight size={14} color="var(--vscode-disabledForeground)" /> */}
                    {label}
                </div>
                <div className={classes.icon} data-more-actions>
                    {rightSection ?? <Menu
                        target={
                            <div>
                                <ActionIcon icon={IconDots} size={14} onClick={(e) => {
                                    e.stopPropagation();
                                    menu.open();
                                }} />
                            </div>
                        }
                        opened={menuOpened}
                        onClose={menu.close}
                        position="bottomEnd"
                        contextMenuRef={ref}
                        onOpen={menu.open}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                initial={{ opacity: 0, transform: `translateX(${10 * direction}px)` }}
                                animate={{ opacity: 1, transform: 'translateX(0px)' }}
                                exit={{ opacity: 0, transform: `translateX(${-10 * direction}px)` }}
                                key={menuTab}
                            >
                                {menuTab === 'main' && <>
                                    <Option label="New Request" value="" icon={IconPlus} onClick={() => {
                                        setDirection(1);
                                        setTimeout(() => {
                                            setMenuTab('requestTypes');
                                        });
                                    }} />
                                    <Option label="New Folder" value="" icon={IconFolderPlus} onClick={async () => {
                                        menu.close();
                                        await workspace.createEmptyCollection(`${path === '' ? path : `${path}/`}${slug}`);
                                    }} />
                                    <Option label="Rename" value="" icon={IconPencil} />
                                    <Option label="Duplicate" value="" icon={IconCopy} />
                                    <Option label="Delete" value="" icon={IconTrash} optionColor="danger.foreground" onClick={async () => {
                                        menu.close();
                                        await workspace.deleteCollectionConfirm(`${path === '' ? path : `${path}/`}${slug}`);
                                    }} />
                                </>}
                                {menuTab === 'requestTypes' && <>
                                    <Option label="Back" value="" icon={IconArrowLeft} onClick={() => {
                                        setDirection(-1);
                                        setTimeout(() => {
                                            setMenuTab('main');
                                        }, 0);
                                    }} />
                                    <Divider withMargin />
                                    <RequestOptions onRequestClick={() => { }} />
                                </>}
                            </motion.div>
                        </AnimatePresence>
                    </Menu>}
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