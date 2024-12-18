import { Icon } from "@tabler/icons-react"
import { menuTabs } from "./styles";
import MenuTab from "./Tab";

export type MenuTab = {
    id: string;
    icon: Icon;
    label?: string;
}

type MenuTabsVariants = Exclude<Parameters<typeof menuTabs>[0], undefined>;

export interface MenuTabsProps extends MenuTabsVariants {
    tabs: MenuTab[];
    active: string;
    onChange: (id: string) => void;
    show?: 'icon' | 'label';
    withAnimation?: boolean;
}

export default function MenuTabs({ tabs, active, onChange, variant, show = 'icon', withAnimation }: MenuTabsProps) {
    return (
        <div className={menuTabs({ variant })}>
            {tabs.map(t => <MenuTab {...t} key={t.id} active={active == t.id} onClick={() => onChange(t.id)} variant={variant} show={show} withAnimation={withAnimation} />)}
        </div>
    )
}