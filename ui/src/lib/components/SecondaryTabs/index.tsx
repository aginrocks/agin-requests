import Tabs, { TabsProps } from "../Tabs";
import { right, tabs } from "./styles";

interface SecondaryTabsProps extends TabsProps {
    connected?: boolean,
    rightSection?: React.ReactNode;
    children?: React.ReactNode;
    withTabs?: boolean;
}

export default function SecondaryTabs({ connected, rightSection, withTabs, children, ...props }: SecondaryTabsProps) {
    return (
        <div className={tabs({ connected, withTabs })}>
            {withTabs == false ? children : <Tabs {...props} />}
            <div className={right}>
                {rightSection}
            </div>
        </div>
    )
}