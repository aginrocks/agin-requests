import { Icon } from "@tabler/icons-react";
import { tab } from "./styles";

type TabVariants = Exclude<Parameters<typeof tab>[0], undefined>;

export interface MenuTabProps extends React.HTMLAttributes<HTMLDivElement>, TabVariants {
    id: string;
    icon: Icon;
    label?: string;
}

export default function MenuTab({ id, icon: Icon, label, active, ...props }: MenuTabProps) {
    return (
        <div className={tab({ active })} {...props}>
            <Icon size={18} />
        </div>
    )
}
