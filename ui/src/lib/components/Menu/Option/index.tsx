import { TablerIcon } from "@tabler/icons-react"
import { optionLabel, optionStyles } from "./styles"

type OptionVariants = Exclude<Parameters<typeof optionStyles>[0], undefined>;
export interface OptionProps extends React.HTMLAttributes<HTMLDivElement>, OptionVariants {
    label: string,
    value: string,
    icon?: TablerIcon,
    description?: string,
    selected?: boolean;
}

export function Option({ label, value, icon: Icon, description, optionColor, ...props }: OptionProps) {
    return (
        <div className={optionStyles({ optionColor })} {...props}>
            {Icon && <Icon size={18} color="color-mix(in srgb, var(--vscode-foreground), black 50%)" />}
            <div className={optionLabel}>
                {label}
            </div>
        </div>
    )
}