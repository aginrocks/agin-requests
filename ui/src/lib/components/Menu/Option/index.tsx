import { TablerIcon } from "@tabler/icons-react"
import { optionLabel, optionStyles } from "./styles"

export type OptionProps = {
    label: string,
    value: string,
    icon?: TablerIcon,
    description?: string,
}

export function Option({ label, value, icon: Icon, description }: OptionProps) {
    return (
        <div className={optionStyles}>
            {Icon && <Icon size={18} color="color-mix(in srgb, var(--vscode-foreground), black 50%)" />}
            <div className={optionLabel}>
                {label}
            </div>
        </div>
    )
}