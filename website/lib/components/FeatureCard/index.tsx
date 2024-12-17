'use client';
import { Icon } from "@tabler/icons-react";
import { card } from "./styles";
import { token } from "@/styled-system/tokens";
import { useEffect, useRef, useState } from "react";
import { useMouse } from "@mantine/hooks";

type CardVariants = Exclude<Parameters<typeof card>[0], undefined>;

export interface FeatureCardProps extends CardVariants {
    label: string;
    description?: string | React.ReactNode;
    icon: Icon;
}

export function FeatureCard({ label, description, icon: Icon }: FeatureCardProps) {
    const classes = card();

    const [isHovered, setIsHovered] = useState(false);

    const { ref, x, y } = useMouse();

    return (
        <div className={classes.card} ref={ref} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className={classes.icon}>
                <Icon size={25} color={token('colors.primary')} />
            </div>
            <div>
                <div className={classes.label}>{label}</div>
                <div className={classes.description}>{description}</div>
            </div>
            <div className={classes.blur} style={{
                left: x - 100,
                top: y - 75,
                opacity: isHovered ? 1 : 0,
            }}></div>
            <div className={classes.border}></div>
        </div>
    )
}