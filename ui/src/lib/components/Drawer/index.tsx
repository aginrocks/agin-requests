import React from "react";
import { drawer } from "./styles";
import ActionIcon from "../ActionIcon";

type DrawerVaraints = Exclude<Parameters<typeof drawer>[0], undefined>;

export interface DrawerProps extends DrawerVaraints {
    opened: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    children?: React.ReactNode;
}

export default function Drawer({ opened, onClose, title, subtitle, children, withLine }: DrawerProps) {
    const classes = drawer({ opened, withLine });

    return (
        <div className={classes.drawer}>
            <div className={classes.header}>
                <div>
                    {title && <div className={classes.title}>{title}</div>}
                    {title && subtitle && <div className={classes.subtitle}>{subtitle}</div>}
                </div>
                <ActionIcon icon="close" onClick={onClose} />
            </div>
            {children}
        </div>
    )
}