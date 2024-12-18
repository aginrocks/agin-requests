import { Icon } from "@tabler/icons-react";
import { link } from "./styles";

type LinkVariants = Exclude<Parameters<typeof link>[0], undefined>;

export interface NavbarLinkProps extends LinkVariants {
    active?: boolean;
    label: string;
    icon?: Icon;
}

export default function NavbarLink({ active, label, primary, icon: Icon }: NavbarLinkProps) {
    const classes = link({ active, primary });
    return (
        <div className={classes.link}>
            {Icon && <Icon size={18} />}
            {label}
        </div>
    )
}