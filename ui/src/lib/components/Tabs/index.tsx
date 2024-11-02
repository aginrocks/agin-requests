import { container } from "./styles"
import Tab from "./Tab"

export type TabType = {
    id: string,
    label: string,
    icon?: () => React.ReactNode,
    badge?: string,
}

export type TabsProps = {
    tabs: TabType[],
    active: string,
    onChange: (id: string) => void,
}

export default function Tabs({ tabs, active, onChange }: TabsProps) {
    return (
        <div className={container}>
            {tabs.map((t: TabType) => <Tab {...t} active={t.id == active} setActive={onChange} key={t.id} />)}
        </div>
    )
}