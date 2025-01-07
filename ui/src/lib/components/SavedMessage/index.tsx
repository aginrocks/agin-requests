import { savedMessage } from "./styles";
import Highlight from "../Highlight";
import { useMemo, useState } from "react";
import { seeMore } from "../Event/styles";
import ThemeIcon from "../ThemeIcon";
import { IconDots, IconTrash } from "@tabler/icons-react";
import ActionIcon from "../ActionIcon";
import Menu from "../Menu";
import { Option } from "../Menu/Option";
import { RealtimeMessage } from "@shared/types";

type MessageVariants = Exclude<Parameters<typeof savedMessage>[0], undefined>;

export interface SavedMessageProps extends RealtimeMessage, MessageVariants, React.HTMLAttributes<HTMLDivElement> {
    onDelete: () => void;
}

export default function SavedMessage({ data, type, args, label, selected, event, onDelete, ...props }: SavedMessageProps) {
    const overflowing = data.split('\n').length > 4;

    const classes = savedMessage({ selected, overflowing });

    const [opened, setOpened] = useState(false);

    return (
        <div className={classes.message} {...props}>
            <div className={classes.top}>
                <div>
                    <div className={classes.label}>{label}</div>
                    <div className={classes.event}>{event}</div>
                </div>
                <ActionIcon icon={IconTrash} onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }} />
                {/* TODO: Fix the menu */}
                {/* <Menu
                    target={<ActionIcon icon={IconDots} onClick={() => setOpened(x => !x)} />}
                    opened={opened}
                    onClose={() => setOpened(false)}
                >
                    <Option label="Remove" value="" icon={IconTrash} onClick={() => {

                    }} />
                </Menu> */}
            </div>
            <Highlight language={type} code={data} />
            {/* TODO */}
            <div className={classes.argsCount}>0 arguments</div>
            {overflowing && <div className={seeMore({ visible: true })}></div>}
        </div>
    )
}