import { Icon } from "@tabler/icons-react";
import { tab } from "./styles";
import Tooltip from "@lib/components/Tooltip";

type TabVariants = Exclude<Parameters<typeof tab>[0], undefined>;

export interface MenuTabProps extends React.HTMLAttributes<HTMLDivElement>, TabVariants {
    id: string;
    icon: Icon;
    label?: string;
    show?: 'icon' | 'label';
}

export default function MenuTab({ id, icon: Icon, label, active, variant, show = 'icon', withAnimation, ...props }: MenuTabProps) {
    const tabClass = tab({ active, variant, withAnimation });

    if (show == 'label') {
        return (
            <div className={tabClass} {...props}>
                {label}
            </div>
        )
    } else {
        return (
            <Tooltip label={label ?? ''}>
                <div className={tabClass} {...props}>
                    <Icon size={18} />
                </div>
            </Tooltip>
        )
    }
}
