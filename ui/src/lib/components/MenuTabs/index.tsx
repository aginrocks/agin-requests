import { Icon } from "@tabler/icons-react"
import { menuTabs } from "./styles";
import MenuTab from "./Tab";

export type MenuTab = {
    id: string;
    icon: Icon;
    label?: string;
}

export type MenuTabsProps = {
    tabs: MenuTab[];
    active: string;
    onChange: (id: string) => void;
}


export default function MenuTabs({ tabs, active, onChange }: MenuTabsProps) {
    return (
        <div className={menuTabs}>
            {tabs.map(t => <MenuTab {...t} key={t.id} active={active == t.id} onClick={() => onChange(t.id)} />)}
        </div>
    )
}