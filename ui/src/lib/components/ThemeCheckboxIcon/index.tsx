import { Icon } from "@tabler/icons-react";
import React from "react";
import { themeCheckboxIconContainer } from "./styles";

type ThemeIconVariants = Exclude<Parameters<typeof themeCheckboxIconContainer>[0], undefined>;

export interface ThemeIconProps extends React.HTMLAttributes<HTMLDivElement>, ThemeIconVariants {
    icon: Icon;
}

export default function ThemeIcon({ icon: Icon, iconColor, clickable, ...props }: ThemeIconProps) {
    return (
        <div className={themeCheckboxIconContainer({ iconColor, clickable })} {...props}>
            <Icon size={16} />
        </div>
    )
}