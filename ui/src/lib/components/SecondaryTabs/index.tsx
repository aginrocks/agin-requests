import Tabs, { TabsProps } from "../Tabs";
import { tabs } from "./styles";

interface SecondaryTabsProps extends TabsProps {
    connected?: boolean,
}

export default function SecondaryTabs({ connected, ...props }: SecondaryTabsProps) {
    return (
        <div className={tabs({ connected })}>
            <Tabs {...props} />
        </div>
    )
}