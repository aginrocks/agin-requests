import { Icon } from "@tabler/icons-react";
import React from "react";
import { themeIconContainer } from "./styles";

type ThemeCheckboxIconVariants = Exclude<Parameters<typeof themeIconContainer>[0], undefined>;

export interface ThemeCheckboxIconProps extends React.HTMLAttributes<HTMLDivElement>, ThemeCheckboxIconVariants {
    icon: Icon;
}

export default function ThemeCheckboxIcon({ icon: Icon, iconColor, clickable, ...props }: ThemeCheckboxIconProps) {
    return (
        <div className={themeIconContainer({ iconColor, clickable })} {...props}>
            <Icon size={16} />
        </div>
    )
}