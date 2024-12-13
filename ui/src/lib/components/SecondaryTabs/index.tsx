import Tabs, { TabsProps } from "../Tabs";
import { right, tabs } from "./styles";

interface SecondaryTabsProps extends TabsProps {
    connected?: boolean,
    rightSection?: React.ReactNode;
}

export default function SecondaryTabs({ connected, rightSection, ...props }: SecondaryTabsProps) {
    return (
        <div className={tabs({ connected })}>
            <Tabs {...props} />
            <div className={right}>
                {rightSection}
            </div>
        </div>
    )
}