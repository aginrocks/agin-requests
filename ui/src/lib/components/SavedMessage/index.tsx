import { RealtimeMessage } from "@lib/providers/RealtimeMessagesProvider";
import { savedMessage } from "./styles";
import Highlight from "../Highlight";
import { useMemo, useState } from "react";
import { seeMore } from "../Event/styles";
import ThemeIcon from "../ThemeIcon";
import { IconDots, IconTrash } from "@tabler/icons-react";
import ActionIcon from "../ActionIcon";
import Menu from "../Menu";
import { Option } from "../Menu/Option";

type MessageVariants = Exclude<Parameters<typeof savedMessage>[0], undefined>;

export interface SavedMessageProps extends RealtimeMessage, MessageVariants {

}

export default function SavedMessage({ data, type, args, label, selected }: SavedMessageProps) {
    const overflowing = data.split('\n').length > 4;

    const classes = savedMessage({ selected, overflowing });

    const [opened, setOpened] = useState(false);

    return (
        <div className={classes.message}>
            <div className={classes.top}>
                <div className={classes.label}>{label}</div>
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
            {overflowing && <div className={seeMore({ visible: true })}></div>}
        </div>
    )
}